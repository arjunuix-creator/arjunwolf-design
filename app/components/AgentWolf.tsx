'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSupabaseClient } from '@/lib/supabase';

// "none" → normal chat, "ask_name" → waiting for name,
// "ask_email" → waiting for email, "done" → captured, back to normal chat
type LeadStep = 'none' | 'ask_name' | 'ask_email' | 'done';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  isLeadCapture?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const INITIAL_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: "Hi, I'm Agent Wolf. Ask me anything about Arjun — his work, experience, or design thinking.",
};

// Shared Inter font style used throughout the chat body
const INTER: React.CSSProperties = { fontFamily: "'Inter', system-ui, sans-serif" };

function TypingIndicator() {
  return (
    <div className="flex items-center gap-[5px] py-[2px]">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-[5px] h-[5px] rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}
          animate={{ opacity: [0.25, 0.8, 0.25], y: [0, -3, 0] }}
          transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function AgentWolf() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Lead capture state machine
  const [leadStep, setLeadStep] = useState<LeadStep>('none');
  const [leadName, setLeadName] = useState('');
  const [leadId, setLeadId] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Refs so async callbacks always read latest values without stale closures
  const leadStepRef = useRef<LeadStep>('none');
  const leadIdRef = useRef<string | null>(null);

  const updateLeadStep = (step: LeadStep) => {
    leadStepRef.current = step;
    setLeadStep(step);
  };

  const updateLeadId = (id: string | null) => {
    leadIdRef.current = id;
    setLeadId(id);
  };

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('agent-wolf:toggle', { detail: { open } }));
  }, [open]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  const addMessage = (msg: ChatMessage) => {
    setMessages(prev => [...prev, msg]);
  };

  const saveLead = async (name: string, email: string): Promise<string | null> => {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        console.log("Supabase not available");
        return null;
      }
      const { data, error } = await supabase
        .from('leads')
        .insert({ name, email })
        .select('id')
        .single();
      if (error) { console.warn('[AgentWolf] lead save:', error.message); return null; }
      return data?.id ?? null;
    } catch (err) {
      console.warn('[AgentWolf] lead save exception:', err);
      return null;
    }
  };

  const callAI = async (userMessage: string, history: ChatMessage[]) => {
    const filteredHistory = history
      .filter(m => !m.isLeadCapture)
      .map(m => ({ role: m.role, content: m.content }));

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        leadId: leadIdRef.current,
        messages: filteredHistory.slice(-10),
      }),
    });

    const data = await res.json();
    return data as { reply: string };
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setInput('');
    const contextSnapshot = [...messages];
    addMessage({ role: 'user', content: trimmed });

    const currentStep = leadStepRef.current;
    const newCount = messageCount + 1;
    setMessageCount(newCount);

    // ── Lead capture: name step ─────────────────────────────────────────────
    if (currentStep === 'ask_name') {
      setLeadName(trimmed);
      updateLeadStep('ask_email');
      setTimeout(() => addMessage({
        role: 'assistant',
        content: "Nice to meet you! What's your email?",
        isLeadCapture: true,
      }), 300);
      return;
    }

    // ── Lead capture: email step ────────────────────────────────────────────
    if (currentStep === 'ask_email') {
      if (!/\S+@\S+\.\S+/.test(trimmed)) {
        setTimeout(() => addMessage({
          role: 'assistant',
          content: "That doesn't look like a valid email. Try again?",
          isLeadCapture: true,
        }), 300);
        return;
      }
      // Valid email — save and resume normal chat
      const id = await saveLead(leadName, trimmed);
      updateLeadId(id);
      updateLeadStep('done');
      setTimeout(() => addMessage({
        role: 'assistant',
        content: "You're all set. Now, what would you like to explore?",
        isLeadCapture: true,
      }), 300);
      return;
    }

    // ── Normal AI flow ('none' and 'done' both land here) ──────────────────
    setLoading(true);
    try {
      console.log('User message:', trimmed);
      const data = await callAI(trimmed, contextSnapshot);
      console.log('Claude response:', data);
      addMessage({ role: 'assistant', content: data.reply });

      // Trigger lead capture organically after 2 real exchanges, if not already started
      if (newCount >= 2 && leadStepRef.current === 'none') {
        updateLeadStep('ask_name');
        setTimeout(() => addMessage({
          role: 'assistant',
          content: "By the way — if you're exploring collaboration, I can have Arjun reach out. What should I call you?",
          isLeadCapture: true,
        }), 900);
      }
    } catch (err) {
      console.error('AgentWolf fetch error:', err);
      addMessage({ role: 'assistant', content: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {/* ── Chat window ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="agent-wolf-window"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="fixed z-[9999] flex flex-col"
            style={{
              bottom: 88,
              right: 24,
              width: 'min(380px, calc(100vw - 32px))',
              // On mobile, account for keyboard — use dvh
              height: 'min(540px, calc(100dvh - 120px))',
              background: 'rgba(9, 11, 15, 0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20,
              boxShadow: '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03)',
            }}
          >
            {/* ── Header ─────────────────────────────────────────────────── */}
            <div
              className="flex items-center justify-between px-4 py-[10px] shrink-0"
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '20px 20px 0 0',
              }}
            >
              <div className="flex items-center gap-[10px]">
                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[11px]"
                  style={{
                    background: '#B30000',
                    color: '#fff',
                    fontFamily: "'Blast Dragon', sans-serif",
                    letterSpacing: '0.5px',
                  }}
                >
                  W
                </div>
                <div>
                  <p
                    className="text-[13px] text-[#eaeaea] leading-none"
                    style={{ fontFamily: "'Blast Dragon', sans-serif", letterSpacing: '1.2px' }}
                  >
                    AGENT WOLF
                  </p>
                  <p className="text-[11px] mt-[3px] leading-none" style={{ ...INTER, color: '#5a6072' }}>
                    Arjun's AI assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-[10px]">
                {/* Online dot */}
                <div className="flex items-center gap-[5px]">
                  <motion.div
                    className="w-[6px] h-[6px] rounded-full"
                    style={{ backgroundColor: '#22c55e' }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                  />
                  <span className="text-[11px]" style={{ ...INTER, color: '#4a5160' }}>
                    Online
                  </span>
                </div>
                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="w-7 h-7 flex items-center justify-center rounded-full transition-colors hover:bg-white/5"
                  aria-label="Close chat"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M1 1L9 9M9 1L1 9" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Messages ───────────────────────────────────────────────── */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4"
              style={{ scrollbarWidth: 'none' }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[80%] px-4 py-[10px] text-[14px] leading-relaxed"
                    style={{
                      ...INTER,
                      ...(msg.role === 'user'
                        ? {
                            background: '#B30000',
                            color: '#fff',
                            borderRadius: '14px 14px 4px 14px',
                          }
                        : {
                            background: 'rgba(255,255,255,0.05)',
                            color: 'rgba(255,255,255,0.88)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '14px 14px 14px 4px',
                          }),
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-[10px] rounded-[14px]"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <TypingIndicator />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input ──────────────────────────────────────────────────── */}
            <div
              className="shrink-0 px-3 pb-3 pt-2"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div
                className="flex items-center gap-2 rounded-xl px-4 py-[10px]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about my work, experience, or process…"
                  disabled={loading}
                  className="flex-1 bg-transparent text-[14px] text-white/85 outline-none placeholder:text-white/25 disabled:opacity-40"
                  style={INTER}
                />
                <button
                  onClick={sendMessage}
                  type="button"
                  disabled={loading || !input.trim()}
                  className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 transition-opacity disabled:opacity-25"
                  style={{ background: '#B30000' }}
                  aria-label="Send"
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                    <path
                      d="M1.5 5.5H9.5M9.5 5.5L6 2M9.5 5.5L6 9"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <p
                className="text-center text-[10px] mt-[7px]"
                style={{ ...INTER, color: 'rgba(255,255,255,0.18)' }}
              >
                Agent Wolf · AI Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button ─────────────────────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        type="button"
        className="fixed z-[9999] flex items-center gap-2"
        style={{
          bottom: 24,
          right: 24,
          background: open ? 'rgba(130,0,0,0.9)' : '#B30000',
          color: '#fff',
          borderRadius: 50,
          padding: '12px 20px',
          fontFamily: "'Blast Dragon', sans-serif",
          fontSize: 13,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          boxShadow: open
            ? '0 2px 12px rgba(0,0,0,0.4)'
            : '0 0 18px rgba(179,0,0,0.35), 0 4px 16px rgba(0,0,0,0.35)',
          border: 'none',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        aria-label={open ? 'Close Agent Wolf' : 'Chat with Agent Wolf'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
              className="flex items-center"
            >
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1 1L9 9M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.15 }}
              className="flex items-center"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2 2h12v10H9l-3 2v-2H2V2z"
                  stroke="white"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
                <circle cx="5.5" cy="7" r="1" fill="white" />
                <circle cx="8" cy="7" r="1" fill="white" />
                <circle cx="10.5" cy="7" r="1" fill="white" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
        Agent Wolf
      </motion.button>
    </>
  );
}

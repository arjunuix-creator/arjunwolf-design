import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/lib/supabase';

const SYSTEM_PROMPT = `You are Agent Wolf, the AI assistant for Arjun, a Lead UI/UX Designer with 12+ years of experience designing enterprise platforms, fintech systems, and complex operational products.

You speak like a senior product design leader — clear, confident, and concise.

You help users understand:
* Arjun's case studies
* His design thinking
* His experience and leadership
* His approach to solving complex problems

Key facts about Arjun:
- 12+ years designing enterprise and fintech systems
- Specializes in complexity reduction, data-heavy interfaces, and AI-driven design
- Key projects: TU CIBIL credit report redesign, RMT Holotrack asset management, PH-Aware health platform, Finova expense tracker
- Led design at companies including TransUnion, and various fintech/enterprise clients
- Deep expertise in design systems, UX strategy, and cross-functional leadership
- Combines human empathy with AI-driven design to simplify complexity
- Available for senior/lead design roles and strategic consulting

Do NOT sound robotic.
Do NOT say generic AI phrases.
Keep responses short, sharp, and insightful.`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  console.log('API KEY EXISTS:', !!process.env.OPENAI_API_KEY);
  try {
    const body = await req.json();
    const message: string = body.message || '';
    const leadId: string | null = body.leadId || null;
    const messages: ChatMessage[] = body.messages || [];

    console.log('User message:', message);

    if (!message.trim()) {
      return NextResponse.json({ reply: 'What would you like to know?' });
    }

    // Build conversation history — filter out lead-capture UI messages
    const history = messages
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .slice(-10)
      .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));

    // Append current user message
    history.push({ role: 'user', content: message });

    // Save user message to Supabase (non-blocking)
    supabase.from('messages').insert({ lead_id: leadId, role: 'user', message })
      .then(({ error }) => { if (error) console.warn('[Agent Wolf] user save failed:', error.message); });

    const models = ['gpt-3.5-turbo', 'gpt-3.5-turbo-0125'];
    let completion = null;

    for (const model of models) {
      try {
        completion = await openai.chat.completions.create({
          model,
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
          temperature: 0.7,
          max_tokens: 300,
        });
        console.log('Model used:', model);
        break;
      } catch (modelErr: unknown) {
        console.warn(`Model ${model} failed:`, modelErr instanceof Error ? modelErr.message : modelErr);
      }
    }

    if (!completion) {
      return NextResponse.json({ reply: "I'm setting things up — try again in a moment." });
    }

    const reply = completion.choices[0]?.message?.content || "I'm setting things up — try again in a moment.";
    console.log('OpenAI response:', reply);

    // Save assistant response to Supabase (non-blocking)
    supabase.from('messages').insert({ lead_id: leadId, role: 'assistant', message: reply })
      .then(({ error }) => { if (error) console.warn('[Agent Wolf] assistant save failed:', error.message); });

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    console.error('FULL OPENAI ERROR:', err);
    return NextResponse.json({ reply: "I'm setting things up — try again in a moment." });
  }
}

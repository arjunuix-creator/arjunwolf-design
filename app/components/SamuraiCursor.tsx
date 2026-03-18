"use client";

import { useEffect, useRef } from "react";

// ── tunables ─────────────────────────────────────────────────────────────────
const BASE_OPACITY      = 0.40;   // max particle opacity
const TEXT_ZONE_MULT    = 0.30;   // opacity multiplier when over hero text (70% reduction)
const BLUR_PX           = 6;      // canvas shadowBlur for each particle
const SPEED_THRESHOLD   = 1.8;    // px/frame below which no particles are emitted
const LIFETIME_SLOW     = 300;    // ms — slow movement
const LIFETIME_FAST     = 480;    // ms — fast movement
const MAX_TRAIL_PX      = 100;    // maximum physical trail length in pixels
const MAX_PARTICLES     = 28;     // hard cap to keep GPU load low

interface Particle {
  x: number;
  y: number;
  t: number;        // birth timestamp (ms)
  lifetime: number; // how long this particle lives (ms)
  radius: number;   // birth radius in px
}

export default function SamuraiCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── canvas sizing ─────────────────────────────────────────────────────────
    const syncSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    syncSize();
    window.addEventListener("resize", syncSize);

    // ── text safety zone — cached, refreshed on resize ───────────────────────
    let safeRect: DOMRect | null = null;
    const refreshSafeRect = () => {
      const el = document.querySelector<HTMLElement>("[data-cursor-safe]");
      safeRect = el ? el.getBoundingClientRect() : null;
    };
    refreshSafeRect();
    window.addEventListener("resize", refreshSafeRect);

    const overSafeZone = (x: number, y: number) =>
      safeRect != null &&
      x >= safeRect.left && x <= safeRect.right &&
      y >= safeRect.top  && y <= safeRect.bottom;

    // ── state ─────────────────────────────────────────────────────────────────
    let mouseX = -9999, mouseY = -9999;
    let prevX  = -9999, prevY  = -9999;
    let inside = false;
    let rafId: number;
    const particles: Particle[] = [];

    // ── mouse events ──────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      inside = true;
    };
    const onLeave  = () => { inside = false; particles.length = 0; };
    const onEnter  = () => { inside = true; };

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // ── trail length helper — cumulative px from newest → oldest ──────────────
    const trailLength = (pts: Particle[]): number => {
      let len = 0;
      for (let i = pts.length - 1; i > 0; i--) {
        const dx = pts[i].x - pts[i - 1].x;
        const dy = pts[i].y - pts[i - 1].y;
        len += Math.sqrt(dx * dx + dy * dy);
      }
      return len;
    };

    // ── render loop ───────────────────────────────────────────────────────────
    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!inside || mouseX === -9999) {
        prevX = mouseX; prevY = mouseY;
        return;
      }

      // Speed (px per frame, approx)
      const dx    = mouseX - prevX;
      const dy    = mouseY - prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      prevX = mouseX;
      prevY = mouseY;

      // Emit a particle only when moving fast enough
      if (speed > SPEED_THRESHOLD) {
        const t = Math.min(speed / 22, 1);                        // 0–1 speed normalised
        const lifetime = LIFETIME_SLOW + t * (LIFETIME_FAST - LIFETIME_SLOW);
        const radius   = 2.5 + t * 1.0;                           // 2.5–3.5 px → 5–7 px diameter
        particles.push({ x: mouseX, y: mouseY, t: now, lifetime, radius });
      }

      // Expire old particles
      const cutoff = now - LIFETIME_FAST;
      while (particles.length && particles[0].t < cutoff) particles.shift();

      // Remove particles that push the physical trail beyond MAX_TRAIL_PX
      while (particles.length > 1 && trailLength(particles) > MAX_TRAIL_PX) {
        particles.shift();
      }

      // Hard cap
      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES);
      }

      // Opacity multiplier — dim trail over hero text
      const dimmed = overSafeZone(mouseX, mouseY);
      const opMult = dimmed ? TEXT_ZONE_MULT : 1;

      // Draw particles
      for (const p of particles) {
        const age   = now - p.t;
        if (age >= p.lifetime) continue;

        const fade   = 1 - age / p.lifetime;               // 1 (fresh) → 0 (gone)
        const opacity = BASE_OPACITY * fade * opMult;
        const r       = p.radius * (0.45 + fade * 0.55);  // shrinks as it fades

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle    = `rgba(255,42,42,${opacity})`;
        ctx.shadowColor  = "#FF2A2A";
        ctx.shadowBlur   = BLUR_PX * fade * 0.8;
        ctx.fill();
        ctx.restore();
      }

      // Cursor tip dot
      if (inside) {
        const tipOpacity = 0.72 * opMult;
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(255,210,200,${tipOpacity})`;
        ctx.shadowColor = "#FF2A2A";
        ctx.shadowBlur  = 14;
        ctx.fill();
        ctx.restore();
      }
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", syncSize);
      window.removeEventListener("resize", refreshSafeRect);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}
    />
  );
}

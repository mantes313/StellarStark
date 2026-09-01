import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  twinkleSpeed: number;
  accent: boolean;
}

const MAX_DPR = 2;
const STAR_AREA = 9000; // px^2 of footer per star, before clamping
const MIN_STARS = 26;
const MAX_STARS = 85;
const DRIFT = 0.012; // px/ms — kept tiny so the idle drift stays a whisper
const LINK_DIST = 130;
const CURSOR_LINK_DIST = 170;
const CURSOR_GLOW_DIST = 140;
const ACCENT_CHANCE = 0.12;
const POINTER_EASE = 0.08;

const FALLBACK_BLUEPRINT = "#7fb2e0";
const FALLBACK_BLUEPRINT_DIM = "rgba(127, 178, 224, 0.35)";
const FALLBACK_ACCENT = "#f2b84b";

function readColor(el: Element, name: string, fallback: string): string {
  const value = getComputedStyle(el).getPropertyValue(name).trim();
  return value || fallback;
}

/**
 * Drives the footer's constellation starfield: drifting, twinkling points
 * link up with thin blueprint lines when close together — a literal
 * "connect the dots" nod to the StellarStark name, drawn like a CAD
 * annotation diagram. The cursor (or a touch point) becomes a temporary
 * star that pulls in nearby links and brightens what's near it.
 *
 * Pauses its rAF loop whenever the footer scrolls out of view or the tab
 * is hidden, and falls back to a single static frame under
 * prefers-reduced-motion instead of just hiding the effect.
 */
export function useConstellation() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let rafId = 0;
    let lastTs = 0;
    let running = false;
    let inView = typeof IntersectionObserver === "undefined";
    let tabVisible = document.visibilityState !== "hidden";

    const pointer = { x: 0, y: 0, active: false, strength: 0 };

    const blueprint = readColor(container, "--blueprint", FALLBACK_BLUEPRINT);
    const blueprintDim = readColor(container, "--blueprint-dim", FALLBACK_BLUEPRINT_DIM);
    const accent = readColor(container, "--accent", FALLBACK_ACCENT);

    function seedStars() {
      const count = Math.round(
        Math.min(MAX_STARS, Math.max(MIN_STARS, (width * height) / STAR_AREA))
      );
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * DRIFT,
        vy: (Math.random() - 0.5) * DRIFT,
        r: 0.9 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.0006 + Math.random() * 0.0009,
        accent: Math.random() < ACCENT_CHANCE
      }));
    }

    function resize() {
      const rect = container!.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
      draw(0);
    }

    function drawLink(ax: number, ay: number, bx: number, by: number, color: string, alpha: number) {
      if (alpha <= 0.002) return;
      ctx!.strokeStyle = color;
      ctx!.globalAlpha = alpha;
      ctx!.beginPath();
      ctx!.moveTo(ax, ay);
      ctx!.lineTo(bx, by);
      ctx!.stroke();
    }

    function draw(ts: number) {
      ctx!.clearRect(0, 0, width, height);
      ctx!.lineWidth = 1;

      // Star-to-star links: the classic constellation lattice.
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            drawLink(a.x, a.y, b.x, b.y, blueprintDim, (1 - dist / LINK_DIST) * 0.5);
          }
        }
      }

      // Cursor/touch-point links and its glow boost on nearby stars.
      const boosts = new Array<number>(stars.length).fill(0);
      if (pointer.strength > 0.01) {
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          const dx = s.x - pointer.x;
          const dy = s.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_LINK_DIST) {
            drawLink(
              pointer.x,
              pointer.y,
              s.x,
              s.y,
              accent,
              (1 - dist / CURSOR_LINK_DIST) * 0.7 * pointer.strength
            );
          }
          if (dist < CURSOR_GLOW_DIST) {
            boosts[i] = (1 - dist / CURSOR_GLOW_DIST) * pointer.strength;
          }
        }
        ctx!.globalAlpha = 0.85 * pointer.strength;
        ctx!.fillStyle = accent;
        ctx!.beginPath();
        ctx!.arc(pointer.x, pointer.y, 2.2, 0, Math.PI * 2);
        ctx!.fill();
      }

      // The stars themselves, twinkling and (optionally) cursor-boosted.
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = 0.5 + 0.5 * Math.sin(s.phase + ts * s.twinkleSpeed);
        const alpha = Math.min(1, 0.3 + twinkle * 0.45 + boosts[i] * 0.5);
        const radius = s.r + boosts[i] * 1.4;
        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = s.accent ? accent : blueprint;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    function step(ts: number) {
      if (!running) return;
      const dt = lastTs ? ts - lastTs : 16;
      lastTs = ts;

      const target = pointer.active ? 1 : 0;
      pointer.strength += (target - pointer.strength) * POINTER_EASE;
      if (pointer.strength < 0.001) pointer.strength = 0;

      for (const s of stars) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.x < -10) s.x = width + 10;
        else if (s.x > width + 10) s.x = -10;
        if (s.y < -10) s.y = height + 10;
        else if (s.y > height + 10) s.y = -10;
      }

      draw(ts);
      rafId = requestAnimationFrame(step);
    }

    function startLoop() {
      if (running || reducedMotion || !inView || !tabVisible) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    }
    function stopLoop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }
    function onPointerLeave() {
      pointer.active = false;
    }

    resize();

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => resize());
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", resize);
    }

    let intersectionObserver: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          inView = entry.isIntersecting;
          if (inView) startLoop();
          else stopLoop();
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(container);
    }

    function onVisibilityChange() {
      tabVisible = document.visibilityState !== "hidden";
      if (tabVisible) startLoop();
      else stopLoop();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (!reducedMotion) {
      // Pointer Events unify mouse/pen/touch, so this also covers
      // touchmove-driven "cursor star" behavior on touch devices.
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerleave", onPointerLeave);
      container.addEventListener("pointercancel", onPointerLeave);
      container.addEventListener("pointerup", onPointerLeave);
      startLoop();
    }

    return () => {
      stopLoop();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointercancel", onPointerLeave);
      container.removeEventListener("pointerup", onPointerLeave);
    };
  }, [reducedMotion]);

  return { containerRef, canvasRef } as const;
}

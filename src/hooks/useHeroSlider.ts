import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

const RESTING_CUT = 62;
const INTRO_START_CUT = 6;
const INTRO_DELAY_MS = 350;
const INTRO_DURATION_MS = 1500;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Drives the hero's draggable "blueprint reveal" slider: pointer drag,
 * keyboard arrows/Home/End, and the one-time intro sweep on page load. */
export function useHeroSlider() {
  const heroRef = useRef<HTMLElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const cutRef = useRef(RESTING_CUT);
  const reducedMotion = useReducedMotion();
  const [cut, setCutState] = useState(RESTING_CUT);

  const setCut = useCallback((value: number) => {
    const clamped = Math.min(100, Math.max(0, value));
    cutRef.current = clamped;
    setCutState(clamped);
    heroRef.current?.style.setProperty("--cut", clamped + "%");
  }, []);

  const posToPercent = useCallback((clientX: number) => {
    const hero = heroRef.current;
    if (!hero) return 0;
    const rect = hero.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }, []);

  // Pointer drag + keyboard controls.
  useEffect(() => {
    const handle = handleRef.current;
    if (!handle) return;

    function onPointerDown(e: PointerEvent) {
      if (draggingRef.current) return;
      draggingRef.current = true;
      handle!.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e: PointerEvent) {
      if (!draggingRef.current) return;
      setCut(posToPercent(e.clientX));
    }
    function endDrag(e: PointerEvent) {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      if (handle!.hasPointerCapture(e.pointerId)) {
        handle!.releasePointerCapture(e.pointerId);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        setCut(cutRef.current - 5);
        e.preventDefault();
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        setCut(cutRef.current + 5);
        e.preventDefault();
      } else if (e.key === "Home") {
        setCut(0);
        e.preventDefault();
      } else if (e.key === "End") {
        setCut(100);
        e.preventDefault();
      }
    }

    handle.addEventListener("pointerdown", onPointerDown);
    handle.addEventListener("pointermove", onPointerMove);
    handle.addEventListener("pointerup", endDrag);
    handle.addEventListener("pointercancel", endDrag);
    handle.addEventListener("keydown", onKeyDown);

    return () => {
      handle.removeEventListener("pointerdown", onPointerDown);
      handle.removeEventListener("pointermove", onPointerMove);
      handle.removeEventListener("pointerup", endDrag);
      handle.removeEventListener("pointercancel", endDrag);
      handle.removeEventListener("keydown", onKeyDown);
    };
  }, [posToPercent, setCut]);

  // Intro sweep: the page "builds itself" once on load.
  useEffect(() => {
    if (reducedMotion) {
      setCut(RESTING_CUT);
      return;
    }

    setCut(INTRO_START_CUT);
    let rafId = 0;
    let start: number | null = null;

    function sweep(ts: number) {
      if (draggingRef.current) return; // user took over, stop the intro
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / INTRO_DURATION_MS);
      setCut(INTRO_START_CUT + (RESTING_CUT - INTRO_START_CUT) * easeOutCubic(t));
      if (t < 1) rafId = requestAnimationFrame(sweep);
    }

    const startTimer = window.setTimeout(() => {
      rafId = requestAnimationFrame(sweep);
    }, INTRO_DELAY_MS);

    // If rAF is throttled (hidden tab), land on the resting position anyway.
    const fallbackTimer = window.setTimeout(() => {
      if (!draggingRef.current && cutRef.current < RESTING_CUT) setCut(RESTING_CUT);
    }, INTRO_DELAY_MS + INTRO_DURATION_MS + 600);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(fallbackTimer);
      cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return { heroRef, handleRef, cut } as const;
}

import { useCallback, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/** Fires the thin accent-colored bar sweep across the top of the page,
 * used as feedback when the live accent-color demo "deploys" a change. */
export function useDeploySweep() {
  const deployBarRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const triggerDeploySweep = useCallback(() => {
    const bar = deployBarRef.current;
    if (reducedMotion || !bar || !bar.animate) return;
    bar.animate(
      [
        { transform: "scaleX(0)", opacity: 1 },
        { transform: "scaleX(1)", opacity: 1, offset: 0.7 },
        { transform: "scaleX(1)", opacity: 0 }
      ],
      { duration: 900, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
    );
  }, [reducedMotion]);

  return { deployBarRef, triggerDeploySweep } as const;
}

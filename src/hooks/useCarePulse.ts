import { useInView } from "./useInView";

/** Triggers the heartbeat-pulse SVG draw-in once the Care section scrolls
 * into view. Thin, named wrapper around useInView so the animation has its
 * own file, matching the rest of the hero/reveal/deploy animation hooks. */
export function useCarePulse() {
  return useInView<HTMLElement>({ threshold: 0.3, rootMargin: "0px" });
}

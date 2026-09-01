import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
}

/** Sets inView=true the first time the ref'd element crosses the given
 * IntersectionObserver threshold, then stops observing. Used to drive the
 * site's one-shot scroll-reveal and draw-in animations. */
export function useInView<T extends HTMLElement>(options: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();
  const [inView, setInView] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: options.threshold ?? 0.2, rootMargin: options.rootMargin ?? "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // options intentionally not in deps: callers pass stable literals per call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return { ref, inView } as const;
}

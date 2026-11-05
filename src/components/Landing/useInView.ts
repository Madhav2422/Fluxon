"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  /** Stop observing after the first time the element enters the viewport. */
  once?: boolean;
}

/** Tracks whether an element is in the viewport via IntersectionObserver. */
export function useInView<T extends Element>({
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
  once = true,
}: InViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView] as const;
}

const serverSnapshot = () => false;

/** Live result of a CSS media query. Always false during server rendering, so hydration is safe. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, serverSnapshot);
}

/** Live "prefers reduced motion" setting as a hook. */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True when the visitor has asked the OS to minimise motion. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

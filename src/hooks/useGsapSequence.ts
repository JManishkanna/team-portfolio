import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Runs a scroll-linked GSAP sequence over `[data-anim]` children of the ref.
 * Used for the pinned / timeline sections where Motion alone is not enough.
 * Falls back to "everything visible" when motion is reduced or GSAP errors.
 */
export function useGsapSequence(setup: (root: HTMLElement, st: typeof ScrollTrigger) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;

    let context: gsap.Context | undefined;
    try {
      context = gsap.context(() => {
        setupRef.current(root, ScrollTrigger);
      }, root);
    } catch {
      // Leave content fully visible rather than hiding it behind a failed animation.
      root.querySelectorAll<HTMLElement>("[data-anim]").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    return () => context?.revert();
  }, [reduced]);

  return ref;
}

/** Refreshes ScrollTrigger once fonts/images settle, so pinning stays accurate. */
export function useScrollTriggerRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const id = globalThis.setTimeout(refresh, 400);
    globalThis.addEventListener("load", refresh);
    return () => {
      globalThis.clearTimeout(id);
      globalThis.removeEventListener("load", refresh);
    };
  }, []);
}

import { useEffect, useState } from "react";

/** True once the page has scrolled past `threshold` px — drives the navbar surface. */
export function useScrolledPast(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(globalThis.scrollY > threshold);
    onScroll();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    return () => globalThis.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

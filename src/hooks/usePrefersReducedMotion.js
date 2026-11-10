import { useEffect, useState } from "react";
/** Live media-query hook for libraries (GSAP) that need a boolean, not a Motion prop. */
export function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(() => globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
    useEffect(() => {
        const query = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)");
        if (!query)
            return;
        const onChange = (event) => setReduced(event.matches);
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);
    return reduced;
}

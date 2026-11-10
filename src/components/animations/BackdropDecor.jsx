import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
const shapeMotion = (delay, distance) => ({
    initial: { y: 0 },
    animate: { y: [0, -distance, 0] },
    transition: { duration: 10 + delay * 2, repeat: Infinity, ease: "easeInOut", delay },
});
/**
 * Decorative layer. Never interactive, never in the accessibility tree, and
 * positioned behind content so it cannot intercept clicks.
 */
export function BackdropDecor({ tone = "light", variant = "section" }) {
    if (variant === "plain")
        return null;
    const isDark = tone === "dark";
    const gridClass = isDark ? "dot-field opacity-40" : "dot-field opacity-50";
    return (_jsxs("div", { "aria-hidden": "true", className: "pointer-events-none absolute inset-0 overflow-hidden", children: [_jsx("div", { className: `absolute inset-0 ${gridClass}` }), _jsx("div", { className: "absolute -left-24 top-10 h-72 w-72 rounded-full blur-[70px]", style: { background: isDark ? "#4361EE" : "#C8F169", opacity: isDark ? 0.35 : 0.4 } }), _jsx("div", { className: "absolute -right-20 bottom-0 h-80 w-80 rounded-full blur-[80px]", style: { background: isDark ? "#845EC2" : "#FF5A7A", opacity: 0.28 } }), variant === "hero" ? (_jsxs(_Fragment, { children: [_jsx(motion.svg, { viewBox: "0 0 120 120", className: "absolute left-[6%] top-[18%] h-16 w-16 md:h-24 md:w-24", ...shapeMotion(0, 18), children: _jsx("path", { d: "M40 12c-12 0-16 8-16 18v10c0 10-8 16-14 16 6 0 14 6 14 16v10c0 10 4 18 16 18", fill: "none", stroke: "#C8F169", strokeWidth: "8", strokeLinecap: "round" }) }), _jsx(motion.svg, { viewBox: "0 0 120 120", className: "absolute right-[8%] top-[62%] h-16 w-16 md:h-24 md:w-24", ...shapeMotion(1.2, 22), children: _jsx("path", { d: "M80 12c12 0 16 8 16 18v10c0 10 8 16 14 16-6 0-14 6-14 16v10c0 10-4 18-16 18", fill: "none", stroke: "#FFD166", strokeWidth: "8", strokeLinecap: "round" }) }), _jsx(motion.div, { className: "absolute left-[18%] bottom-[16%] h-20 w-20 rotate-12 rounded-2xl border-2", style: { borderColor: isDark ? "#06D6A0" : "#4361EE" }, ...shapeMotion(0.6, 14) }), _jsx(motion.div, { className: "absolute right-[24%] top-[12%] h-14 w-14 rounded-full", style: { background: isDark ? "#FF5A7A" : "#FF6B35" }, ...shapeMotion(1.8, 20) })] })) : null] }));
}
/** Thin animated rule used between sections. */
export function AccentRule({ color = "#4361EE" }) {
    return (_jsx(motion.div, { className: "my-10 h-[3px] w-full origin-left rounded-full", style: { background: `linear-gradient(90deg, ${color}, transparent)` }, initial: { scaleX: 0 }, whileInView: { scaleX: 1 }, viewport: { once: true, amount: 0.6 }, transition: { duration: 0.7, ease: [0.22, 0.68, 0.32, 1] } }));
}

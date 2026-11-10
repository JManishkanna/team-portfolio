import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
/** Standard entrance: opacity + translate only, fires once per element. */
export function Reveal({ children, delay = 0, y = 26, as = "div", className }) {
    const MotionTag = motion[as];
    return (_jsx(MotionTag, { className: className, initial: { opacity: 0, y }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 }, transition: { duration: 0.55, delay, ease: [0.22, 0.68, 0.32, 1] }, children: children }));
}
/** Parent container for StaggerText / staggered children lists. */
export function StaggerGroup({ children, className, stagger = 0.08 }) {
    return (_jsx(motion.div, { className: className, initial: "hidden", whileInView: "shown", viewport: { once: true, amount: 0.2 }, transition: { staggerChildren: stagger }, variants: { hidden: {}, shown: {} }, children: children }));
}
export const staggerItem = {
    hidden: { opacity: 0, y: 22 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.68, 0.32, 1] } },
};

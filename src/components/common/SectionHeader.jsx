import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Reveal, StaggerGroup, staggerItem } from "../animations/Reveal";
import { motion } from "framer-motion";
export function vars(entries) {
    const result = {};
    for (const [key, value] of Object.entries(entries)) {
        result[key] = value;
    }
    return result;
}
export const accentStyle = (accent) => vars({ "--accent": accent });
export function Badge({ children, accent }) {
    return (_jsx("span", { className: "chip", style: accent ? accentStyle(accent) : undefined, children: children }));
}
export function TechChips({ items, accent, limit }) {
    const shown = limit ? items.slice(0, limit) : items;
    const rest = limit ? items.length - shown.length : 0;
    return (_jsxs(StaggerGroup, { className: "flex flex-wrap gap-2", stagger: 0.04, children: [shown.map((item) => (_jsx(motion.span, { variants: staggerItem, children: _jsx(Badge, { accent: accent, children: item }) }, item))), rest > 0 ? (_jsx(motion.span, { variants: staggerItem, children: _jsxs("span", { className: "chip", style: accentStyle("#94A3B8"), children: ["+", rest, " more"] }) })) : null] }));
}
export function SectionHeader({ eyebrow, title, lede, accent = "#4361EE", align = "left", tone = "light", action, }) {
    const alignClass = align === "center" ? "text-center items-center" : "items-start";
    const ledeColor = tone === "dark" ? "text-paper/70" : "text-ink/70";
    return (_jsxs("header", { className: `flex flex-col gap-4 ${alignClass}`, children: [eyebrow ? (_jsx(Reveal, { children: _jsx("span", { className: "eyebrow", style: accentStyle(accent), children: eyebrow }) })) : null, _jsx(Reveal, { delay: 0.05, children: _jsx("h2", { className: `text-display ${tone === "dark" ? "text-paper" : "text-ink"} max-w-3xl`, children: title }) }), lede ? (_jsx(Reveal, { delay: 0.1, children: _jsx("p", { className: `max-w-2xl text-lede ${ledeColor}`, children: lede }) })) : null, action ? _jsx(Reveal, { delay: 0.15, children: action }) : null] }));
}

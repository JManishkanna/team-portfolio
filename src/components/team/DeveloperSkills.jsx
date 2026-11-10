import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Reveal, StaggerGroup, staggerItem } from "../animations/Reveal";
import { SectionHeader, accentStyle } from "../common/SectionHeader";
import { motion } from "framer-motion";
import { Database, Hammer, LayoutGrid, Server } from "lucide-react";
const groupMeta = {
    frontend: { label: "Frontend", blurb: "Interfaces, states and motion in the browser", Icon: LayoutGrid },
    backend: { label: "Backend", blurb: "Services, contracts and the logic underneath", Icon: Server },
    database: { label: "Database", blurb: "Schemas, queries and the durability path", Icon: Database },
    tools: { label: "Tools", blurb: "Building, shipping and reviewing", Icon: Hammer },
};
/**
 * Grouped technology cards for one developer. No proficiency bars: nothing here
 * claims a number the team cannot evidence.
 */
export function DeveloperSkills({ member }) {
    const groups = Object.keys(groupMeta).filter((key) => member.skillGroups[key].length > 0);
    return (_jsxs("section", { className: "on-ink relative overflow-hidden", "aria-labelledby": "skills-heading", style: accentStyle(member.accent), children: [_jsx("div", { className: "grid-lines pointer-events-none absolute inset-0 opacity-40", "aria-hidden": "true" }), _jsxs("div", { className: "shell stack-pad relative", children: [_jsx(SectionHeader, { eyebrow: "Skills", tone: "dark", accent: member.accent, title: _jsx("span", { id: "skills-heading", children: "WHAT I REACH FOR, BY LAYER." }), lede: "Grouped the way I actually use them \u2014 not ranked, because a list of percentages would be theatre." }), _jsx("div", { className: "mt-12 flex flex-col gap-10", children: groups.map((key) => {
                            const { label, blurb, Icon } = groupMeta[key];
                            const items = member.skillGroups[key];
                            return (_jsxs("div", { children: [_jsx(Reveal, { children: _jsxs("h3", { className: "flex items-baseline gap-3 font-display text-2xl font-bold text-paper", children: [_jsx(Icon, { className: "h-5 w-5", style: { color: member.accent }, "aria-hidden": "true" }), label, _jsx("span", { className: "font-sans text-[0.82rem] font-normal text-paper/45", children: blurb })] }) }), _jsx(StaggerGroup, { className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4", stagger: 0.05, children: items.map((skill) => (_jsxs(motion.li, { variants: staggerItem, className: "group/card flex items-center justify-between gap-2 rounded-xl border border-paper/12 bg-ink/50 px-4 py-3 transition-colors duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent)]/10", children: [_jsx("span", { className: "font-semibold text-paper/85 group-hover/card:text-paper", children: skill }), _jsx("span", { className: "h-1.5 w-1.5 rounded-full opacity-0 transition-opacity duration-200 group-hover/card:opacity-100", style: { background: member.accent }, "aria-hidden": "true" })] }, skill))) })] }, key));
                        }) })] })] }));
}

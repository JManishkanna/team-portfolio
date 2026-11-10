import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Boxes, Palette, Users } from "lucide-react";
import { PageHero } from "../components/sections/PageHero";
import { Reveal, StaggerGroup, staggerItem } from "../components/animations/Reveal";
import { SectionHeader, accentStyle } from "../components/common/SectionHeader";
import { ActionButton } from "../components/common/ActionButton";
import { useSeo } from "../hooks/useSeo";
import { brand } from "../data/site";
import { technologies, technologyCategories } from "../data/technology";
import { crewStats, getMemberById } from "../utils/data";
const categoryAccent = {
    Frontend: "#4361EE",
    Backend: "#06D6A0",
    Database: "#FF6B35",
    DevOps: "#845EC2",
    Testing: "#FFD166",
    Design: "#FF5A7A",
    Collaboration: "#C8F169",
};
/** Two-letter monogram instead of official brand logos: no unverified assets. */
function monogram(name) {
    const letters = name.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean);
    if (letters.length >= 2)
        return (letters[0][0] + letters[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
}
export default function SkillsPage() {
    useSeo({
        title: `${brand.name} — Technology Stack`,
        description: `The full technology stack Team Vinsmokes works with: frontend, backend, database, DevOps, testing, design and collaboration tools — with the developer behind each one.`,
        path: "/skills",
    });
    return (_jsxs(_Fragment, { children: [_jsx(PageHero, { accent: "#845EC2", eyebrow: "Technology stack", titleWords: ["OUR", "STACK.", "OUR", "SUPERPOWER."], accentWords: ["SUPERPOWER."], lede: "Everything the crew actually ships with, grouped by layer. Each entry names who works in it \u2014 and their name links to their portfolio.", crumbs: [{ label: "Skills" }], aside: _jsx("div", { className: "grid grid-cols-2 gap-4 rounded-2xl border border-paper/15 bg-ink/50 p-5 backdrop-blur sm:grid-cols-4 lg:grid-cols-2", children: [
                        { label: "Technologies", value: crewStats.technologies, Icon: Boxes, color: "#845EC2" },
                        { label: "Categories", value: technologyCategories.length, Icon: Palette, color: "#06D6A0" },
                    ].map(({ label, value, Icon, color }) => (_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx(Icon, { className: "h-5 w-5", style: { color }, "aria-hidden": "true" }), _jsx("span", { className: "font-display text-3xl font-bold text-paper", children: value }), _jsx("span", { className: "font-mono text-[0.64rem] uppercase tracking-[0.14em] text-paper/45", children: label })] }, label))) }) }), _jsx("section", { className: "relative bg-paper", "aria-label": "Technology categories", children: _jsxs("div", { className: "shell stack-pad flex flex-col gap-16", children: [technologyCategories.map((category, categoryIndex) => {
                            const items = technologies.filter((tech) => tech.category === category);
                            const accent = categoryAccent[category] ?? "#4361EE";
                            if (items.length === 0)
                                return null;
                            return (_jsxs("div", { style: accentStyle(accent), children: [_jsxs("div", { className: "flex flex-wrap items-baseline gap-x-4 gap-y-1", children: [_jsxs("h2", { className: "font-display text-title font-bold", children: [String(categoryIndex + 1).padStart(2, "0"), " \u00B7 ", category] }), _jsxs("p", { className: "text-sm text-ink/50", children: [items.length, " entries"] })] }), _jsx(StaggerGroup, { className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", stagger: 0.05, children: items.map((tech) => (_jsxs(motion.article, { variants: staggerItem, className: "card-accent group flex flex-col gap-3 border border-mist bg-paper p-5", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink font-display text-sm font-bold text-lime transition-transform duration-300 group-hover:-rotate-6", children: monogram(tech.name) }), _jsx("h3", { className: "font-display text-lg font-bold", children: tech.name })] }), _jsx("p", { className: "text-[0.88rem] leading-relaxed text-ink/68", children: tech.description }), _jsxs("div", { className: "mt-auto flex flex-col gap-1.5 border-t border-mist pt-3", children: [_jsxs("span", { className: "flex items-center gap-1.5 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-ink/40", children: [_jsx(Users, { className: "h-3 w-3", "aria-hidden": "true" }), "Works with"] }), _jsx("ul", { className: "flex flex-wrap gap-x-3 gap-y-1 text-[0.85rem]", children: tech.memberIds.map((id) => {
                                                                const person = getMemberById(id);
                                                                if (!person)
                                                                    return null;
                                                                return (_jsx("li", { children: _jsx(Link, { to: `/team/${person.slug}`, className: "font-semibold text-ink/70 underline-offset-4 transition-colors hover:text-[var(--accent)] hover:underline", "aria-label": `Open ${person.name}'s portfolio`, children: person.name }) }, id));
                                                            }) })] })] }, tech.name))) })] }, category));
                        }), _jsxs("div", { className: "grid gap-10 border-t border-mist pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center", children: [_jsx(SectionHeader, { eyebrow: "How we use it", accent: "#4361EE", title: _jsx("span", { children: "THE STACK IS A DECISION, NOT A SHOPPING LIST." }), lede: "Java and Spring Boot on the server, React and JavaScript in the browser, Bootstrap for responsive UI, and MySQL when relationships matter. We pick the boring option and spend the saved time on the parts users feel." }), _jsx(Reveal, { delay: 0.1, children: _jsxs("div", { className: "flex flex-wrap gap-3 lg:justify-end", children: [_jsx(ActionButton, { to: "/team", variant: "ink", children: "See who owns what" }), _jsx(ActionButton, { to: "/projects", variant: "ghost", children: "Stack in production" })] }) })] })] }) })] }));
}

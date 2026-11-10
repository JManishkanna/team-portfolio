import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ArrowUpRight, GitCompareArrows, Layers, Target } from "lucide-react";
import { TeamSection } from "../components/team/TeamSection";
import { PageHero } from "../components/sections/PageHero";
import { Reveal, StaggerGroup, staggerItem } from "../components/animations/Reveal";
import { SectionHeader, accentStyle } from "../components/common/SectionHeader";
import { ActionButton } from "../components/common/ActionButton";
import { useSeo } from "../hooks/useSeo";
import { brand, coreValues } from "../data/site";
import { DEMONSTRATION_NOTICE, teamMembers } from "../data/teamMembers";
import { crewStats } from "../utils/data";
import { motion } from "framer-motion";
import { DemoNotice } from "../components/common/EmptyState";
export default function TeamPage() {
    useSeo({
        title: `${brand.name} — Our Team`,
        description: `Meet the ${crewStats.developers} Team Vinsmokes developers. Every profile links to an individual portfolio with skills, projects and contact details.`,
        path: "/team",
    });
    return (_jsxs(_Fragment, { children: [_jsx(PageHero, { accent: "#06D6A0", eyebrow: "The full team", titleWords: ["THREE", "DEVELOPERS.", "ONE", "STACK."], accentWords: ["STACK."], lede: brand.description, crumbs: [{ label: "Team" }], aside: _jsx("div", { className: "grid grid-cols-3 gap-4 rounded-2xl border border-paper/15 bg-ink/50 p-5 backdrop-blur", children: [
                        { label: "Devs", value: crewStats.developers, color: "#C8F169" },
                        { label: "Projects", value: crewStats.projects, color: "#FF6B35" },
                        { label: "Tools", value: crewStats.technologies, color: "#4361EE" },
                    ].map((stat) => (_jsxs("div", { children: [_jsx("p", { className: "font-display text-3xl font-bold", style: { color: stat.color }, children: stat.value }), _jsx("p", { className: "font-mono text-[0.66rem] uppercase tracking-[0.14em] text-paper/45", children: stat.label })] }, stat.label))) }) }), _jsx("section", { className: "relative overflow-hidden bg-paper", "aria-labelledby": "how-we-work", children: _jsxs("div", { className: "shell stack-pad grid gap-12 lg:grid-cols-[0.9fr_1.1fr]", children: [_jsxs("div", { className: "flex flex-col gap-5", children: [_jsx(SectionHeader, { eyebrow: "How the crew works", accent: "#4361EE", title: _jsx("span", { id: "how-we-work", children: "WE SPLIT THE STACK, NOT THE BLAME." }), lede: "Frontend, backend and data are not three handoffs. They are three views of the same product decision, made in the same conversation." }), _jsx(Reveal, { delay: 0.1, children: _jsxs(Link, { to: "/projects", className: "inline-flex items-center gap-1.5 font-semibold text-electric transition-colors hover:text-violet", children: ["See what that produced", _jsx(ArrowUpRight, { className: "h-4 w-4", "aria-hidden": "true" })] }) })] }), _jsx(StaggerGroup, { className: "grid gap-4 sm:grid-cols-2", stagger: 0.08, children: [
                                {
                                    title: "One backlog",
                                    body: "Every item is owned by one person and reviewed by another. Nobody inherits a task they have not read.",
                                    Icon: Layers,
                                    accent: "#4361EE",
                                },
                                {
                                    title: "Contract first",
                                    body: "The schema and the API shape are agreed before either side writes code, so nothing blocks on a guess.",
                                    Icon: Target,
                                    accent: "#FF6B35",
                                },
                                {
                                    title: "Cross-review",
                                    body: "The frontend dev reads the migrations and the backend dev reads the component tree. Blind spots surface early.",
                                    Icon: GitCompareArrows,
                                    accent: "#06D6A0",
                                },
                            ].map(({ title, body, Icon, accent }) => (_jsx(motion.div, { variants: staggerItem, children: _jsxs("div", { className: "surface flex h-full flex-col gap-3 p-6", style: { borderBottom: `4px solid ${accent}` }, children: [_jsx(Icon, { className: "h-6 w-6", style: { color: accent }, "aria-hidden": "true" }), _jsx("h3", { className: "font-display text-xl font-bold", children: title }), _jsx("p", { className: "text-[0.94rem] leading-relaxed text-ink/70", children: body })] }) }, title))) })] }) }), _jsx(TeamSection, { members: teamMembers, variant: "full", tone: "light", accent: "#06D6A0", lede: "Click any card, photo or name to open that developer's individual portfolio." }), _jsx("section", { className: "on-ink relative overflow-hidden", "aria-labelledby": "values-heading", children: _jsxs("div", { className: "shell stack-pad", children: [_jsx(SectionHeader, { eyebrow: "Core values", tone: "dark", accent: "#FFD166", title: _jsx("span", { id: "values-heading", children: "FOUR THINGS WE DO NOT TRADE AWAY." }) }), _jsx(StaggerGroup, { className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", stagger: 0.08, children: coreValues.map((value) => (_jsx(motion.div, { variants: staggerItem, children: _jsxs("div", { className: "flex h-full flex-col gap-3 rounded-2xl border border-paper/12 bg-ink/50 p-6", style: { borderTop: `4px solid ${value.accent}` }, children: [_jsx("h3", { className: "font-display text-lg font-bold text-paper", children: value.title }), _jsx("p", { className: "text-[0.92rem] leading-relaxed text-paper/65", children: value.body })] }) }, value.title))) })] }) }), _jsxs("section", { className: "relative bg-mist", "aria-label": "Individual portfolios", children: [_jsxs("div", { className: "shell flex flex-col items-start gap-6 py-14 lg:flex-row lg:items-center lg:justify-between", children: [_jsx(Reveal, { children: _jsxs("div", { children: [_jsx("h2", { className: "font-display text-title font-bold", children: "Pick a profile." }), _jsx("p", { className: "mt-2 max-w-2xl text-ink/70", children: "Each developer has a full portfolio at their own URL \u2014 bio, grouped skills, attributed projects and a direct contact page." }), _jsx("ul", { className: "mt-4 flex flex-wrap gap-2", children: teamMembers.map((member) => (_jsx("li", { style: accentStyle(member.accent), children: _jsxs(Link, { to: `/team/${member.slug}`, className: "inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-4 py-2 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]", children: [member.name, _jsx(ArrowUpRight, { className: "h-3.5 w-3.5", "aria-hidden": "true" })] }) }, member.id))) })] }) }), _jsx(Reveal, { delay: 0.1, children: _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx(ActionButton, { to: "/contact", variant: "primary", children: "Work with the crew" }), _jsx(ActionButton, { to: "/skills", variant: "ghost", children: "Our stack" })] }) })] }), _jsx("div", { className: "shell pb-12", children: _jsx(DemoNotice, { children: DEMONSTRATION_NOTICE }) })] })] }));
}

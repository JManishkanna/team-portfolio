import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BackdropDecor } from "../animations/BackdropDecor";
import { Breadcrumbs } from "../common/Breadcrumbs";
import { StaggerText } from "../animations/StaggerText";
import { Reveal } from "../animations/Reveal";
import { accentStyle, vars } from "../common/SectionHeader";
/**
 * Every route opens on the same dark band. That keeps the fixed navbar's white
 * text above contrast on all pages, and gives the site a consistent entrance.
 */
export function PageHero({ eyebrow, titleWords, accentWords, lede, accent, crumbs, aside }) {
    return (_jsxs("section", { className: "on-ink relative overflow-hidden", style: vars({ "--page-accent": accent, "--accent": accent }), children: [_jsx(BackdropDecor, { tone: "dark", variant: "hero" }), _jsx("div", { className: "absolute inset-x-0 bottom-0 h-40", style: { background: `radial-gradient(70% 100% at 50% 100%, ${accent}33, transparent)` }, "aria-hidden": "true" }), _jsxs("div", { className: "shell relative grid gap-10 pb-16 pt-32 md:pb-24 md:pt-40 lg:grid-cols-[1.5fr_1fr] lg:items-end", children: [_jsxs("div", { className: "flex flex-col gap-6", children: [_jsx("div", { style: accentStyle(accent), children: _jsx(Breadcrumbs, { items: crumbs, tone: "dark" }) }), _jsx(Reveal, { children: _jsx("span", { className: "eyebrow", style: accentStyle(accent), children: eyebrow }) }), _jsx(StaggerText, { words: titleWords, accentWords: accentWords ?? [], accentClassName: "text-[var(--page-accent)]", className: "font-display text-display max-w-4xl font-bold text-paper" }), _jsx(Reveal, { delay: 0.15, children: _jsx("p", { className: "max-w-2xl text-lede text-paper/70", children: lede }) })] }), aside ? (_jsx(Reveal, { delay: 0.2, className: "lg:justify-self-end", children: aside })) : null] })] }));
}

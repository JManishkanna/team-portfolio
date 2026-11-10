import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ArrowLeft, Compass, Users } from "lucide-react";
import { BackdropDecor } from "../components/animations/BackdropDecor";
import { ActionButton } from "../components/common/ActionButton";
import { useSeo } from "../hooks/useSeo";
import { teamMembers } from "../data/teamMembers";
export default function NotFoundPage() {
    useSeo({
        title: "Page not found",
        description: "The page you requested does not exist in the Team Vinsmokes portfolio.",
        path: "/404",
    });
    return (_jsxs("div", { className: "on-ink relative flex min-h-dvh items-center overflow-hidden", children: [_jsx(BackdropDecor, { tone: "dark", variant: "hero" }), _jsxs("div", { className: "shell relative py-32", children: [_jsx("p", { className: "font-display text-[clamp(5rem,22vw,15rem)] leading-[0.8] font-bold text-lime", children: "404" }), _jsx("h1", { className: "mt-4 text-display", children: "This route was never built." }), _jsx("p", { className: "mt-4 max-w-xl text-lede text-paper/70", children: "The address does not match a page or a developer profile in this portfolio. It may have been renamed, or the slug may be a typo." }), _jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [_jsxs(ActionButton, { to: "/", variant: "lime", children: [_jsx(ArrowLeft, { className: "h-4 w-4", "aria-hidden": "true" }), "Back to home"] }), _jsxs(ActionButton, { to: "/team", variant: "ghost", children: [_jsx(Users, { className: "h-4 w-4", "aria-hidden": "true" }), "Browse the team"] }), _jsxs(ActionButton, { to: "/projects", variant: "ghost", children: [_jsx(Compass, { className: "h-4 w-4", "aria-hidden": "true" }), "See the projects"] })] }), _jsxs("div", { className: "mt-14", children: [_jsx("h2", { className: "font-mono text-[0.72rem] uppercase tracking-[0.24em] text-paper/45", children: "Developer portfolios" }), _jsx("ul", { className: "mt-4 flex flex-wrap gap-3", children: teamMembers.map((member) => (_jsx("li", { children: _jsx(Link, { to: `/team/${member.slug}`, className: "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-semibold transition-transform duration-200 hover:-translate-y-0.5", style: { borderColor: `${member.accent}66`, color: member.accent }, children: member.name }) }, member.id))) })] })] })] }));
}

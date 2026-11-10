import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, GlassWater, Menu, Moon, Sun, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cta, navItems } from "../../data/site";
import { vars } from "../common/SectionHeader";
import { Logo } from "./Logo";
import { useScrolledPast } from "../../hooks/useScrolledPast";
import { useTheme } from "../../hooks/useTheme";
const EASE = [0.22, 0.68, 0.32, 1];
export function Navbar() {
    const scrolled = useScrolledPast(40);
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const panelRef = useRef(null);
    const toggleRef = useRef(null);
    const { theme, cycleTheme } = useTheme();
    // Close on navigation, including links that resolve to the current route.
    useEffect(() => setOpen(false), [location.pathname]);
    useEffect(() => {
        if (!open)
            return;
        const focusables = () => [...(panelRef.current?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])];
        // Move focus into the drawer, otherwise Tab keeps walking the page behind it.
        focusables()[0]?.focus();
        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
                toggleRef.current?.focus();
                return;
            }
            if (event.key !== "Tab" || !panelRef.current)
                return;
            // Minimal focus trap: wrap at the panel edges and pull focus back if it escapes.
            const items = focusables();
            if (items.length === 0)
                return;
            const first = items[0];
            const last = items[items.length - 1];
            if (!panelRef.current.contains(document.activeElement)) {
                event.preventDefault();
                first.focus();
            }
            else if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }
            else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", onKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);
    return (_jsxs("header", { className: `fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-300 ease-out ${scrolled ? "bg-ink/92 py-2 shadow-[0_10px_30px_-20px_rgba(0,0,0,.85)] backdrop-blur-md" : "py-4"}`, children: [_jsxs("div", { className: "shell flex items-center justify-between gap-4", children: [_jsx(Logo, { compact: scrolled, tone: "paper" }), _jsx("nav", { "aria-label": "Primary", className: "hidden items-center gap-1 lg:flex", children: navItems.map((item) => (_jsx(NavLink, { to: item.to, end: item.to === "/", className: ({ isActive }) => `underline-link relative px-3 text-[0.92rem] transition-colors duration-200 ${isActive ? "text-paper" : "text-paper/70 hover:text-paper"}`, style: (state) => vars({ "--accent": state.isActive ? item.accent : "transparent" }), children: ({ isActive }) => (_jsxs(_Fragment, { children: [_jsx("span", { children: item.label }), isActive ? (_jsx(motion.span, { layoutId: "nav-active", className: "absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full", style: { background: item.accent }, transition: { duration: 0.32, ease: EASE } })) : null] })) }, item.to))) }), _jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("button", { type: "button", onClick: cycleTheme, "aria-label": "Change theme. Current theme: " + theme, title: "Theme: " + theme, className: "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-paper/25 px-3 text-paper transition-colors duration-200 hover:border-lime hover:text-lime", children: [theme === "dark" ? _jsx(Moon, { className: "h-4 w-4" }) : theme === "light" ? _jsx(Sun, { className: "h-4 w-4" }) : _jsx(GlassWater, { className: "h-4 w-4" }), _jsx("span", { className: "hidden text-xs font-bold uppercase tracking-[0.12em] sm:inline", children: theme })] }), _jsxs(Link, { to: cta.to, className: "btn btn--lime hidden lg:inline-flex", style: { fontSize: "0.88rem", paddingInline: "1.15rem" }, children: [cta.label, _jsx(ArrowUpRight, { "aria-hidden": "true", className: "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })] }), _jsx("button", { ref: toggleRef, type: "button", onClick: () => setOpen((value) => !value), "aria-expanded": open, "aria-controls": "mobile-nav", "aria-label": open ? "Close navigation menu" : "Open navigation menu", className: "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-paper/25 text-paper transition-colors duration-200 hover:border-lime hover:text-lime lg:hidden", children: open ? _jsx(X, { className: "h-5 w-5" }) : _jsx(Menu, { className: "h-5 w-5" }) })] })] }), _jsx(AnimatePresence, { children: open ? (_jsx(motion.div, { id: "mobile-nav", ref: panelRef, role: "dialog", "aria-modal": "true", "aria-label": "Site navigation", className: "on-ink absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-paper/10 lg:hidden", initial: { opacity: 0, y: -12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: 0.26, ease: EASE }, children: _jsxs("nav", { "aria-label": "Primary mobile", className: "shell flex flex-col gap-1 py-5", 
                        // The pathname effect above only fires on an actual route change,
                        // so a link back to the page you are already on needs closing here.
                        onClick: () => {
                            setOpen(false);
                            toggleRef.current?.focus();
                        }, children: [navItems.map((item, index) => (_jsx(motion.div, { initial: { opacity: 0, x: -14 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.24, delay: 0.03 * index }, children: _jsxs(NavLink, { to: item.to, end: item.to === "/", className: ({ isActive }) => `flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-semibold transition-colors ${isActive ? "bg-paper/10 text-paper" : "text-paper/75 hover:bg-paper/5 hover:text-paper"}`, style: (state) => ({
                                        ...vars({ "--accent": item.accent }),
                                        borderLeft: `4px solid ${state.isActive ? item.accent : "transparent"}`,
                                    }), children: [item.label, _jsx(ArrowUpRight, { "aria-hidden": "true", className: "h-5 w-5 opacity-60" })] }) }, item.to))), _jsx(Link, { to: cta.to, className: "btn btn--lime mt-3 w-full justify-center text-base", children: cta.label })] }) })) : null })] }));
}

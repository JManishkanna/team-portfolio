import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
/** Breadcrumb trail, e.g. Home / Team / Manish. Last entry is the current page. */
export function Breadcrumbs({ items, tone = "light" }) {
    const muted = tone === "dark" ? "text-paper/60" : "text-ink/55";
    const strong = tone === "dark" ? "text-paper" : "text-ink";
    const linkColor = tone === "dark" ? "hover:text-lime" : "hover:text-electric";
    return (_jsx("nav", { "aria-label": "Breadcrumb", className: "overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none]", children: _jsxs("ol", { className: "flex items-center gap-1.5 whitespace-nowrap font-mono text-[0.78rem]", children: [_jsx("li", { children: _jsxs(Link, { to: "/", className: `inline-flex items-center gap-1 transition-colors ${muted} ${linkColor}`, children: [_jsx(Home, { className: "h-3.5 w-3.5", "aria-hidden": "true" }), _jsx("span", { children: "Home" })] }) }), items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (_jsxs("li", { className: "flex items-center gap-1.5", children: [_jsx(ChevronRight, { className: `h-3.5 w-3.5 ${muted}`, "aria-hidden": "true" }), item.to && !isLast ? (_jsx(Link, { to: item.to, className: `transition-colors ${muted} ${linkColor}`, children: item.label })) : (_jsx("span", { className: strong, "aria-current": isLast ? "page" : undefined, children: item.label }))] }, `${item.label}-${index}`));
                })] }) }));
}

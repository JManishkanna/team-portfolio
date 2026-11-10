import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";
export function EmptyState({ title, body, actionTo, actionLabel, }) {
    return (_jsxs("div", { className: "surface flex flex-col items-start gap-3 p-6", children: [_jsx("h3", { className: "text-title", children: title }), _jsx("p", { className: "text-ink/65", children: body }), actionTo && actionLabel ? (_jsx(Link, { to: actionTo, className: "font-semibold text-electric underline decoration-2 underline-offset-4 hover:text-violet", children: actionLabel })) : null] }));
}
/**
 * Marks content that is example data rather than a verified fact about a real
 * person or product. Stays visible on purpose: it is the difference between a
 * demo and a claim.
 */
export function DemoNotice({ children }) {
    return (_jsxs("p", { className: "demo-flag", role: "note", children: [_jsx(Info, { className: "h-4 w-4", "aria-hidden": "true" }), _jsx("span", { children: children ??
                    "Demonstration content. Replace it with your team's real work before publishing." })] }));
}

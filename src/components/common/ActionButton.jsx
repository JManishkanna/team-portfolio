import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
const variantClass = {
    primary: "",
    lime: "btn--lime",
    ink: "btn--ink",
    ghost: "btn--ghost",
};
export function ActionButton(props) {
    const { children, variant = "primary", className = "", withArrow = true } = props;
    const classes = `btn ${variantClass[variant]} ${className}`;
    const arrow = withArrow ? (_jsx(ArrowRight, { "aria-hidden": "true", className: "h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover/btn:translate-x-1" })) : null;
    if (props.to) {
        return (_jsxs(Link, { to: props.to, className: `group/btn ${classes}`, children: [children, arrow] }));
    }
    if (props.href) {
        const external = props.href.startsWith("http");
        return (_jsxs("a", { href: props.href, className: `group/btn ${classes}`, ...(external ? { target: "_blank", rel: "noreferrer noopener" } : {}), children: [children, external ? (_jsx(ArrowUpRight, { "aria-hidden": "true", className: "h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" })) : (arrow)] }));
    }
    return (_jsxs("button", { type: props.type ?? "button", onClick: props.onClick, disabled: props.disabled, className: `group/btn ${classes}`, children: [children, arrow] }));
}

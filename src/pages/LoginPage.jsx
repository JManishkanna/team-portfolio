import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeft, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
export default function LoginPage() {
    const [message, setMessage] = useState("");
    function submit(event) {
        event.preventDefault();
        setMessage("Login service is ready to connect to your authentication API.");
    }
    return (_jsx("main", { className: "on-ink-deep flex min-h-dvh items-center justify-center px-5 py-16", children: _jsxs("section", { className: "surface w-full max-w-md p-7 shadow-[var(--shadow-lift)] md:p-9", "aria-labelledby": "login-heading", children: [_jsxs(Link, { to: "/", className: "mb-8 inline-flex items-center gap-2 text-sm text-paper/60 hover:text-lime", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), " Back to site"] }), _jsxs("p", { className: "eyebrow text-electric", children: [_jsx(LogIn, { className: "h-3.5 w-3.5" }), " Member access"] }), _jsx("h1", { id: "login-heading", className: "mt-3 font-display text-display", children: "Welcome back." }), _jsx("p", { className: "mt-3 text-ink/65", children: "Sign in to continue to your Team Vinsmokes workspace." }), _jsxs("form", { onSubmit: submit, className: "mt-8 flex flex-col gap-5", children: [_jsxs("label", { className: "field", children: ["Email", _jsx("input", { type: "email", name: "email", required: true, autoComplete: "email", placeholder: "you@example.com" })] }), _jsxs("label", { className: "field", children: ["Password", _jsx("input", { type: "password", name: "password", required: true, autoComplete: "current-password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] }), message ? _jsx("p", { className: "rounded-xl bg-mint/15 p-3 text-sm font-semibold text-mint", role: "status", children: message }) : null, _jsxs("button", { className: "btn mt-2 w-full justify-center", type: "submit", children: ["Sign in ", _jsx(LogIn, { className: "h-4 w-4" })] })] }), _jsxs("p", { className: "mt-6 text-center text-sm text-ink/55", children: ["Need admin access? ", _jsx(Link, { to: "/ADMIN/login", className: "font-semibold text-electric hover:underline", children: "Open admin login" })] })] }) }));
}

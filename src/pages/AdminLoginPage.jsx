import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { startAdminSession } from "../utils/adminAuth";
export default function AdminLoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");
    function submit(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        if (!String(form.get("email") ?? "").trim() || !String(form.get("password") ?? "").trim()) {
            setError("Enter your admin email and password.");
            return;
        }
        startAdminSession();
        const destination = location.state?.from ?? "/ADMIN";
        navigate(destination, { replace: true });
    }
    return (_jsx("main", { className: "on-ink-deep flex min-h-dvh items-center justify-center px-5 py-16", children: _jsxs("section", { className: "surface w-full max-w-md border-electric/30 p-7 shadow-[var(--shadow-lift)] md:p-9", "aria-labelledby": "admin-login-heading", children: [_jsxs(Link, { to: "/", className: "mb-8 inline-flex items-center gap-2 text-sm text-paper/60 hover:text-lime", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), " Back to site"] }), _jsxs("p", { className: "eyebrow text-lime", children: [_jsx(ShieldCheck, { className: "h-3.5 w-3.5" }), " Admin portal"] }), _jsx("h1", { id: "admin-login-heading", className: "mt-3 font-display text-display", children: "Secure access." }), _jsx("p", { className: "mt-3 text-ink/65", children: "Sign in to manage site content and project case studies." }), _jsxs("form", { onSubmit: submit, className: "mt-8 flex flex-col gap-5", children: [_jsxs("label", { className: "field", children: ["Admin email", _jsx("input", { type: "email", name: "email", required: true, autoComplete: "username", placeholder: "admin@example.com" })] }), _jsxs("label", { className: "field", children: ["Password", _jsx("input", { type: "password", name: "password", required: true, autoComplete: "current-password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] }), error ? _jsx("p", { className: "rounded-xl bg-coral/10 p-3 text-sm font-semibold text-coral", role: "alert", children: error }) : null, _jsxs("button", { className: "btn btn--lime mt-2 w-full justify-center", type: "submit", children: ["Enter admin portal ", _jsx(ShieldCheck, { className: "h-4 w-4" })] })] }), _jsx("p", { className: "mt-6 text-center text-xs text-ink/45", children: "Connect this form to server-side authentication before production use." })] }) }));
}

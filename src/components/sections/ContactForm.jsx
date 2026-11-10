import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { brand } from "../../data/site";
const schema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Tell us who you are (2 characters minimum).")
        .max(60, "Please keep your name under 60 characters."),
    email: z
        .string()
        .trim()
        .min(1, "An email address is required so we can reply.")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "That does not look like a valid email address."),
    subject: z
        .string()
        .trim()
        .min(4, "Add a short subject (4 characters minimum).")
        .max(90, "Keep the subject under 90 characters."),
    message: z
        .string()
        .trim()
        .min(20, "Please give us at least 20 characters of context.")
        .max(2000, "Messages are limited to 2000 characters."),
    projectType: z.string().trim().max(40).optional(),
    /** Honeypot. Deliberately not validated by the schema — checked in onSubmit. */
    company: z.string().max(0).optional(),
});
const projectTypes = [
    "Full-stack application",
    "Frontend build",
    "Backend or API work",
    "Database design or migration",
    "Audit or rescue of an existing codebase",
    "Something else",
];
const fieldClass = "w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink transition-colors duration-200 placeholder:text-ink/35 focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/35";
const labelClass = "mb-1.5 block text-sm font-bold text-ink/80";
const errorClass = "mt-1.5 flex items-center gap-1.5 text-[0.82rem] font-semibold text-coral";
function buildMailto(to, snapshot) {
    const subject = encodeURIComponent(snapshot?.subject ?? "");
    const body = encodeURIComponent(snapshot ? `${snapshot.message}\n\n— ${snapshot.name} (${snapshot.email})` : "");
    return `mailto:${to}?subject=${subject}&body=${body}`;
}
export function ContactForm({ member, withProjectType = false }) {
    const [status, setStatus] = useState("idle");
    const [detail, setDetail] = useState(null);
    const [snapshot, setSnapshot] = useState(null);
    const [rejected, setRejected] = useState(false);
    const recipient = member?.email ?? brand.email;
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(schema),
        mode: "onBlur",
        defaultValues: { name: "", email: "", subject: "", message: "", projectType: "", company: "" },
    });
    const onSubmit = async (values) => {
        // Honeypot: a human never fills the hidden company field. Reject silently
        // rather than pretending something was delivered.
        if (values.company?.trim()) {
            setRejected(true);
            setStatus("error");
            setDetail("This submission was rejected automatically by the spam filter.");
            return;
        }
        setStatus("sending");
        setDetail(null);
        setRejected(false);
        setSnapshot(values);
        const payload = {
            name: values.name,
            email: values.email,
            subject: values.subject,
            message: values.message,
            ...(withProjectType && values.projectType ? { projectType: values.projectType } : {}),
            ...(member ? { toMemberSlug: member.slug } : {}),
        };
        const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
        // Nothing configured: say so plainly. No success message is ever implied.
        if (!endpoint) {
            setStatus("unconfigured");
            return;
        }
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!response.ok)
                throw new Error(`The message service responded ${response.status}.`);
            setStatus("success");
            reset({ name: "", email: "", subject: "", message: "", projectType: "", company: "" });
        }
        catch (error) {
            setDetail(error instanceof Error ? error.message : "The request did not complete.");
            setStatus("error");
        }
    };
    if (status === "success") {
        return (_jsxs("div", { role: "status", "aria-live": "polite", className: "surface flex flex-col gap-4 border-l-4 border-l-mint p-7", children: [_jsxs("span", { className: "flex items-center gap-2.5 font-display text-2xl font-bold text-ink", children: [_jsx(CheckCircle2, { className: "h-6 w-6 text-mint", "aria-hidden": "true" }), "Delivered."] }), _jsxs("p", { className: "text-ink/70", children: ["The service accepted your message and the endpoint returned a successful response.", " ", member
                            ? `${member.name} replies from ${recipient}.`
                            : `${brand.name} replies from ${recipient}.`] }), _jsx("button", { type: "button", onClick: () => setStatus("idle"), className: "btn btn--ink w-fit", children: "Write another" })] }));
    }
    return (_jsx("form", { noValidate: true, onSubmit: handleSubmit(onSubmit), className: "relative flex flex-col gap-5", children: _jsxs("div", { className: "surface flex flex-col gap-5 p-6 md:p-8", children: [_jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsxs("label", { className: labelClass, htmlFor: "contact-name", children: ["Your name ", _jsx("span", { className: "text-coral", "aria-hidden": "true", children: "*" })] }), _jsx("input", { id: "contact-name", ...register("name"), "aria-required": "true", "aria-invalid": errors.name ? true : undefined, "aria-describedby": errors.name ? "contact-name-error" : undefined, autoComplete: "name", maxLength: 60, className: fieldClass, placeholder: "Priya Raman" }), errors.name ? (_jsxs("p", { id: "contact-name-error", className: errorClass, children: [_jsx(AlertCircle, { className: "h-4 w-4", "aria-hidden": "true" }), errors.name.message] })) : null] }), _jsxs("div", { children: [_jsxs("label", { className: labelClass, htmlFor: "contact-email", children: ["Email ", _jsx("span", { className: "text-coral", "aria-hidden": "true", children: "*" })] }), _jsx("input", { id: "contact-email", type: "email", ...register("email"), "aria-required": "true", "aria-invalid": errors.email ? true : undefined, "aria-describedby": errors.email ? "contact-email-error" : undefined, autoComplete: "email", maxLength: 160, className: fieldClass, placeholder: "you@company.com" }), errors.email ? (_jsxs("p", { id: "contact-email-error", className: errorClass, children: [_jsx(AlertCircle, { className: "h-4 w-4", "aria-hidden": "true" }), errors.email.message] })) : null] })] }), _jsxs("div", { children: [_jsxs("label", { className: labelClass, htmlFor: "contact-subject", children: ["Subject ", _jsx("span", { className: "text-coral", "aria-hidden": "true", children: "*" })] }), _jsx("input", { id: "contact-subject", ...register("subject"), "aria-required": "true", "aria-invalid": errors.subject ? true : undefined, "aria-describedby": errors.subject ? "contact-subject-error" : undefined, maxLength: 90, className: fieldClass, placeholder: "Realtime dashboard for a logistics team" }), errors.subject ? (_jsxs("p", { id: "contact-subject-error", className: errorClass, children: [_jsx(AlertCircle, { className: "h-4 w-4", "aria-hidden": "true" }), errors.subject.message] })) : null] }), withProjectType ? (_jsxs("div", { children: [_jsxs("label", { className: labelClass, htmlFor: "contact-type", children: ["Project type ", _jsx("span", { className: "font-normal text-ink/45", children: "(optional)" })] }), _jsxs("select", { id: "contact-type", ...register("projectType"), className: fieldClass, children: [_jsx("option", { value: "", children: "Not sure yet" }), projectTypes.map((type) => (_jsx("option", { value: type, children: type }, type)))] })] })) : null, _jsx(MessageField, { register: register, error: errors.message }), _jsxs("div", { className: "pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden", "aria-hidden": "true", children: [_jsx("label", { htmlFor: "contact-company", children: "Company" }), _jsx("input", { id: "contact-company", tabIndex: -1, autoComplete: "off", ...register("company") })] }), status === "unconfigured" ? (_jsxs("div", { role: "alert", className: "rounded-xl border-l-4 border-yellow bg-yellow/15 p-4 text-sm text-ink/80", children: [_jsx("p", { className: "font-bold", children: "Validated \u2014 but there is nowhere to send it yet." }), _jsxs("p", { className: "mt-1", children: ["Set ", _jsx("code", { className: "font-mono text-xs", children: "VITE_CONTACT_ENDPOINT" }), " in ", _jsx("code", { className: "font-mono text-xs", children: ".env" }), " to a service that accepts these posts (EmailJS, a serverless function, or a Spring Boot", " ", _jsx("code", { className: "font-mono text-xs", children: "POST /api/contact" }), " writing to MySQL). This form will not claim a message was sent until one of those actually returns success."] }), _jsxs("a", { href: buildMailto(recipient, snapshot), className: "mt-2 inline-block font-bold text-electric underline underline-offset-4", children: ["Email ", member?.name.split(" ")[0] ?? "the crew", " directly instead"] })] })) : null, status === "error" ? (_jsxs("p", { role: "alert", className: "flex items-start gap-2 rounded-xl border-l-4 border-coral bg-coral/10 p-4 text-sm font-semibold text-ink/80", children: [_jsx(AlertCircle, { className: "mt-0.5 h-4 w-4 shrink-0 text-coral", "aria-hidden": "true" }), _jsxs("span", { children: ["Not sent. ", detail, rejected ? "" : " Your text is still here — fix the cause and press send again."] })] })) : null, _jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [_jsx("button", { type: "submit", className: "btn", disabled: isSubmitting || status === "sending", children: isSubmitting || status === "sending" ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin", "aria-hidden": "true" }), "Sending\u2026"] })) : (_jsxs(_Fragment, { children: [_jsx(Send, { className: "h-4 w-4", "aria-hidden": "true" }), member ? `Message ${member.name.split(" ")[0]}` : "Send to the crew"] })) }), _jsxs("p", { className: "max-w-sm text-[0.8rem] text-ink/50", children: [_jsx("span", { "aria-hidden": "true", children: "* " }), _jsx("span", { className: "sr-only", children: "Required fields are marked with an asterisk. " }), "Your text stays on this page until a configured service accepts it."] })] }), _jsx("p", { className: "sr-only", "aria-live": "polite", children: status === "sending" ? "Sending your message, please wait." : "" })] }) }));
}
function MessageField({ register, error, }) {
    return (_jsxs("div", { children: [_jsxs("label", { className: labelClass, htmlFor: "contact-message", children: ["Message ", _jsx("span", { className: "text-coral", "aria-hidden": "true", children: "*" })] }), _jsx("textarea", { id: "contact-message", rows: 6, ...register("message"), "aria-required": "true", "aria-invalid": error ? true : undefined, "aria-describedby": error ? "contact-message-error" : "contact-message-hint", maxLength: 2000, className: `${fieldClass} resize-y`, placeholder: "What are you building, who is it for, and what does done look like?" }), _jsx("p", { id: "contact-message-hint", className: "mt-1.5 text-[0.78rem] text-ink/45", children: "20\u20132000 characters. Concrete constraints get concrete answers." }), error ? (_jsxs("p", { id: "contact-message-error", className: errorClass, children: [_jsx(AlertCircle, { className: "h-4 w-4", "aria-hidden": "true" }), error.message] })) : null] }));
}

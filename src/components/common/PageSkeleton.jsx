import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Shown while a lazily loaded route chunk arrives. */
export function PageSkeleton() {
    return (_jsxs("div", { className: "shell flex min-h-[70vh] flex-col justify-center gap-5 py-24", role: "status", "aria-live": "polite", children: [_jsx("span", { className: "sr-only", children: "Loading page\u2026" }), _jsx("div", { className: "h-3 w-32 animate-pulse rounded-full bg-mist" }), _jsx("div", { className: "h-14 w-[min(100%,42rem)] animate-pulse rounded-2xl bg-mist" }), _jsx("div", { className: "h-5 w-[min(100%,28rem)] animate-pulse rounded-full bg-mist" }), _jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-3", children: [_jsx("div", { className: "h-40 animate-pulse rounded-2xl bg-mist" }), _jsx("div", { className: "h-40 animate-pulse rounded-2xl bg-mist [animation-delay:120ms]" }), _jsx("div", { className: "h-40 animate-pulse rounded-2xl bg-mist [animation-delay:240ms]" })] })] }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from "react";
/** Keeps a render failure from blanking the site, and says what broke. */
export class ErrorBoundary extends Component {
    state = { error: null };
    static getDerivedStateFromError(error) {
        return { error };
    }
    componentDidCatch(error, info) {
        globalThis.console?.error("Portfolio render error", error, info.componentStack);
    }
    render() {
        const { error } = this.state;
        if (!error)
            return this.props.children;
        return (_jsxs("div", { className: "shell flex min-h-dvh flex-col items-start justify-center gap-4 py-24", children: [_jsx("h1", { className: "text-display", children: "Something broke while rendering." }), _jsx("p", { className: "max-w-xl text-lede text-ink/70", children: "The page failed to render instead of showing a blank screen. Reloading usually clears a transient error; if it repeats, the message below is what to look for." }), _jsx("pre", { className: "max-w-full overflow-x-auto rounded-xl bg-ink p-4 font-mono text-xs text-lime", children: error.message }), _jsx("button", { type: "button", onClick: () => globalThis.location.reload(), className: "btn", children: "Reload the page" })] }));
    }
}

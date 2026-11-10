import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/** Keeps a render failure from blanking the site, and says what broke. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    globalThis.console?.error("Portfolio render error", error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="shell flex min-h-dvh flex-col items-start justify-center gap-4 py-24">
        <h1 className="text-display">Something broke while rendering.</h1>
        <p className="max-w-xl text-lede text-ink/70">
          The page failed to render instead of showing a blank screen. Reloading usually clears a
          transient error; if it repeats, the message below is what to look for.
        </p>
        <pre className="max-w-full overflow-x-auto rounded-xl bg-ink p-4 font-mono text-xs text-lime">
          {error.message}
        </pre>
        <button
          type="button"
          onClick={() => globalThis.location.reload()}
          className="btn"
        >
          Reload the page
        </button>
      </div>
    );
  }
}

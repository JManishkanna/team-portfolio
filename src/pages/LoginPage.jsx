import { useState } from "react";
import { ArrowLeft, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export default function LoginPage() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function submit(event) {
        event.preventDefault();
        setError("");
        setMessage("");
        if (!isSupabaseConfigured || !supabase) {
            setError("Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.");
            return;
        }
        const form = new FormData(event.currentTarget);
        setLoading(true);
        const result = await supabase.auth.signInWithPassword({
            email: String(form.get("email") ?? "").trim(),
            password: String(form.get("password") ?? ""),
        });
        setLoading(false);
        if (result.error) {
            setError(result.error.message);
            return;
        }
        setMessage("Signed in successfully.");
        navigate("/", { replace: true });
    }

    return <main className="on-ink-deep flex min-h-dvh items-center justify-center px-5 py-16">
        <section className="surface w-full max-w-md p-7 shadow-[var(--shadow-lift)] md:p-9" aria-labelledby="login-heading">
            <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-paper/60 hover:text-lime"><ArrowLeft className="h-4 w-4" /> Back to site</Link>
            <p className="eyebrow text-electric"><LogIn className="h-3.5 w-3.5" /> Member access</p>
            <h1 id="login-heading" className="mt-3 font-display text-display">Welcome back.</h1>
            <p className="mt-3 text-ink/65">Sign in to continue to your Team Vinsmokes workspace.</p>
            <form onSubmit={submit} className="mt-8 flex flex-col gap-5">
                <label className="field">Email<input type="email" name="email" required autoComplete="email" placeholder="you@example.com" /></label>
                <label className="field">Password<input type="password" name="password" required autoComplete="current-password" placeholder="••••••••" /></label>
                {error ? <p className="rounded-xl bg-coral/10 p-3 text-sm font-semibold text-coral" role="alert">{error}</p> : null}
                {message ? <p className="rounded-xl bg-mint/15 p-3 text-sm font-semibold text-mint" role="status">{message}</p> : null}
                <button className="btn mt-2 w-full justify-center" type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in"} <LogIn className="h-4 w-4" /></button>
            </form>
            <p className="mt-6 text-center text-sm text-ink/55">Need admin access? <Link to="/ADMIN/login" className="font-semibold text-electric">Open admin login</Link></p>
        </section>
    </main>;
}

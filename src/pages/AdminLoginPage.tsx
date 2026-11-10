import { useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { startAdminSession } from "../utils/adminAuth";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!String(form.get("email") ?? "").trim() || !String(form.get("password") ?? "").trim()) {
      setError("Enter your admin email and password.");
      return;
    }
    startAdminSession();
    const destination = (location.state as { from?: string } | null)?.from ?? "/ADMIN";
    navigate(destination, { replace: true });
  }

  return (
    <main className="on-ink-deep flex min-h-dvh items-center justify-center px-5 py-16">
      <section className="surface w-full max-w-md border-electric/30 p-7 shadow-[var(--shadow-lift)] md:p-9" aria-labelledby="admin-login-heading">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-paper/60 hover:text-lime">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>
        <p className="eyebrow text-lime"><ShieldCheck className="h-3.5 w-3.5" /> Admin portal</p>
        <h1 id="admin-login-heading" className="mt-3 font-display text-display">Secure access.</h1>
        <p className="mt-3 text-ink/65">Sign in to manage site content and project case studies.</p>
        <form onSubmit={submit} className="mt-8 flex flex-col gap-5">
          <label className="field">Admin email<input type="email" name="email" required autoComplete="username" placeholder="admin@example.com" /></label>
          <label className="field">Password<input type="password" name="password" required autoComplete="current-password" placeholder="••••••••" /></label>
          {error ? <p className="rounded-xl bg-coral/10 p-3 text-sm font-semibold text-coral" role="alert">{error}</p> : null}
          <button className="btn btn--lime mt-2 w-full justify-center" type="submit">Enter admin portal <ShieldCheck className="h-4 w-4" /></button>
        </form>
        <p className="mt-6 text-center text-xs text-ink/45">Connect this form to server-side authentication before production use.</p>
      </section>
    </main>
  );
}

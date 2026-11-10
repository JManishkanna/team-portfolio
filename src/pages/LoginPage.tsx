import { useState } from "react";
import { ArrowLeft, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [message, setMessage] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Login service is ready to connect to your authentication API.");
  }

  return (
    <main className="on-ink-deep flex min-h-dvh items-center justify-center px-5 py-16">
      <section className="surface w-full max-w-md p-7 shadow-[var(--shadow-lift)] md:p-9" aria-labelledby="login-heading">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-paper/60 hover:text-lime">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>
        <p className="eyebrow text-electric"><LogIn className="h-3.5 w-3.5" /> Member access</p>
        <h1 id="login-heading" className="mt-3 font-display text-display">Welcome back.</h1>
        <p className="mt-3 text-ink/65">Sign in to continue to your FullStack Crew workspace.</p>
        <form onSubmit={submit} className="mt-8 flex flex-col gap-5">
          <label className="field">Email<input type="email" name="email" required autoComplete="email" placeholder="you@example.com" /></label>
          <label className="field">Password<input type="password" name="password" required autoComplete="current-password" placeholder="••••••••" /></label>
          {message ? <p className="rounded-xl bg-mint/15 p-3 text-sm font-semibold text-mint" role="status">{message}</p> : null}
          <button className="btn mt-2 w-full justify-center" type="submit">Sign in <LogIn className="h-4 w-4" /></button>
        </form>
        <p className="mt-6 text-center text-sm text-ink/55">Need admin access? <Link to="/ADMIN/login" className="font-semibold text-electric hover:underline">Open admin login</Link></p>
      </section>
    </main>
  );
}

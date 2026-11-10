import { Link } from "react-router-dom";

/** Typographic wordmark + bracket glyph. No image asset, so it scales freely. */
export function Logo({ compact = false, tone = "paper" }: { compact?: boolean; tone?: "paper" | "ink" }) {
  const fg = tone === "paper" ? "var(--color-paper)" : "var(--color-ink)";

  return (
    <Link
      to="/"
      aria-label="Team Vinsmokes — home"
      className="group inline-flex items-center gap-2.5 rounded-pill"
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-ink shadow-[0_6px_18px_-8px_rgba(17,24,39,.7)]">
        <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden="true">
          <path
            d="M26 13c-5 0-7 3-7 7v5c0 4-3 7-6 7 3 0 6 3 6 7v5c0 4 2 7 7 7"
            fill="none"
            stroke="#C8F169"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M38 13c5 0 7 3 7 7v5c0 4 3 7 6 7-3 0-6 3-6 7v5c0 4-2 7-7 7"
            fill="none"
            stroke="#4361EE"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="32" cy="32" r="4.5" fill="#FF6B35" className="transition-transform duration-300 group-hover:scale-150" />
        </svg>
      </span>

      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.95rem] font-bold tracking-[0.04em]" style={{ color: fg }}>
            FULLSTACK
          </span>
          <span className="font-mono text-[0.7rem] tracking-[0.34em] text-lime">CREW</span>
        </span>
      ) : null}
    </Link>
  );
}

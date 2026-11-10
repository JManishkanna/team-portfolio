import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
}

/** Breadcrumb trail, e.g. Home / Team / Manish. Last entry is the current page. */
export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const muted = tone === "dark" ? "text-paper/60" : "text-ink/55";
  const strong = tone === "dark" ? "text-paper" : "text-ink";
  const linkColor = tone === "dark" ? "hover:text-lime" : "hover:text-electric";

  return (
    <nav aria-label="Breadcrumb" className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none]">
      <ol className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[0.78rem]">
        <li>
          <Link to="/" className={`inline-flex items-center gap-1 transition-colors ${muted} ${linkColor}`}>
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              <ChevronRight className={`h-3.5 w-3.5 ${muted}`} aria-hidden="true" />
              {item.to && !isLast ? (
                <Link to={item.to} className={`transition-colors ${muted} ${linkColor}`}>
                  {item.label}
                </Link>
              ) : (
                <span className={strong} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

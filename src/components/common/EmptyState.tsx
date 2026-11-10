import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  title,
  body,
  actionTo,
  actionLabel,
}: {
  title: string;
  body: string;
  actionTo?: string;
  actionLabel?: string;
}) {
  return (
    <div className="surface flex flex-col items-start gap-3 p-6">
      <h3 className="text-title">{title}</h3>
      <p className="text-ink/65">{body}</p>
      {actionTo && actionLabel ? (
        <Link
          to={actionTo}
          className="font-semibold text-electric underline decoration-2 underline-offset-4 hover:text-violet"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

/**
 * Marks content that is example data rather than a verified fact about a real
 * person or product. Stays visible on purpose: it is the difference between a
 * demo and a claim.
 */
export function DemoNotice({ children }: { children?: ReactNode }) {
  return (
    <p className="demo-flag" role="note">
      <Info className="h-4 w-4" aria-hidden="true" />
      <span>
        {children ??
          "Demonstration content. Replace it with your team's real work before publishing."}
      </span>
    </p>
  );
}

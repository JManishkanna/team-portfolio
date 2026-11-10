import { Mail, Globe } from "lucide-react";
import type { ReactElement } from "react";
import type { TeamMember } from "../../types";
import { GithubMark, LinkedinMark } from "./BrandIcons";

type IconComponent = (props: { className?: string }) => ReactElement;

interface SocialLinksProps {
  member: Pick<TeamMember, "name" | "githubUrl" | "linkedinUrl" | "portfolioUrl" | "email">;
  accent?: string;
  /** Render the placeholder hint instead of nothing when a link is missing. */
  showEmptyHint?: boolean;
}

const base =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ease-out hover:-translate-y-0.5";

/**
 * Renders only links that exist. Missing URLs show a hint rather than a dead
 * button, so nothing on the site pretends to go somewhere it cannot.
 */
export function SocialLinks({ member, accent = "#4361EE", showEmptyHint = false }: SocialLinksProps) {
  const links = [
    member.githubUrl
      ? { key: "github", href: member.githubUrl, label: `${member.name} on GitHub`, Icon: GithubMark }
      : null,
    member.linkedinUrl
      ? { key: "linkedin", href: member.linkedinUrl, label: `${member.name} on LinkedIn`, Icon: LinkedinMark }
      : null,
    member.portfolioUrl
      ? { key: "site", href: member.portfolioUrl, label: `${member.name}'s personal website`, Icon: Globe }
      : null,
    member.email
      ? { key: "email", href: `mailto:${member.email}`, label: `Email ${member.name}`, Icon: Mail }
      : null,
  ].filter(Boolean) as Array<{ key: string; href: string; label: string; Icon: IconComponent }>;

  if (links.length === 0) {
    return showEmptyHint ? (
      <p className="text-sm text-ink/55">
        No external profiles configured for {member.name} yet — add `githubUrl`, `linkedinUrl` or
        `portfolioUrl` in <code className="font-mono text-xs">src/data/teamMembers.ts</code>.
      </p>
    ) : null;
  }

  return (
    <ul className="flex items-center gap-2.5">
      {links.map(({ key, href, label, Icon }) => (
        <li key={key}>
          <a
            href={href}
            aria-label={label}
            title={label}
            className={base}
            style={{ borderColor: `${accent}55`, color: accent }}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
          >
            <Icon className="h-4.5 w-4.5" />
          </a>
        </li>
      ))}
    </ul>
  );
}

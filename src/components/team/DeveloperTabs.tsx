import { NavLink } from "react-router-dom";
import { ArrowLeft, FolderGit2, Home, UserRound, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import type { TeamMember } from "../../types";
import { accentStyle } from "../common/SectionHeader";

/** Sub-navigation for the three individual-portfolio routes. */
export function DeveloperTabs({ member }: { member: TeamMember }) {
  const base = `/team/${member.slug}`;
  const tabs = [
    { to: base, label: "Profile", Icon: UserRound, end: true },
    { to: `${base}/projects`, label: "Projects", Icon: FolderGit2, end: false },
    { to: `${base}/contact`, label: "Contact", Icon: Mail, end: false },
  ];

  return (
    <div className="sticky top-[4.25rem] z-30 border-y border-paper/10 bg-ink/85 py-2.5 backdrop-blur-md">
      <nav aria-label={`${member.name}'s portfolio sections`} className="shell flex items-center gap-2 overflow-x-auto">
        {tabs.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            style={accentStyle(member.accent)}
            className={({ isActive }) =>
              `inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                isActive
                  ? "bg-[var(--accent)] text-ink"
                  : "text-paper/65 hover:bg-paper/10 hover:text-paper"
              }`
            }
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </NavLink>
        ))}

        <span className="ml-auto flex shrink-0 items-center gap-2 pl-2">
          <Link
            to={base.replace(/\/$/, "")}
            className="hidden items-center gap-1.5 text-sm text-paper/55 transition-colors hover:text-[var(--accent)] sm:inline-flex"
            style={accentStyle(member.accent)}
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            This profile
          </Link>
          <Link
            to="/team"
            className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-3.5 py-1.5 text-sm font-semibold text-paper/75 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            style={accentStyle(member.accent)}
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to Team
          </Link>
        </span>
      </nav>
    </div>
  );
}

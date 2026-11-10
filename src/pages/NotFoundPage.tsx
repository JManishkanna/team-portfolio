import { Link } from "react-router-dom";
import { ArrowLeft, Compass, Users } from "lucide-react";
import { BackdropDecor } from "../components/animations/BackdropDecor";
import { ActionButton } from "../components/common/ActionButton";
import { useSeo } from "../hooks/useSeo";
import { teamMembers } from "../data/teamMembers";

export default function NotFoundPage() {
  useSeo({
    title: "Page not found",
    description: "The page you requested does not exist in the Team Vinsmokes portfolio.",
    path: "/404",
  });

  return (
    <div className="on-ink relative flex min-h-dvh items-center overflow-hidden">
      <BackdropDecor tone="dark" variant="hero" />

      <div className="shell relative py-32">
        <p className="font-display text-[clamp(5rem,22vw,15rem)] leading-[0.8] font-bold text-lime">404</p>
        <h1 className="mt-4 text-display">This route was never built.</h1>
        <p className="mt-4 max-w-xl text-lede text-paper/70">
          The address does not match a page or a developer profile in this portfolio. It may have been
          renamed, or the slug may be a typo.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ActionButton to="/" variant="lime">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </ActionButton>
          <ActionButton to="/team" variant="ghost">
            <Users className="h-4 w-4" aria-hidden="true" />
            Browse the team
          </ActionButton>
          <ActionButton to="/projects" variant="ghost">
            <Compass className="h-4 w-4" aria-hidden="true" />
            See the projects
          </ActionButton>
        </div>

        <div className="mt-14">
          <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-paper/45">
            Developer portfolios
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {teamMembers.map((member) => (
              <li key={member.id}>
                <Link
                  to={`/team/${member.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-semibold transition-transform duration-200 hover:-translate-y-0.5"
                  style={{ borderColor: `${member.accent}66`, color: member.accent }}
                >
                  {member.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

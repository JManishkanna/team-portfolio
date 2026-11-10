import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "../../types";
import { projectContributors } from "../../utils/data";
import { TechChips, accentStyle } from "../common/SectionHeader";
import { staggerItem } from "../animations/Reveal";

interface ProjectCardProps {
  project: Project;
  size?: "featured" | "default" | "compact";
  accent?: string;
  /** Only for the compact strip: skip the contributor row. */
  hideContributors?: boolean;
}

const ratioBySize = {
  featured: "aspect-[16/10]",
  default: "aspect-[16/10]",
  compact: "aspect-[4/3]",
} as const;

export function ProjectCard({ project, size = "default", accent = "#FF6B35", hideContributors }: ProjectCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const people = projectContributors(project);
  const detailPath = `/project/${project.slug}`;
  const featured = size === "featured";
  const compact = size === "compact";

  return (
    <motion.article
      variants={staggerItem}
      className={`card-accent group relative flex overflow-hidden bg-paper shadow-[var(--shadow-soft)] ${
        featured ? "flex-col lg:grid lg:grid-cols-2 lg:items-center" : "flex-col"
      }`}
      style={accentStyle(accent)}
    >
      <div className={`relative ${compact ? "w-28 shrink-0" : "w-full"} overflow-hidden`}>
        {imageFailed ? (
          <div
            className={`${ratioBySize[size]} w-full`}
            style={{ background: `linear-gradient(135deg, ${accent}, #111827)` }}
            aria-hidden="true"
          />
        ) : (
          <img
            src={project.thumbnail}
            alt={`${project.title} cover artwork`}
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className={`${ratioBySize[size]} w-full object-cover transition-transform duration-[650ms] ease-out group-hover:scale-[1.06]`}
          />
        )}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `linear-gradient(180deg, transparent 40%, ${accent}26)` }}
          aria-hidden="true"
        />
        <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-paper backdrop-blur-sm">
          {project.categories[0]}
        </span>
      </div>

      <div className={`flex flex-1 flex-col gap-3 ${compact ? "p-4" : "p-5 md:p-7"}`}>
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-display font-bold ${featured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
            {/* Stretched link: its ::after covers the card, so any click on the
                card activates this one real, keyboard-reachable link. */}
            <Link
              to={detailPath}
              className="transition-colors duration-200 after:absolute after:inset-0 after:content-[''] group-hover:text-[var(--accent)]"
              aria-label={`Read the ${project.title} case study`}
            >
              {project.title}
            </Link>
          </h3>
          <span className="font-mono text-xs text-ink/45">{project.year}</span>
        </div>

        <Link to={detailPath} className="block" tabIndex={-1} aria-hidden="true">
          <p className={`text-ink/70 ${featured ? "text-lede" : "text-[0.95rem]"} line-clamp-3`}>
            {project.description}
          </p>
        </Link>

        {!compact ? <TechChips items={project.technologies} accent={accent} limit={featured ? 7 : 5} /> : null}

        {!hideContributors && people.length > 0 ? (
          <ul className="relative z-[2] flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.82rem]">
            {people.map((person) => (
              <li key={person.id}>
                <Link
                  to={`/team/${person.slug}`}
                  className="inline-flex items-center gap-1.5 font-semibold text-ink/65 transition-colors hover:text-[var(--accent)]"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: person.accent }}
                    aria-hidden="true"
                  />
                  {person.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="relative z-[2] mt-auto flex flex-wrap items-center gap-2 pt-2">
          <Link
            to={detailPath}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[0.82rem] font-bold text-paper transition-transform duration-200 hover:-translate-y-0.5"
          >
            Case study
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>

          {/* External links render only when a real URL is configured. */}
          {project.liveDemoUrl ? (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-[0.82rem] font-semibold text-ink/70 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Live demo
            </a>
          ) : null}

          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-[0.82rem] font-semibold text-ink/70 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Source
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

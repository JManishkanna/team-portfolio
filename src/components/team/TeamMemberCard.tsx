import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { TeamMember } from "../../types";
import { TechChips, accentStyle } from "../common/SectionHeader";
import { SocialLinks } from "../common/SocialLinks";
import { staggerItem } from "../animations/Reveal";
import { initialsOf } from "../../utils/data";

/**
 * The whole clickable identity block (photo + name + role + intro) is ONE Link
 * to /team/:slug, so image, name and card all route to the same developer.
 * Social links sit outside that Link: no nested interactive elements.
 */
export function TeamMemberCard({ member, index = 0 }: { member: TeamMember; index?: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const profilePath = `/team/${member.slug}`;

  return (
    <motion.article
      variants={staggerItem}
      className="card-accent group flex h-full flex-col bg-paper shadow-[var(--shadow-soft)]"
      style={accentStyle(member.accent)}
      aria-labelledby={`member-${member.id}-name`}
    >
      <Link
        to={profilePath}
        className="flex flex-1 flex-col focus-visible:outline-offset-[-3px]"
        aria-label={`Open ${member.name}'s individual portfolio`}
      >
        <div className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100" />

          {imageFailed ? (
            <div
              className="flex aspect-[4/5] w-full items-center justify-center bg-ink"
              style={{ background: `linear-gradient(135deg, ${member.accent}, #111827)` }}
              aria-hidden="true"
            >
              <span className="font-display text-7xl font-bold text-paper">
                {initialsOf(member.name)}
              </span>
            </div>
          ) : (
            <img
              src={member.photo}
              alt={`Portrait placeholder for ${member.name}, ${member.role}`}
              width={800}
              height={1000}
              loading={index < 3 ? "eager" : "lazy"}
              decoding="async"
              onError={() => setImageFailed(true)}
              className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.045]"
            />
          )}

          <span className="absolute bottom-3 left-3 rounded-full bg-ink/85 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-lime backdrop-blur-sm">
            {member.role.split("·")[0]?.trim() ?? member.role}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <h3
              id={`member-${member.id}-name`}
              className="font-display text-2xl font-bold transition-colors duration-200 group-hover:text-[var(--accent)]"
            >
              {member.name}
            </h3>
            <p className="mt-0.5 text-sm font-semibold text-ink/60">{member.role}</p>
          </div>

          <p className="text-[0.95rem] leading-relaxed text-ink/75">{member.shortBio}</p>

          {member.location ? (
            <p className="flex items-center gap-1.5 text-[0.8rem] text-ink/50">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {member.location}
            </p>
          ) : null}

          {/* Hover-revealed extra intro on pointer devices; always open on touch. */}
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out max-md:grid-rows-[1fr] md:group-hover:grid-rows-[1fr] md:group-focus-within:grid-rows-[1fr]">
            <p className="overflow-hidden text-sm leading-relaxed text-ink/60">
              {member.specialty}. {member.approach}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-2">
            <TechChips items={member.skills} accent={member.accent} limit={4} />

            <span className="inline-flex items-center gap-1.5 pt-1 text-sm font-bold text-[var(--accent)]">
              View portfolio
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-3 border-t border-mist px-5 py-3.5">
        <SocialLinks member={member} accent={member.accent} />
        <Link
          to={`${profilePath}/contact`}
          className="text-[0.8rem] font-semibold text-ink/55 underline-offset-4 transition-colors hover:text-[var(--accent)] hover:underline"
        >
          Contact {member.name.split(" ")[0]}
        </Link>
      </div>
    </motion.article>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { teamMembers } from "../../data/teamMembers";
import { accentStyle } from "../common/SectionHeader";

const placement = [
  "col-start-1 row-start-1 w-[62%] rotate-[-6deg] z-10",
  "col-start-2 row-start-1 w-[58%] rotate-[5deg] z-20 mt-[12%]",
  "col-start-1 row-start-2 col-span-2 w-[46%] justify-self-center rotate-[-2deg] z-30 -mt-[14%]",
];

/** Asymmetric photo collage — each portrait links to that developer's portfolio. */
export function TeamCollage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 0.68, 0.32, 1] }}
      className="relative mx-auto grid aspect-[5/4] w-full max-w-xl grid-cols-2 grid-rows-2"
    >
      {teamMembers.map((member, index) => (
        <CollageTile
          key={member.id}
          member={member}
          index={index}
        />
      ))}
      <span
        aria-hidden="true"
        className="absolute -bottom-3 left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-full bg-ink/10 blur-2xl"
      />
    </motion.div>
  );
}

function CollageTile({ member, index }: { member: (typeof teamMembers)[number]; index: number }) {
  return (
    <Link
      to={`/team/${member.slug}`}
      className={`card-accent group overflow-hidden border-4 border-paper shadow-[var(--shadow-lift)] transition-transform duration-500 hover:z-40 hover:scale-[1.04] ${placement[index] ?? placement[0]}`}
      style={accentStyle(member.accent)}
      aria-label={`Open ${member.name}'s portfolio`}
    >
      <img
        src={member.photo}
        alt={`Portrait placeholder for ${member.name}`}
        width={800}
        height={1000}
        loading="lazy"
        decoding="async"
        className="aspect-[4/5] w-full object-cover"
      />
      <span className="absolute inset-x-0 bottom-0 bg-ink/80 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-lime">
        {member.name}
      </span>
    </Link>
  );
}

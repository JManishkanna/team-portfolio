// import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { motion } from "framer-motion";
// import { ArrowRight, Mail, MapPin } from "lucide-react";
// import { ActionButton } from "../common/ActionButton";
// import { SocialLinks } from "../common/SocialLinks";
// import { TechChips, accentStyle } from "../common/SectionHeader";
// import { Breadcrumbs } from "../common/Breadcrumbs";
// import { BackdropDecor } from "../animations/BackdropDecor";
// import { StaggerText } from "../animations/StaggerText";
// /** Individual portfolio hero for one developer, driven entirely by their record. */
// export function DeveloperHero({ member }) {
//     return (_jsxs("section",
//         { 
//             className: "on-ink relative overflow-hidden",
//             style: accentStyle(member.accent), "aria-label": `${member.name} — ${member.role}`, 
//             children: [_jsx(BackdropDecor, { tone: "dark", variant: "hero" }), _jsx("div", { "aria-hidden": "true", 
//             className: "absolute inset-x-0 bottom-0 h-48", 
//             style: { background: `radial-gradient(75% 100% at 30% 100%, ${member.accent}40, transparent)` } }), _jsxs("div", { className: "shell relative grid gap-10 pb-16 pt-32 md:pt-36 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:pb-24", 
//             children: [_jsxs(motion.div, { initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" }, 
//             animate: { opacity: 1, clipPath: "inset(0 0 0% 0)" }, 
//             transition: { duration: 0.8, ease: [0.22, 0.68, 0.32, 1] }, 
//             className: "relative mx-auto w-full max-w-sm lg:max-w-none", 
//             children: [_jsx("div", { "aria-hidden": "true", 
//             className: "absolute -left-4 -top-4 h-full w-full rounded-[var(--radius-card)] border-2", 
//             style: { borderColor: member.accent } }), _jsx("img", { src: member.photo, alt: `${member.name}, ${member.role}`, width: 800, 
//                 height: 1000, 
//                 decoding: "async",
//                 className: "relative aspect-[4/5] w-full rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-lift)]" }), _jsx("span", { className: "absolute bottom-4 left-4 rounded-full px-3.5 py-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink", style: { background: member.accent }, children: member.role.split("·")[0]?.trim() ?? member.role })] }), _jsxs("div", { className: "flex flex-col gap-6", children: [_jsx(Breadcrumbs, { tone: "dark", items: [{ label: "Team", to: "/team" }, { label: member.name }] }), _jsx(AccentBar, { member: member }), _jsx(StaggerText, { words: member.name.split(" "), as: "h1", className: "font-display text-display font-bold text-paper" }), _jsxs(motion.p, { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.35 }, className: "flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.95rem] text-paper/60", children: [_jsx("span", { className: "font-semibold", style: { color: member.accent }, children: member.specialty }), member.location ? (_jsxs("span", { className: "inline-flex items-center gap-1.5", children: [_jsx(MapPin, { className: "h-3.5 w-3.5", "aria-hidden": "true" }), member.location] })) : null] }), _jsx(motion.div, { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.45 }, className: "max-w-xl border-l-2 pl-5 text-lede text-paper/75", style: { borderColor: member.accent }, children: _jsxs("p", { children: ["\u201C", member.shortBio, "\u201D"] }) }), _jsxs(motion.div, { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.55 }, className: "flex flex-wrap items-center gap-3", children: [_jsxs(ActionButton, { to: `/team/${member.slug}/projects`, variant: "lime", children: ["View my projects", _jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })] }), _jsxs(ActionButton, { to: `/team/${member.slug}/contact`, variant: "ghost", children: [_jsx(Mail, { className: "h-4 w-4", "aria-hidden": "true" }), "Contact me"] })] }), _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay: 0.65 }, className: "flex flex-wrap items-center gap-5 pt-1", children: [_jsx(SocialLinks, { member: member, accent: member.accent }), _jsx(TechChips, { items: member.skills, accent: member.accent, limit: 5 })] })] })] })] }));
// }
// /** Small accent strip under the name; kept separate so the hero stays readable. */
// function AccentBar({ member }) {
//     return (_jsx(motion.span, { initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { duration: 0.6, delay: 0.2 }, className: "flex h-1 w-32 origin-left rounded-full", style: { background: member.accent }, "aria-hidden": "true" }));
// }











import { motion } from "framer-motion";
import { ArrowRight,Mail,MapPin,Code2} from "lucide-react";

import { ActionButton } from "../common/ActionButton";
import { SocialLinks } from "../common/SocialLinks";
import { TechChips, accentStyle } from "../common/SectionHeader";
import { Breadcrumbs } from "../common/Breadcrumbs";

import { BackdropDecor } from "../animations/BackdropDecor";
import { StaggerText } from "../animations/StaggerText";

/**
 * Individual portfolio hero for one developer,
 * driven entirely by their record.
 */
export function DeveloperHero({ member }) {
  return (
    <section
      className="on-ink relative overflow-hidden"
      style={accentStyle(member.accent)}
      aria-label={`${member.name} — ${member.role}`}
    >
      {/* Background decoration */}
      <BackdropDecor tone="dark" variant="hero" />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background: `radial-gradient(
            75% 100% at 30% 100%,
            ${member.accent}40,
            transparent
          )`,
        }}
      />

      <div className="shell relative grid gap-10 pb-16 pt-32 md:pt-36 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:pb-24">

        {/* Developer Image */}
        <motion.div
          initial={{
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
          }}
          animate={{
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 0.68, 0.32, 1],
          }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 h-full w-full rounded-[var(--radius-card)] border-2"
            style={{ borderColor: member.accent }}
          />

          <img
            src={member.photo}
            alt={`${member.name}, ${member.role}`}
            width={800}
            height={1000}
            decoding="async"
            className="relative aspect-[4/5] w-full rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-lift)]"
          />

          <span
            className="absolute bottom-4 left-4 rounded-full px-3.5 py-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink"
            style={{ background: member.accent }}
          >
            {member.role.split("·")[0]?.trim() ?? member.role}
          </span>
        </motion.div>

        {/* Developer Information */}
        <div className="flex flex-col gap-6">

          <Breadcrumbs
            tone="dark"
            items={[
              { label: "Team", to: "/team" },
              { label: member.name },
            ]}
          />

          <AccentBar member={member} />

          <StaggerText
            words={member.name.split(" ")}
            as="h1"
            className="font-display text-display font-bold text-paper"
          />

          {/* Specialty and Location */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.95rem] text-paper/60"
          >
            <span
              className="font-semibold"
              style={{ color: member.accent }}
            >
              {member.specialty}
            </span>

            {member.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
                {member.location}
              </span>
            )}
          </motion.p>

          {/* Short Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="max-w-xl border-l-2 pl-5 text-lede text-paper/75"
            style={{ borderColor: member.accent }}
          >
            <p>
              “{member.shortBio}”
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap items-center gap-3"
          >
            <ActionButton
              to={`/team/${member.slug}/projects`}
              variant="lime"
            >
                📜<br />
              View my projects
              {/* <ArrowRight
                className="h-4 w-4"
                aria-hidden="true"
              /> */}
            </ActionButton>

            <ActionButton
              to={`/team/${member.slug}/contact`}
              variant="ghost"
            >
              <Mail
                className="h-4 w-4"
                aria-hidden="true"
              />
              Contact me
            </ActionButton>
            <ActionButton
                to={
                    member.slug === "manishkanna-j"
                    ? "https://mephisto-engine.vercel.app/"
                    : member.slug === "sivakumar-a"
                    ? "https://portfolio-three-black-diphmaa6gn.vercel.app/"
                    : "https://www.youtube.com/"
                }
                // variant="ghost"
                style={{
                    backgroundColor: "#4361EE",
                    color: "#FFFFFF",
                    border: "none",
                    // borderRadius: "20px",
                    }}
                    >
              portfolio
            </ActionButton>

            {/* LinkedIn Button */}
            <ActionButton
  to={member.linkedin}
  style={{
    backgroundColor: "#0A66C2",
    color: "#FFFFFF",
    border: "none",
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8 10H5v9h3v-9Zm-.5-4.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM19 13.5c0-2.5-1.3-3.7-3.2-3.7-1.5 0-2.2.8-2.6 1.4V10h-3v9h3v-5c0-1.3.3-2.1 1.5-2.1s1.3 1 1.3 2.1v5h3v-5.5Z"/>
  </svg>
  LinkedIn
</ActionButton>


{/* GitHub Button */}
<ActionButton
  to={member.github}
  style={{
    backgroundColor: "#24292F",
    color: "#FFFFFF",
    border: "none",
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.52-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.19-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
  </svg>
  GitHub
</ActionButton>
         
          </motion.div>



          {/* Social Links and Skills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap items-center gap-5 pt-1"
          >
            <SocialLinks
              member={member}
              accent={member.accent}
            />

            <TechChips
              items={member.skills}
              accent={member.accent}
              limit={5}
            />
            </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Small accent strip under the name.
 */
function AccentBar({ member }) {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex h-1 w-32 origin-left rounded-full"
      style={{ background: member.accent }}
      aria-hidden="true"
    />
  );
}

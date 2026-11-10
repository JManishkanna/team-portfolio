import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, ShieldCheck } from "lucide-react";
import { PageHero } from "../components/sections/PageHero";
import { ContactForm } from "../components/sections/ContactForm";
import { Reveal, StaggerGroup, staggerItem } from "../components/animations/Reveal";
import { SectionHeader, accentStyle } from "../components/common/SectionHeader";
import { motion } from "framer-motion";
import { useSeo } from "../hooks/useSeo";
import { brand } from "../data/site";
import { teamMembers } from "../data/teamMembers";
import { crewStats } from "../utils/data";

const promises = [
  {
    title: "A reply inside two working days",
    body: "Even if the answer is 'this is not a fit for us', you get it quickly.",
    Icon: Clock,
    accent: "#4361EE",
  },
  {
    title: "A plan, not a quote",
    body: "We send scope, sequence and the risk we are most worried about — then price the plan.",
    Icon: ShieldCheck,
    accent: "#06D6A0",
  },
  {
    title: "The person who builds it reads your note",
    body: "No account-manager relay. Whichever developer picks this up is the one in the pull requests.",
    Icon: Mail,
    accent: "#FF6B35",
  },
];

export default function ContactPage() {
  useSeo({
    title: `${brand.name} — Contact`,
    description:
      "Brief Team Vinsmokes on a project: full-stack applications, APIs, database work and frontend builds. Reach the team or an individual developer directly.",
    path: "/contact",
  });

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  return (
    <>
      <PageHero
        accent="#FF5A7A"
        eyebrow="Contact the team"
        titleWords={["TELL", "US", "WHAT", "BREAKS."]}
        accentWords={["BREAKS."]}
        lede="Describe the constraint — deadline, traffic, the screen that will not behave — and we will answer with a plan for it."
        crumbs={[{ label: "Contact" }]}
        aside={
          <div className="flex flex-col gap-3 rounded-2xl border border-paper/15 bg-ink/50 p-6 backdrop-blur">
            <span className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-paper/45">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Based in {brand.location}
            </span>
            <a
              href={`mailto:${brand.email}`}
              className="font-display text-xl font-bold text-coral underline-offset-4 hover:underline"
            >
              {brand.email}
            </a>
            <p className="text-sm text-paper/55">
              Or skip the form and message one developer directly — every profile has a contact page.
            </p>
          </div>
        }
      />

      <section className="relative bg-paper" aria-labelledby="contact-form-heading">
        <div className="shell stack-pad grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Project enquiry"
              accent="#FF5A7A"
              title={<span id="contact-form-heading">START WITH THE PROBLEM.</span>}
              lede="The form posts to the endpoint you configure. Until that exists it validates locally and hands you a prefilled email, so nothing is ever silently dropped."
            />

            <StaggerGroup className="flex flex-col gap-4" stagger={0.08}>
              {promises.map(({ title, body, Icon, accent }) => (
                <motion.div key={title} variants={staggerItem}>
                  <div className="surface flex gap-4 p-5" style={{ borderLeft: `4px solid ${accent}` }}>
                    <Icon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: accent }} aria-hidden="true" />
                    <div>
                      <h3 className="font-display text-base font-bold">{title}</h3>
                      <p className="mt-1 text-[0.92rem] leading-relaxed text-ink/70">{body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </StaggerGroup>

            {endpoint ? null : (
              <Reveal>
                <p className="rounded-xl border-l-4 border-yellow bg-yellow/15 p-4 text-sm text-ink/75">
                  <strong>No submit service configured.</strong> Set <code className="font-mono text-xs">VITE_CONTACT_ENDPOINT</code>{" "}
                  to an EmailJS, serverless or Spring Boot route (<code className="font-mono text-xs">POST /api/contact</code>)
                  to store messages. The form is fully functional for validation and states until then.
                </p>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1}>
            <ContactForm withProjectType />
          </Reveal>
        </div>
      </section>

      <section className="on-ink relative overflow-hidden" aria-labelledby="direct-heading">
        <div className="shell stack-pad">
          <SectionHeader
            eyebrow="Direct lines"
            tone="dark"
            accent="#C8F169"
            title={<span id="direct-heading">MESSAGE ONE OF THE {crewStats.developers} OF US.</span>}
            lede="Each developer runs their own contact page — useful when you already know which layer of the stack you need."
          />

          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {teamMembers.map((member) => (
              <motion.div key={member.id} variants={staggerItem}>
                <Link
                  to={`/team/${member.slug}/contact`}
                  className="card-accent group flex h-full flex-col gap-3 border border-paper/12 bg-ink/55 p-6"
                  style={accentStyle(member.accent)}
                  aria-label={`Contact ${member.name}, ${member.role}`}
                >
                  <span className="flex items-center gap-3">
                    <img
                      src={member.photo}
                      alt=""
                      width={800}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                    <span className="flex flex-col">
                      <span className="font-display text-lg font-bold text-paper">{member.name}</span>
                      <span className="text-[0.78rem] text-paper/50">{member.role}</span>
                    </span>
                  </span>
                  <p className="text-[0.9rem] leading-relaxed text-paper/65">{member.specialty}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-bold text-[var(--accent)]">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Open contact page
                  </span>
                </Link>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}

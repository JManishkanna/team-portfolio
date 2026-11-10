import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BackdropDecor } from "../components/animations/BackdropDecor";
import { GithubMark } from "../components/common/BrandIcons";
import { StaggerText } from "../components/animations/StaggerText";
import { Reveal, StaggerGroup, staggerItem } from "../components/animations/Reveal";
import { ActionButton } from "../components/common/ActionButton";
import { SectionHeader, TechChips, accentStyle } from "../components/common/SectionHeader";
import { TeamSection } from "../components/team/TeamSection";
import { ProjectCard } from "../components/projects/ProjectCard";
import { TeamCollage } from "../components/team/TeamCollage";
import { useSeo } from "../hooks/useSeo";
import { useGsapSequence } from "../hooks/useGsapSequence";
import { brand, coreValues, heroHeadline, workflow } from "../data/site";
import { teamMembers } from "../data/teamMembers";
import { projects } from "../data/projects";
import { technologies } from "../data/technology";
import { crewStats, projectsForMember } from "../utils/data";
const heroTech = ["React", "JavaScript", "Java", "Spring Boot", "Bootstrap", "MySQL"];
function HeroStatusPanel({ project }) {
    const stack = project?.technologies?.slice(0, 4) ?? heroTech.slice(0, 4);
    return <section className="surface relative overflow-hidden border border-electric/25 p-5 shadow-[0_24px_70px_-35px_rgba(42,199,242,.4)] sm:p-6" aria-label="Crew live status">
        {new URLSearchParams(window.location.search).get("adminPreview") === "1" && <p className="mb-4 rounded-lg border border-violet/30 bg-violet/10 px-3 py-2 font-mono text-xs text-paper">Draft preview · not published</p>}
        <div className="flex items-center justify-between gap-3 border-b border-paper/10 pb-4">
            <div><p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper/45">Crew control / 01</p><h2 className="mt-1 font-display text-xl font-bold text-paper">Crew snapshot</h2></div>
            <span className="inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/10 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-lime"><span className="h-2 w-2 rounded-full bg-lime" />Roster loaded</span>
        </div>
        <div className="grid grid-cols-3 divide-x divide-paper/10 py-5 text-center">
            {[{ value: crewStats.developers, label: "specialists" }, { value: crewStats.projects, label: "missions" }, { value: crewStats.technologies, label: "tools" }].map((stat) => <div key={stat.label}><p className="font-display text-2xl font-bold text-electric">{stat.value}</p><p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-paper/45">{stat.label}</p></div>)}
        </div>
        <div className="rounded-xl border border-paper/10 bg-ink/55 p-4">
            <div className="flex items-center justify-between gap-3"><span className="font-mono text-[0.63rem] uppercase tracking-[0.16em] text-violet">Featured mission</span><span className="font-mono text-[0.62rem] text-paper/40">{project?.year ?? "ACTIVE"}</span></div>
            <p className="mt-1 font-display text-lg font-bold text-paper">{project?.title ?? "Building what’s next"}</p>
            <ul className="mt-3 flex flex-wrap gap-2">{stack.map((tech) => <li key={tech} className="rounded-md border border-electric/15 bg-electric/5 px-2 py-1 font-mono text-[0.62rem] text-paper/65">{tech}</li>)}</ul>
        </div>
    </section>;
}
function HeroCodeCard() {
    return <HeroStatusPanel project={projects.find((project) => project.featured) ?? projects[0]} />;
}
export default function HomePage() {
    useSeo({
        title: `${brand.name} | ${brand.tagline}`,
        description: brand.description,
        path: "/",
    });
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const shapesY = useTransform(scrollYProgress, [0, 1], [0, 160]);
    const cardY = useTransform(scrollYProgress, [0, 1], [0, 70]);
    const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
    const pinnedRef = useGsapSequence((root, ScrollTrigger) => {
        const track = root.querySelector("[data-workflow-track]");
        if (!track)
            return;
        const cards = Array.from(track.querySelectorAll("[data-workflow-card]"));
        cards.forEach((card) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(28px)";
        });
        ScrollTrigger.create({
            trigger: track,
            start: "top 78%",
            end: "bottom 30%",
            scrub: 0.6,
            onUpdate: (self) => {
                const progress = self.progress;
                cards.forEach((card, index) => {
                    const local = progress * cards.length - index;
                    const visible = Math.min(1, Math.max(0, local * 1.6));
                    card.style.opacity = String(visible);
                    card.style.transform = `translateY(${(1 - visible) * 28}px)`;
                });
            },
        });
    });
    const featured = projects.filter((p) => p.featured);
    const previewProject = featured[0] ?? projects[0];
    const secondaryProjects = featured.slice(1).concat(projects.filter((p) => !p.featured)).slice(0, 2);
    return (_jsxs(_Fragment, { children: [_jsxs("section", { ref: heroRef, className: "on-ink-deep relative overflow-hidden", children: [_jsx(BackdropDecor, { tone: "dark", variant: "hero" }), _jsxs(motion.div, { style: { y: shapesY }, "aria-hidden": "true", className: "absolute inset-0", children: [_jsx("div", { className: "absolute right-[12%] top-[22%] h-40 w-40 rounded-3xl border-2 border-violet/60 rotate-[14deg]" }), _jsx("div", { className: "absolute left-[44%] bottom-[12%] h-24 w-24 rounded-full border-2 border-yellow/50" })] }), _jsxs("div", { className: "shell relative grid min-h-dvh items-center gap-14 pb-20 pt-36 lg:grid-cols-[1.15fr_1fr] lg:pb-28", children: [_jsxs(motion.div, { style: { y: copyY }, className: "flex flex-col gap-7", children: [_jsx(Reveal, { children: _jsxs("span", { className: "eyebrow", style: accentStyle("#C8F169"), children: [_jsx(Sparkles, { className: "h-3.5 w-3.5", "aria-hidden": "true" }), crewStats.developers, " full-stack developers \u00B7 ", brand.location] }) }), _jsx(StaggerText, { words: heroHeadline, accentWords: ["DIGITAL", "FUTURE."], accentClassName: "text-lime", className: "font-display text-hero font-bold text-paper" }), _jsx(Reveal, { delay: 0.5, children: _jsx("p", { className: "max-w-xl text-lede text-paper/72", children: brand.description }) }), _jsx(Reveal, { delay: 0.6, children: _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx(ActionButton, { to: "/team", variant: "lime", children: "Meet the Team" }), _jsx(ActionButton, { to: "/projects", variant: "ghost", children: "Explore Our Projects" })] }) }), _jsx(Reveal, { delay: 0.7, children: _jsx("ul", { className: "flex flex-wrap items-center gap-2", children: heroTech.map((tech) => (_jsx("li", { children: _jsx("span", { className: "chip", style: accentStyle("#4361EE"), children: tech }) }, tech))) }) })] }), _jsxs(motion.div, { style: { y: cardY }, className: "relative flex flex-col gap-6", children: [_jsx(HeroCodeCard, {}), _jsx(Reveal, { delay: 0.35, children: _jsxs(Link, { to: `/project/${previewProject.slug}`, className: "card-accent group flex items-center gap-4 border border-paper/12 bg-ink/70 p-4 backdrop-blur", style: accentStyle("#06D6A0"), children: [_jsx("img", { src: previewProject.thumbnail, alt: "", width: 1200, height: 800, loading: "lazy", decoding: "async", className: "h-20 w-28 shrink-0 rounded-xl object-cover" }), _jsxs("span", { className: "flex flex-col gap-1", children: [_jsx("span", { className: "font-mono text-[0.68rem] uppercase tracking-[0.18em] text-lime", children: "Latest case study" }), _jsx("span", { className: "font-display text-lg font-bold text-paper group-hover:text-[var(--accent)]", children: previewProject.title })] })] }) })] })] }), _jsxs("a", { href: "#team", className: "absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/55 transition-colors hover:text-lime md:flex", "aria-label": "Scroll to the team section", children: [_jsx("span", { className: "font-mono text-[0.66rem] uppercase tracking-[0.24em]", children: "Scroll" }), _jsx("span", { className: "relative flex h-11 w-6 justify-center rounded-full border border-paper/30", children: _jsx("span", { className: "mt-1.5 h-2 w-2 animate-scroll-cue rounded-full bg-lime" }) }), _jsx(ArrowDown, { className: "h-3.5 w-3.5", "aria-hidden": "true" })] })] }), _jsx("div", { className: "on-ink overflow-hidden border-y border-paper/10 py-5", children: _jsx("div", { className: "flex w-max animate-marquee gap-10 whitespace-nowrap will-change-transform", children: [0, 1].map((copy) => (_jsx("ul", { className: "flex items-center gap-10", "aria-hidden": copy === 1, children: technologies.slice(0, 22).map((tech) => (_jsxs("li", { className: "flex items-center gap-3", children: [_jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-coral" }), _jsx("span", { className: "font-display text-lg font-semibold text-paper/80", children: tech.name })] }, tech.name))) }, copy))) }) }), _jsxs("section", { className: "relative overflow-hidden bg-paper", "aria-labelledby": "people-heading", children: [_jsx(BackdropDecor, { tone: "light", variant: "section" }), _jsxs("div", { className: "shell stack-pad relative grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center", children: [_jsxs("div", { className: "flex flex-col gap-6", children: [_jsx(SectionHeader, { eyebrow: "Who we are", accent: "#845EC2", title: _jsxs("span", { id: "people-heading", children: ["THE PEOPLE", _jsx("br", {}), "BEHIND ", _jsx("span", { className: "text-violet", children: "THE CODE." })] }), lede: "Three developers who share one backlog and review each other's work. We take a request from a blank page to a deployed product: framing it, designing the flows, building front and back end, testing on real devices, then watching it run." }), _jsx(Reveal, { delay: 0.1, children: _jsx("p", { className: "max-w-xl text-ink/70", children: "We are deliberately small. Everyone on the crew writes code, reviews code and talks to the person using what we ship \u2014 so decisions about structure, naming and scope get made by the people who have to maintain them." }) }), _jsx(StaggerGroup, { className: "mt-2 grid gap-4 sm:grid-cols-2", stagger: 0.08, children: coreValues.map((value) => (_jsx(motion.div, { variants: staggerItem, children: _jsxs("div", { className: "surface group h-full border-t-4 p-5 transition-transform duration-300 hover:-translate-y-1", style: { borderTopColor: value.accent }, children: [_jsx("h3", { className: "font-display text-lg font-bold", children: value.title }), _jsx("p", { className: "mt-2 text-[0.92rem] leading-relaxed text-ink/68", children: value.body })] }) }, value.title))) }), _jsx(Reveal, { delay: 0.15, children: _jsxs("div", { className: "flex flex-wrap gap-3 pt-2", children: [_jsx(ActionButton, { to: "/team", variant: "ink", children: "Meet the developers" }), _jsx(ActionButton, { to: "/skills", variant: "ghost", children: "Our stack" })] }) })] }), _jsx(TeamCollage, {})] })] }), _jsx(TeamSection, { members: teamMembers, variant: "home", tone: "dark", accent: "#C8F169" }), _jsx("section", { className: "relative overflow-hidden bg-mist", "aria-labelledby": "workflow-heading", children: _jsxs("div", { className: "shell stack-pad", children: [_jsx(SectionHeader, { eyebrow: "Development philosophy", accent: "#FF6B35", title: _jsx("span", { id: "workflow-heading", children: "FROM BRIEF TO PRODUCTION, IN FIVE MOVES." }), lede: "The same path every project takes, whether it is a dashboard or a CLI. Scroll to walk it." }), _jsx("div", { ref: pinnedRef, children: _jsx("ol", { "data-workflow-track": true, className: "mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5", children: workflow.map((stage) => (_jsxs("li", { "data-workflow-card": true, className: "surface flex min-h-56 flex-col gap-3 p-5", style: { borderBottom: `4px solid ${stage.accent}` }, children: [_jsx("span", { className: "font-mono text-sm tracking-[0.2em]", style: { color: stage.accent }, children: stage.step }), _jsx("h3", { className: "font-display text-xl font-bold", children: stage.title }), _jsx("p", { className: "text-[0.9rem] leading-relaxed text-ink/68", children: stage.body })] }, stage.step))) }) })] }) }), _jsx("section", { className: "relative overflow-hidden bg-paper", "aria-labelledby": "work-heading", children: _jsxs("div", { className: "shell stack-pad", children: [_jsx(SectionHeader, { eyebrow: "Selected work", accent: "#FF6B35", title: _jsx("span", { id: "work-heading", children: "PROJECTS THAT SPEAK FOR US." }), lede: "Six builds covering realtime dashboards, multi-tenant backends, storefronts and developer tooling.", action: _jsxs(ActionButton, { to: "/projects", variant: "ink", withArrow: false, children: ["All ", crewStats.projects, " projects"] }) }), _jsxs(StaggerGroup, { className: "mt-12 grid gap-6", stagger: 0.1, children: [previewProject ? _jsx(ProjectCard, { project: previewProject, size: "featured" }) : null, _jsx("div", { className: "grid gap-6 md:grid-cols-2", children: secondaryProjects.map((project, index) => (_jsx(ProjectCard, { project: project, accent: index % 2 === 0 ? "#845EC2" : "#06D6A0" }, project.slug))) })] })] }) }), _jsxs("section", { className: "on-ink relative overflow-hidden", "aria-labelledby": "crew-stack-heading", children: [_jsx(BackdropDecor, { tone: "dark", variant: "section" }), _jsxs("div", { className: "shell stack-pad relative", children: [_jsx(SectionHeader, { eyebrow: "Who builds what", tone: "dark", accent: "#06D6A0", title: _jsx("span", { id: "crew-stack-heading", children: "ONE STACK, THREE PERSPECTIVES." }), lede: "Each developer's core tools. Names link through to their individual portfolio.", action: _jsx(ActionButton, { to: "/skills", variant: "lime", withArrow: false, children: "Full technology stack" }) }), _jsx(StaggerGroup, { className: "mt-12 grid gap-6 md:grid-cols-3", stagger: 0.1, children: teamMembers.map((member) => (_jsxs(motion.article, { variants: staggerItem, className: "card-accent flex flex-col gap-4 border border-paper/12 bg-ink/60 p-6", style: accentStyle(member.accent), children: [_jsx(Link, { to: `/team/${member.slug}`, className: "font-display text-xl font-bold text-paper transition-colors hover:text-[var(--accent)]", children: member.name }), _jsx("p", { className: "text-[0.85rem] text-paper/55", children: member.specialty }), _jsx(TechChips, { items: projectsForMember(member.id).flatMap((p) => p.technologies).slice(0, 8), accent: member.accent, limit: 8 })] }, member.id))) })] })] }), _jsx("section", { className: "relative overflow-hidden bg-lime", children: _jsxs("div", { className: "shell flex flex-col items-start gap-6 py-16 md:py-20 lg:flex-row lg:items-center lg:justify-between", children: [_jsxs("div", { className: "flex max-w-2xl flex-col gap-3", children: [_jsx(Reveal, { children: _jsxs("span", { className: "eyebrow", style: accentStyle("#111827"), children: [_jsx(GithubMark, { className: "h-3.5 w-3.5" }), "Open to collaboration"] }) }), _jsx(Reveal, { delay: 0.05, children: _jsx("h2", { className: "font-display text-display leading-none text-ink", children: "HAVE A BUILD IN MIND?" }) }), _jsx(Reveal, { delay: 0.1, children: _jsx("p", { className: "text-ink/75", children: "Tell us what the product has to do. We will come back with a plan, a scope and a date we can hold." }) })] }), _jsx(Reveal, { delay: 0.15, children: _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx(ActionButton, { to: "/contact", variant: "ink", children: "Contact the crew" }), _jsx(ActionButton, { to: "/team", variant: "ghost", children: "Individual portfolios" })] }) })] }) })] }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { projectContributors } from "../../utils/data";
import { achievements } from "../../data/achievements";
import { TechChips, accentStyle } from "../common/SectionHeader";
import { staggerItem } from "../animations/Reveal";
const ratioBySize = {
    featured: "aspect-[16/10]",
    default: "aspect-[16/10]",
    compact: "aspect-[4/3]",
};
export function ProjectCard({ project, size = "default", accent = "#2AC7F2", hideContributors }) {
    const [imageFailed, setImageFailed] = useState(false);
    const people = projectContributors(project);
    const detailPath = `/project/${project.slug}`;
    const metric = achievements.find((entry) => entry.title.toLowerCase().startsWith(`${project.title.toLowerCase()}:`));
    const goal = project.detail?.problem ?? project.description;
    const compact = size === "compact";
    return <article className={`card-accent group relative overflow-hidden rounded-[var(--radius-card)] border border-mist bg-paper shadow-[var(--shadow-soft)] ${size === "featured" ? "lg:grid lg:grid-cols-[0.85fr_1.15fr]" : ""}`} style={accentStyle(accent)}>
        <div className="relative overflow-hidden">
            {imageFailed ? <div className={`${ratioBySize[size]} w-full bg-ink`} style={{ background: `linear-gradient(135deg, ${accent}, #050914)` }} aria-hidden="true" /> : <img src={project.thumbnail} alt={`${project.title} mission artwork`} width={1200} height={800} loading="lazy" decoding="async" onError={() => setImageFailed(true)} className={`${ratioBySize[size]} w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]`} />}
            <span className="absolute left-3 top-3 rounded-md border border-electric/25 bg-ink/85 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-paper backdrop-blur">Mission / {project.year}</span>
        </div>
        <div className={`flex flex-col gap-4 ${compact ? "p-4" : "p-5 md:p-7"}`}>
            <div><p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-electric">{project.categories?.[0] ?? "Product build"}</p><h3 className={`mt-1 font-display font-bold ${size === "featured" ? "text-3xl" : "text-xl"}`}><Link to={detailPath} className="transition-colors hover:text-[var(--accent)]">{project.title}</Link></h3></div>
            {!compact && <p className="text-sm leading-relaxed text-ink/70"><span className="font-semibold text-ink/85">Mission goal: </span>{goal}</p>}
            <div className="rounded-lg border border-mist bg-ink/5 p-3"><p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink/45">Recorded outcome</p><p className="mt-1 text-sm font-semibold text-ink/75">{metric?.summary ?? "No measurable outcome recorded for this mission."}</p></div>
            <div><p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink/45">Stack</p><ul className="mt-2 flex flex-wrap gap-1.5">{project.technologies.slice(0, compact ? 4 : 7).map((tech) => <li key={tech} className="rounded-md border border-mist px-2 py-1 font-mono text-[0.65rem] text-ink/65">{tech}</li>)}</ul></div>
            {!hideContributors && people.length > 0 && <ul className="mt-auto flex flex-col gap-2 border-t border-mist pt-3">{people.map((person) => {
                const contribution = project.detail?.contributions?.find((entry) => entry.memberId === person.id)?.note;
                return <li key={person.id} className="flex items-start gap-2 text-sm"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: person.accent }} /><span><Link to={`/team/${person.slug}`} className="font-bold hover:text-[var(--accent)]">{person.name}</Link>{contribution && !compact && <span className="block text-xs text-ink/55">{contribution}</span>}</span></li>;
            })}</ul>}
            <Link to={detailPath} className="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-[var(--accent)]">Open mission case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
    </article>;
}

function LegacyProjectCard({ project, size = "default", accent = "#FF6B35", hideContributors }) {
    const [imageFailed, setImageFailed] = useState(false);
    const people = projectContributors(project);
    const detailPath = `/project/${project.slug}`;
    const featured = size === "featured";
    const compact = size === "compact";
    return (_jsxs(motion.article, { variants: staggerItem, className: `card-accent group relative flex overflow-hidden bg-paper shadow-[var(--shadow-soft)] ${featured ? "flex-col lg:grid lg:grid-cols-2 lg:items-center" : "flex-col"}`, style: accentStyle(accent), children: [_jsxs("div", { className: `relative ${compact ? "w-28 shrink-0" : "w-full"} overflow-hidden`, children: [imageFailed ? (_jsx("div", { className: `${ratioBySize[size]} w-full`, style: { background: `linear-gradient(135deg, ${accent}, #111827)` }, "aria-hidden": "true" })) : (_jsx("img", { src: project.thumbnail, alt: `${project.title} cover artwork`, width: 1200, height: 800, loading: "lazy", decoding: "async", onError: () => setImageFailed(true), className: `${ratioBySize[size]} w-full object-cover transition-transform duration-[650ms] ease-out group-hover:scale-[1.06]` })), _jsx("div", { className: "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100", style: { background: `linear-gradient(180deg, transparent 40%, ${accent}26)` }, "aria-hidden": "true" }), _jsx("span", { className: "absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-paper backdrop-blur-sm", children: project.categories[0] })] }), _jsxs("div", { className: `flex flex-1 flex-col gap-3 ${compact ? "p-4" : "p-5 md:p-7"}`, children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsx("h3", { className: `font-display font-bold ${featured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`, children: _jsx(Link, { to: detailPath, className: "transition-colors duration-200 after:absolute after:inset-0 after:content-[''] group-hover:text-[var(--accent)]", "aria-label": `Read the ${project.title} case study`, children: project.title }) }), _jsx("span", { className: "font-mono text-xs text-ink/45", children: project.year })] }), _jsx(Link, { to: detailPath, className: "block", tabIndex: -1, "aria-hidden": "true", children: _jsx("p", { className: `text-ink/70 ${featured ? "text-lede" : "text-[0.95rem]"} line-clamp-3`, children: project.description }) }), !compact ? _jsx(TechChips, { items: project.technologies, accent: accent, limit: featured ? 7 : 5 }) : null, !hideContributors && people.length > 0 ? (_jsx("ul", { className: "relative z-[2] flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.82rem]", children: people.map((person) => (_jsx("li", { children: _jsxs(Link, { to: `/team/${person.slug}`, className: "inline-flex items-center gap-1.5 font-semibold text-ink/65 transition-colors hover:text-[var(--accent)]", children: [_jsx("span", { className: "h-2 w-2 rounded-full", style: { background: person.accent }, "aria-hidden": "true" }), person.name] }) }, person.id))) })) : null, _jsxs("div", { className: "relative z-[2] mt-auto flex flex-wrap items-center gap-2 pt-2", children: [_jsxs(Link, { to: detailPath, className: "inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[0.82rem] font-bold text-paper transition-transform duration-200 hover:-translate-y-0.5", children: ["Case study", _jsx(ArrowUpRight, { className: "h-3.5 w-3.5", "aria-hidden": "true" })] }), project.liveDemoUrl ? (_jsxs("a", { href: project.liveDemoUrl, target: "_blank", rel: "noreferrer noopener", className: "inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-[0.82rem] font-semibold text-ink/70 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]", children: [_jsx(ExternalLink, { className: "h-3.5 w-3.5", "aria-hidden": "true" }), "Live demo"] })) : null, project.githubUrl ? (_jsx("a", { href: project.githubUrl, target: "_blank", rel: "noreferrer noopener", className: "inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-[0.82rem] font-semibold text-ink/70 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]", children: "Source" })) : null] })] })] }));
}

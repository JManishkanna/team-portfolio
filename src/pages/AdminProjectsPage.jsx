import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Pencil, Plus, Save, ShieldCheck, Trash2, X } from "lucide-react";
import { projects, resetProjects, saveProjects } from "../data/projects";
import { teamMembers } from "../data/teamMembers";
const emptyForm = {
    slug: "",
    title: "",
    description: "",
    thumbnail: "/images/projects/pulseboard.svg",
    technologies: [],
    contributorIds: [],
    categories: [],
    liveDemoUrl: "",
    githubUrl: "",
    featured: false,
    year: new Date().getFullYear().toString(),
    overview: "",
    problem: "",
    solution: "",
    keyFeatures: "",
};
function toForm(project) {
    return {
        ...project,
        liveDemoUrl: project.liveDemoUrl ?? "",
        githubUrl: project.githubUrl ?? "",
        overview: project.detail.overview,
        problem: project.detail.problem,
        solution: project.detail.solution,
        keyFeatures: project.detail.keyFeatures.join("\n"),
    };
}
function fromForm(form) {
    return {
        slug: form.slug.trim().toLowerCase().replace(/\s+/g, "-"),
        title: form.title.trim(),
        description: form.description.trim(),
        thumbnail: form.thumbnail.trim(),
        technologies: form.technologies,
        contributorIds: form.contributorIds,
        categories: form.categories,
        liveDemoUrl: form.liveDemoUrl?.trim() || undefined,
        githubUrl: form.githubUrl?.trim() || undefined,
        featured: form.featured,
        year: form.year.trim(),
        detail: {
            overview: form.overview.trim(),
            problem: form.problem.trim(),
            solution: form.solution.trim(),
            keyFeatures: form.keyFeatures.split("\n").map((item) => item.trim()).filter(Boolean),
            contributions: form.contributorIds.map((memberId) => ({ memberId, note: "Contributor" })),
        },
    };
}
function splitList(value) {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
}
export default function AdminProjectsPage() {
    const [items, setItems] = useState(projects);
    const [selectedSlug, setSelectedSlug] = useState(null);
    const [form, setForm] = useState(null);
    const [error, setError] = useState("");
    const [saved, setSaved] = useState(false);
    const selected = useMemo(() => items.find((item) => item.slug === selectedSlug), [items, selectedSlug]);
    const update = (key, value) => setForm((current) => (current ? { ...current, [key]: value } : current));
    function startCreate() {
        setSelectedSlug(null);
        setForm(emptyForm);
        setError("");
    }
    function startEdit(project) {
        setSelectedSlug(project.slug);
        setForm(toForm(project));
        setError("");
    }
    function persist(next) {
        setItems(next);
        saveProjects(next);
        setSaved(true);
        window.setTimeout(() => setSaved(false), 2200);
    }
    function submit(event) {
        event.preventDefault();
        if (!form)
            return;
        const nextProject = fromForm(form);
        if (!nextProject.slug || !nextProject.title || !nextProject.description || !nextProject.detail.overview) {
            setError("Slug, title, description, and overview are required.");
            return;
        }
        const duplicate = items.some((item) => item.slug === nextProject.slug && item.slug !== selectedSlug);
        if (duplicate) {
            setError("That slug is already in use. Choose a unique slug.");
            return;
        }
        const next = selectedSlug
            ? items.map((item) => (item.slug === selectedSlug ? nextProject : item))
            : [...items, nextProject];
        persist(next);
        setSelectedSlug(nextProject.slug);
        setForm(toForm(nextProject));
    }
    function remove(project) {
        if (!window.confirm(`Delete “${project.title}”? This cannot be undone from the admin screen.`))
            return;
        persist(items.filter((item) => item.slug !== project.slug));
        if (selectedSlug === project.slug) {
            setSelectedSlug(null);
            setForm(null);
        }
    }
    function resetToSeed() {
        if (!window.confirm("Reset all projects to the shipped seed data?"))
            return;
        resetProjects();
        window.location.reload();
    }
    return (_jsxs("div", { className: "min-h-dvh bg-mist/45 pb-20", children: [_jsx("header", { className: "on-ink-deep border-b border-paper/10", children: _jsxs("div", { className: "shell flex flex-wrap items-center justify-between gap-5 py-7", children: [_jsxs("div", { children: [_jsxs(Link, { to: "/", className: "mb-4 inline-flex items-center gap-2 text-sm text-paper/60 hover:text-lime", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), " Public site"] }), _jsxs("p", { className: "eyebrow text-lime", children: [_jsx(ShieldCheck, { className: "h-3.5 w-3.5" }), " Admin workspace"] }), _jsx("h1", { className: "mt-3 font-display text-display text-paper", children: "Manage projects." }), _jsx("p", { className: "mt-3 max-w-2xl text-paper/65", children: "Add, update, feature, or remove the case studies shown across the public site." })] }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsxs("button", { className: "btn btn--lime", type: "button", onClick: startCreate, children: [_jsx(Plus, { className: "h-4 w-4" }), " New project"] }), _jsx("button", { className: "btn btn--ghost text-paper", type: "button", onClick: resetToSeed, children: "Reset seed data" })] })] }) }), _jsxs("main", { className: "shell grid gap-8 py-10 lg:grid-cols-[0.72fr_1.28fr]", children: [_jsxs("aside", { className: "surface h-fit overflow-hidden", children: [_jsx("div", { className: "border-b border-mist p-5", children: _jsxs("p", { className: "font-mono text-xs uppercase tracking-[0.18em] text-ink/50", children: ["Projects \u00B7 ", items.length] }) }), _jsx("div", { className: "divide-y divide-mist", children: items.map((project) => (_jsxs("div", { className: `flex items-center gap-3 p-4 ${selectedSlug === project.slug ? "bg-lime/20" : ""}`, children: [_jsxs("button", { type: "button", onClick: () => startEdit(project), className: "min-w-0 flex-1 text-left", children: [_jsx("span", { className: "block truncate font-display font-bold", children: project.title }), _jsxs("span", { className: "block truncate font-mono text-xs text-ink/50", children: ["/", project.slug, " \u00B7 ", project.year] })] }), _jsx("button", { type: "button", onClick: () => remove(project), className: "rounded-full p-2 text-coral hover:bg-coral/10", "aria-label": `Delete ${project.title}`, children: _jsx(Trash2, { className: "h-4 w-4" }) })] }, project.slug))) })] }), _jsx("section", { className: "surface p-5 md:p-8", children: !form ? _jsxs("div", { className: "flex min-h-80 flex-col items-center justify-center gap-4 text-center", children: [_jsx(Pencil, { className: "h-10 w-10 text-electric" }), _jsx("h2", { className: "font-display text-2xl font-bold", children: "Choose a project to edit" }), _jsx("p", { className: "max-w-md text-ink/60", children: "Or create a new project to add a case study to the public site." }), _jsxs("button", { className: "btn", type: "button", onClick: startCreate, children: [_jsx(Plus, { className: "h-4 w-4" }), " Add project"] })] }) : (_jsxs("form", { onSubmit: submit, className: "flex flex-col gap-7", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "font-mono text-xs uppercase tracking-[0.18em] text-electric", children: selected ? "Edit project" : "New project" }), _jsx("h2", { className: "mt-2 font-display text-3xl font-bold", children: selected?.title ?? "Untitled project" })] }), _jsx("button", { type: "button", className: "rounded-full p-2 hover:bg-mist", onClick: () => setForm(null), "aria-label": "Close editor", children: _jsx(X, { className: "h-5 w-5" }) })] }), error ? _jsx("p", { className: "rounded-xl bg-coral/10 p-3 text-sm font-semibold text-coral", role: "alert", children: error }) : null, saved ? _jsx("p", { className: "rounded-xl bg-mint/15 p-3 text-sm font-semibold text-ink", role: "status", children: "Saved. Refresh the public site to see the updated content." }) : null, _jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [_jsxs("label", { className: "field", children: ["Title", _jsx("input", { value: form.title, onChange: (e) => update("title", e.target.value), placeholder: "Project title" })] }), _jsxs("label", { className: "field", children: ["Slug", _jsx("input", { value: form.slug, onChange: (e) => update("slug", e.target.value), placeholder: "project-slug" })] }), _jsxs("label", { className: "field md:col-span-2", children: ["Short description", _jsx("textarea", { rows: 3, value: form.description, onChange: (e) => update("description", e.target.value) })] }), _jsxs("label", { className: "field", children: ["Year", _jsx("input", { value: form.year, onChange: (e) => update("year", e.target.value) })] }), _jsxs("label", { className: "field", children: ["Thumbnail URL", _jsx("input", { value: form.thumbnail, onChange: (e) => update("thumbnail", e.target.value) })] }), _jsxs("label", { className: "field", children: ["Technologies ", _jsx("span", { className: "field-hint", children: "comma separated" }), _jsx("input", { value: form.technologies.join(", "), onChange: (e) => update("technologies", splitList(e.target.value)) })] }), _jsxs("label", { className: "field", children: ["Categories ", _jsx("span", { className: "field-hint", children: "comma separated" }), _jsx("input", { value: form.categories.join(", "), onChange: (e) => update("categories", splitList(e.target.value)) })] }), _jsxs("fieldset", { className: "field md:col-span-2", children: [_jsx("legend", { children: "Contributors" }), _jsx("div", { className: "flex flex-wrap gap-3", children: teamMembers.map((member) => _jsxs("label", { className: "inline-flex items-center gap-2 rounded-full bg-mist px-3 py-2 text-sm", children: [_jsx("input", { type: "checkbox", checked: form.contributorIds.includes(member.id), onChange: (e) => update("contributorIds", e.target.checked ? [...form.contributorIds, member.id] : form.contributorIds.filter((id) => id !== member.id)) }), member.name] }, member.id)) })] }), _jsxs("label", { className: "field md:col-span-2", children: ["Overview", _jsx("textarea", { rows: 4, value: form.overview, onChange: (e) => update("overview", e.target.value) })] }), _jsxs("label", { className: "field", children: ["Problem", _jsx("textarea", { rows: 5, value: form.problem, onChange: (e) => update("problem", e.target.value) })] }), _jsxs("label", { className: "field", children: ["Solution", _jsx("textarea", { rows: 5, value: form.solution, onChange: (e) => update("solution", e.target.value) })] }), _jsxs("label", { className: "field md:col-span-2", children: ["Key features ", _jsx("span", { className: "field-hint", children: "one per line" }), _jsx("textarea", { rows: 5, value: form.keyFeatures, onChange: (e) => update("keyFeatures", e.target.value) })] }), _jsxs("label", { className: "field", children: ["Live demo URL", _jsx("input", { value: form.liveDemoUrl, onChange: (e) => update("liveDemoUrl", e.target.value) })] }), _jsxs("label", { className: "field", children: ["GitHub URL", _jsx("input", { value: form.githubUrl, onChange: (e) => update("githubUrl", e.target.value) })] }), _jsxs("label", { className: "inline-flex items-center gap-3 font-semibold md:col-span-2", children: [_jsx("input", { type: "checkbox", checked: form.featured, onChange: (e) => update("featured", e.target.checked) }), " Show as featured on the home page"] })] }), _jsxs("div", { className: "flex flex-wrap justify-end gap-3 border-t border-mist pt-6", children: [_jsx("button", { type: "button", className: "btn btn--ghost", onClick: () => setForm(null), children: "Cancel" }), _jsxs("button", { type: "submit", className: "btn", children: [_jsx(Save, { className: "h-4 w-4" }), " Save project"] })] })] })) })] })] }));
}

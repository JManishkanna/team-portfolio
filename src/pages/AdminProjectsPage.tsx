import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Pencil, Plus, Save, ShieldCheck, Trash2, X } from "lucide-react";
import type { Project } from "../types";
import { projects, resetProjects, saveProjects } from "../data/projects";
import { teamMembers } from "../data/teamMembers";

type ProjectForm = Omit<Project, "detail"> & {
  overview: string;
  problem: string;
  solution: string;
  keyFeatures: string;
};

const emptyForm: ProjectForm = {
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

function toForm(project: Project): ProjectForm {
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

function fromForm(form: ProjectForm): Project {
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

function splitList(value: string): string[] {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>(projects);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const selected = useMemo(() => items.find((item) => item.slug === selectedSlug), [items, selectedSlug]);
  const update = <K extends keyof ProjectForm>(key: K, value: ProjectForm[K]) =>
    setForm((current) => (current ? { ...current, [key]: value } : current));

  function startCreate() {
    setSelectedSlug(null);
    setForm(emptyForm);
    setError("");
  }

  function startEdit(project: Project) {
    setSelectedSlug(project.slug);
    setForm(toForm(project));
    setError("");
  }

  function persist(next: Project[]) {
    setItems(next);
    saveProjects(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) return;
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

  function remove(project: Project) {
    if (!window.confirm(`Delete “${project.title}”? This cannot be undone from the admin screen.`)) return;
    persist(items.filter((item) => item.slug !== project.slug));
    if (selectedSlug === project.slug) {
      setSelectedSlug(null);
      setForm(null);
    }
  }

  function resetToSeed() {
    if (!window.confirm("Reset all projects to the shipped seed data?")) return;
    resetProjects();
    window.location.reload();
  }

  return (
    <div className="min-h-dvh bg-mist/45 pb-20">
      <header className="on-ink-deep border-b border-paper/10">
        <div className="shell flex flex-wrap items-center justify-between gap-5 py-7">
          <div>
            <Link to="/" className="mb-4 inline-flex items-center gap-2 text-sm text-paper/60 hover:text-lime"><ArrowLeft className="h-4 w-4" /> Public site</Link>
            <p className="eyebrow text-lime"><ShieldCheck className="h-3.5 w-3.5" /> Admin workspace</p>
            <h1 className="mt-3 font-display text-display text-paper">Manage projects.</h1>
            <p className="mt-3 max-w-2xl text-paper/65">Add, update, feature, or remove the case studies shown across the public site.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="btn btn--lime" type="button" onClick={startCreate}><Plus className="h-4 w-4" /> New project</button>
            <button className="btn btn--ghost text-paper" type="button" onClick={resetToSeed}>Reset seed data</button>
          </div>
        </div>
      </header>

      <main className="shell grid gap-8 py-10 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="surface h-fit overflow-hidden">
          <div className="border-b border-mist p-5"><p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/50">Projects · {items.length}</p></div>
          <div className="divide-y divide-mist">
            {items.map((project) => (
              <div key={project.slug} className={`flex items-center gap-3 p-4 ${selectedSlug === project.slug ? "bg-lime/20" : ""}`}>
                <button type="button" onClick={() => startEdit(project)} className="min-w-0 flex-1 text-left">
                  <span className="block truncate font-display font-bold">{project.title}</span>
                  <span className="block truncate font-mono text-xs text-ink/50">/{project.slug} · {project.year}</span>
                </button>
                <button type="button" onClick={() => remove(project)} className="rounded-full p-2 text-coral hover:bg-coral/10" aria-label={`Delete ${project.title}`}><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </aside>

        <section className="surface p-5 md:p-8">
          {!form ? <div className="flex min-h-80 flex-col items-center justify-center gap-4 text-center"><Pencil className="h-10 w-10 text-electric" /><h2 className="font-display text-2xl font-bold">Choose a project to edit</h2><p className="max-w-md text-ink/60">Or create a new project to add a case study to the public site.</p><button className="btn" type="button" onClick={startCreate}><Plus className="h-4 w-4" /> Add project</button></div> : (
            <form onSubmit={submit} className="flex flex-col gap-7">
              <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-electric">{selected ? "Edit project" : "New project"}</p><h2 className="mt-2 font-display text-3xl font-bold">{selected?.title ?? "Untitled project"}</h2></div><button type="button" className="rounded-full p-2 hover:bg-mist" onClick={() => setForm(null)} aria-label="Close editor"><X className="h-5 w-5" /></button></div>
              {error ? <p className="rounded-xl bg-coral/10 p-3 text-sm font-semibold text-coral" role="alert">{error}</p> : null}
              {saved ? <p className="rounded-xl bg-mint/15 p-3 text-sm font-semibold text-ink" role="status">Saved. Refresh the public site to see the updated content.</p> : null}
              <div className="grid gap-5 md:grid-cols-2">
                <label className="field">Title<input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Project title" /></label>
                <label className="field">Slug<input value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="project-slug" /></label>
                <label className="field md:col-span-2">Short description<textarea rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} /></label>
                <label className="field">Year<input value={form.year} onChange={(e) => update("year", e.target.value)} /></label>
                <label className="field">Thumbnail URL<input value={form.thumbnail} onChange={(e) => update("thumbnail", e.target.value)} /></label>
                <label className="field">Technologies <span className="field-hint">comma separated</span><input value={form.technologies.join(", ")} onChange={(e) => update("technologies", splitList(e.target.value))} /></label>
                <label className="field">Categories <span className="field-hint">comma separated</span><input value={form.categories.join(", ")} onChange={(e) => update("categories", splitList(e.target.value))} /></label>
                <fieldset className="field md:col-span-2"><legend>Contributors</legend><div className="flex flex-wrap gap-3">{teamMembers.map((member) => <label key={member.id} className="inline-flex items-center gap-2 rounded-full bg-mist px-3 py-2 text-sm"><input type="checkbox" checked={form.contributorIds.includes(member.id)} onChange={(e) => update("contributorIds", e.target.checked ? [...form.contributorIds, member.id] : form.contributorIds.filter((id) => id !== member.id))} />{member.name}</label>)}</div></fieldset>
                <label className="field md:col-span-2">Overview<textarea rows={4} value={form.overview} onChange={(e) => update("overview", e.target.value)} /></label>
                <label className="field">Problem<textarea rows={5} value={form.problem} onChange={(e) => update("problem", e.target.value)} /></label>
                <label className="field">Solution<textarea rows={5} value={form.solution} onChange={(e) => update("solution", e.target.value)} /></label>
                <label className="field md:col-span-2">Key features <span className="field-hint">one per line</span><textarea rows={5} value={form.keyFeatures} onChange={(e) => update("keyFeatures", e.target.value)} /></label>
                <label className="field">Live demo URL<input value={form.liveDemoUrl} onChange={(e) => update("liveDemoUrl", e.target.value)} /></label>
                <label className="field">GitHub URL<input value={form.githubUrl} onChange={(e) => update("githubUrl", e.target.value)} /></label>
                <label className="inline-flex items-center gap-3 font-semibold md:col-span-2"><input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} /> Show as featured on the home page</label>
              </div>
              <div className="flex flex-wrap justify-end gap-3 border-t border-mist pt-6"><button type="button" className="btn btn--ghost" onClick={() => setForm(null)}>Cancel</button><button type="submit" className="btn"><Save className="h-4 w-4" /> Save project</button></div>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}

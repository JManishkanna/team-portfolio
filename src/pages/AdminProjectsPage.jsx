import { useMemo, useState } from "react";
import { ArrowLeft, Check, Pencil, Plus, Save, Search, ShieldCheck, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
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
    liveDemoUrl: form.liveDemoUrl.trim() || undefined,
    githubUrl: form.githubUrl.trim() || undefined,
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
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const selected = useMemo(() => items.find((item) => item.slug === selectedSlug), [items, selectedSlug]);
  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items;
    return items.filter((item) => `${item.title} ${item.slug} ${item.categories.join(" ")}`.toLowerCase().includes(query));
  }, [items, search]);

  const update = (key, value) => setForm((current) => current ? { ...current, [key]: value } : current);

  function startCreate() {
    setSelectedSlug(null);
    setForm({ ...emptyForm, technologies: [], contributorIds: [], categories: [] });
    setError("");
  }

  function startEdit(project) {
    setSelectedSlug(project.slug);
    setForm(toForm(project));
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function persist(next) {
    setItems(next);
    saveProjects(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  }

  function submit(event) {
    event.preventDefault();
    if (!form) return;
    const nextProject = fromForm(form);
    if (!nextProject.slug || !nextProject.title || !nextProject.description || !nextProject.detail.overview) {
      setError("Slug, title, description, and overview are required.");
      return;
    }
    if (items.some((item) => item.slug === nextProject.slug && item.slug !== selectedSlug)) {
      setError("That slug is already in use. Choose a unique slug.");
      return;
    }
    const next = selectedSlug
      ? items.map((item) => item.slug === selectedSlug ? nextProject : item)
      : [...items, nextProject];
    persist(next);
    setSelectedSlug(nextProject.slug);
    setForm(toForm(nextProject));
    setError("");
  }

  function remove(project) {
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
            <Link to="/ADMIN" className="mb-4 inline-flex items-center gap-2 text-sm text-paper/60 hover:text-lime"><ArrowLeft className="h-4 w-4" /> Admin dashboard</Link>
            <p className="eyebrow text-lime"><ShieldCheck className="h-3.5 w-3.5" /> Project editor</p>
            <h1 className="mt-3 font-display text-display text-paper">Update projects quickly.</h1>
            <p className="mt-3 max-w-2xl text-paper/65">Search a project, edit its details, or delete it from the public portfolio.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="btn btn--lime" type="button" onClick={startCreate}><Plus className="h-4 w-4" /> New project</button>
            <button className="btn btn--ghost text-paper" type="button" onClick={resetToSeed}>Reset seed data</button>
          </div>
        </div>
      </header>

      <main className="shell grid gap-8 py-10 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="surface h-fit overflow-hidden lg:sticky lg:top-24">
          <div className="border-b border-mist p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/60">Projects · {items.length}</p>
              <button className="btn btn--lime px-3 py-2 text-xs" type="button" onClick={startCreate}><Plus className="h-3.5 w-3.5" /> Add</button>
            </div>
            <label className="relative mt-4 block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/45" aria-hidden="true" />
              <input className="w-full rounded-xl border border-mist bg-ink/10 py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-electric" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects..." aria-label="Search projects" />
            </label>
          </div>
          <div className="divide-y divide-mist">
            {filteredItems.map((project) => (
              <article key={project.slug} className={`flex items-center gap-3 p-4 transition-colors ${selectedSlug === project.slug ? "bg-lime/20" : "hover:bg-mist/60"}`}>
                <img src={project.thumbnail} alt="" className="h-12 w-16 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <button type="button" onClick={() => startEdit(project)} className="block w-full truncate text-left font-display font-bold hover:text-electric">{project.title}</button>
                  <span className="block truncate font-mono text-xs text-ink/55">/{project.slug} · {project.year}</span>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button type="button" onClick={() => startEdit(project)} className="rounded-full p-2 text-electric hover:bg-electric/10" aria-label={`Edit ${project.title}`}><Pencil className="h-4 w-4" /></button>
                  <button type="button" onClick={() => remove(project)} className="rounded-full p-2 text-coral hover:bg-coral/10" aria-label={`Delete ${project.title}`}><Trash2 className="h-4 w-4" /></button>
                </div>
              </article>
            ))}
            {filteredItems.length === 0 ? <p className="p-6 text-center text-sm text-ink/60">No projects match your search.</p> : null}
          </div>
        </aside>

        <section className="surface p-5 md:p-8">
          {!form ? (
            <div className="flex min-h-80 flex-col items-center justify-center gap-4 text-center">
              <Pencil className="h-10 w-10 text-electric" />
              <h2 className="font-display text-2xl font-bold">Select a project to edit</h2>
              <p className="max-w-md text-ink/60">Use the search and edit buttons on the left, or create a new project in one click.</p>
              <button className="btn" type="button" onClick={startCreate}><Plus className="h-4 w-4" /> Add project</button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-8">
              <div className="flex items-start justify-between gap-4">
                <div><p className="font-mono text-xs uppercase tracking-[0.18em] text-electric">{selected ? "Editing project" : "New project"}</p><h2 className="mt-2 font-display text-3xl font-bold">{selected?.title ?? "Untitled project"}</h2></div>
                <button type="button" className="rounded-full p-2 hover:bg-mist" onClick={() => setForm(null)} aria-label="Close editor"><X className="h-5 w-5" /></button>
              </div>
              {error ? <p className="rounded-xl bg-coral/10 p-3 text-sm font-semibold text-coral" role="alert">{error}</p> : null}
              {saved ? <p className="flex items-center gap-2 rounded-xl bg-mint/15 p-3 text-sm font-semibold text-mint" role="status"><Check className="h-4 w-4" /> Saved. The public site will use this project data after refresh.</p> : null}

              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-electric">Basics</h3>
                <div className="mt-4 grid gap-5 md:grid-cols-2">
                  <label className="field">Title<input value={form.title} onChange={(event) => update("title", event.target.value)} placeholder="Project title" /></label>
                  <label className="field">Slug<input value={form.slug} onChange={(event) => update("slug", event.target.value)} placeholder="project-slug" /></label>
                  <label className="field md:col-span-2">Short description<textarea rows={3} value={form.description} onChange={(event) => update("description", event.target.value)} /></label>
                  <label className="field">Year<input value={form.year} onChange={(event) => update("year", event.target.value)} /></label>
                  <label className="field">Thumbnail URL<input value={form.thumbnail} onChange={(event) => update("thumbnail", event.target.value)} /></label>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-electric">Taxonomy and contributors</h3>
                <div className="mt-4 grid gap-5 md:grid-cols-2">
                  <label className="field">Technologies <span className="field-hint">comma separated</span><input value={form.technologies.join(", ")} onChange={(event) => update("technologies", splitList(event.target.value))} /></label>
                  <label className="field">Categories <span className="field-hint">comma separated</span><input value={form.categories.join(", ")} onChange={(event) => update("categories", splitList(event.target.value))} /></label>
                  <fieldset className="field md:col-span-2"><legend>Contributors</legend><div className="flex flex-wrap gap-3">{teamMembers.map((member) => <label key={member.id} className="inline-flex items-center gap-2 rounded-full bg-mist px-3 py-2 text-sm"><input type="checkbox" checked={form.contributorIds.includes(member.id)} onChange={(event) => update("contributorIds", event.target.checked ? [...form.contributorIds, member.id] : form.contributorIds.filter((id) => id !== member.id))} />{member.name}</label>)}</div></fieldset>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-electric">Case study content</h3>
                <div className="mt-4 grid gap-5 md:grid-cols-2">
                  <label className="field md:col-span-2">Overview<textarea rows={4} value={form.overview} onChange={(event) => update("overview", event.target.value)} /></label>
                  <label className="field">Problem<textarea rows={5} value={form.problem} onChange={(event) => update("problem", event.target.value)} /></label>
                  <label className="field">Solution<textarea rows={5} value={form.solution} onChange={(event) => update("solution", event.target.value)} /></label>
                  <label className="field md:col-span-2">Key features <span className="field-hint">one per line</span><textarea rows={5} value={form.keyFeatures} onChange={(event) => update("keyFeatures", event.target.value)} /></label>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-electric">Links and publishing</h3>
                <div className="mt-4 grid gap-5 md:grid-cols-2">
                  <label className="field">Live demo URL<input value={form.liveDemoUrl} onChange={(event) => update("liveDemoUrl", event.target.value)} /></label>
                  <label className="field">GitHub URL<input value={form.githubUrl} onChange={(event) => update("githubUrl", event.target.value)} /></label>
                  <label className="inline-flex items-center gap-3 font-semibold md:col-span-2"><input type="checkbox" checked={form.featured} onChange={(event) => update("featured", event.target.checked)} /> Show as featured on the home page</label>
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-3 border-t border-mist pt-6">
                {selected ? <button type="button" className="btn btn--ghost text-coral" onClick={() => remove(selected)}><Trash2 className="h-4 w-4" /> Delete project</button> : <span />}
                <div className="flex flex-wrap gap-3"><button type="button" className="btn btn--ghost" onClick={() => setForm(null)}>Cancel</button><button type="submit" className="btn"><Save className="h-4 w-4" /> Save project</button></div>
              </div>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}

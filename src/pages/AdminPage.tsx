import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Database, RotateCcw, Save, ShieldCheck } from "lucide-react";
import { brand, coreValues, navItems, workflow } from "../data/site";
import { achievements } from "../data/achievements";
import { projects, resetProjects } from "../data/projects";
import { teamMembers } from "../data/teamMembers";
import { technologies } from "../data/technology";
import { saveContent } from "../utils/contentStorage";

const sections = [
  ["brand", "Home / brand", brand],
  ["navItems", "Navigation", navItems],
  ["coreValues", "Home / core values", coreValues],
  ["workflow", "Home / workflow", workflow],
  ["teamMembers", "Team members", teamMembers],
  ["technologies", "Skills / technologies", technologies],
  ["achievements", "Achievements", achievements],
  ["projects", "Projects", projects],
] as const;

export default function AdminPage() {
  const [active, setActive] = useState<(typeof sections)[number][0]>("brand");
  const [drafts, setDrafts] = useState<Record<string, string>>(() =>
    Object.fromEntries(sections.map(([key, , value]) => [key, JSON.stringify(value, null, 2)])),
  );
  const [message, setMessage] = useState("");
  const current = sections.find(([key]) => key === active)!;

  function save() {
    try {
      const parsed = JSON.parse(drafts[active]!);
      if (active === "projects") {
        localStorage.setItem("fullstack-crew.projects", JSON.stringify(parsed));
      } else {
        saveContent(active, parsed);
      }
      setMessage(`${current[1]} saved. Refresh the public site to see the change.`);
    } catch {
      setMessage("This is not valid JSON. Fix the syntax before saving.");
    }
  }

  function reset() {
    if (!window.confirm("Clear all admin edits and restore the shipped content?")) return;
    sections.forEach(([key]) => localStorage.removeItem(`fullstack-crew.${key}`));
    resetProjects();
    window.location.reload();
  }

  return (
    <div className="min-h-dvh bg-mist/45 pb-20">
      <header className="on-ink-deep border-b border-paper/10"><div className="shell flex flex-wrap items-center justify-between gap-5 py-8"><div><Link to="/" className="mb-4 inline-flex items-center gap-2 text-sm text-paper/60 hover:text-lime"><ArrowLeft className="h-4 w-4" /> Public site</Link><p className="eyebrow text-lime"><ShieldCheck className="h-3.5 w-3.5" /> Admin workspace</p><h1 className="mt-3 font-display text-display text-paper">Manage every page.</h1><p className="mt-3 max-w-2xl text-paper/65">Edit the JSON content that powers the home, team, skills, achievements, projects, navigation, and portfolio pages.</p></div><button className="btn btn--ghost text-paper" type="button" onClick={reset}><RotateCcw className="h-4 w-4" /> Reset all content</button></div></header>
      <main className="shell grid gap-8 py-10 lg:grid-cols-[0.34fr_0.66fr]">
        <aside className="surface h-fit overflow-hidden"><div className="border-b border-mist p-5"><p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/50">Content areas</p></div><nav className="divide-y divide-mist" aria-label="Admin content areas">{sections.map(([key, label]) => <button key={key} type="button" onClick={() => { setActive(key); setMessage(""); }} className={`flex w-full items-center gap-3 p-4 text-left text-sm font-semibold ${key === active ? "bg-lime/25 text-ink" : "text-ink/65 hover:bg-mist/60"}`}><Database className="h-4 w-4 text-electric" />{label}</button>)}</nav><div className="border-t border-mist p-4"><Link to="/admin/projects" className="text-sm font-bold text-electric hover:underline">Open visual project editor →</Link></div></aside>
        <section className="surface p-5 md:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-electric">Content editor</p><h2 className="mt-2 font-display text-3xl font-bold">{current[1]}</h2></div><button className="btn" type="button" onClick={save}><Save className="h-4 w-4" /> Save changes</button></div>{message ? <p className={`mt-5 rounded-xl p-3 text-sm font-semibold ${message.startsWith("This") ? "bg-coral/10 text-coral" : "bg-mint/15"}`} role="status">{message}</p> : null}<p className="mt-6 text-sm text-ink/60">Edit the structured data below. Arrays use JSON syntax; strings must be wrapped in double quotes.</p><textarea className="mt-4 min-h-[32rem] w-full rounded-xl border border-mist bg-ink-deep p-5 font-mono text-sm leading-relaxed text-lime outline-none focus:ring-4 focus:ring-electric/20" value={drafts[active]} onChange={(event) => setDrafts((old) => ({ ...old, [active]: event.target.value }))} spellCheck={false} aria-label={`${current[1]} JSON`} /></section>
      </main>
    </div>
  );
}

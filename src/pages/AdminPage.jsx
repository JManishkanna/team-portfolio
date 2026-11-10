import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
];
const RECENT_EDITS_KEY = "fullstack-crew.admin-recent-edits";
const PREVIEW_KEY = "fullstack-crew.admin-preview";
const sectionLabel = (key) => sections.find(([itemKey]) => itemKey === key)?.[1] ?? key;

export default function AdminPage() {
    const initialDrafts = Object.fromEntries(sections.map(([key, , value]) => [key, JSON.stringify(value, null, 2)]));
    const [drafts, setDrafts] = useState(initialDrafts);
    const [active, setActive] = useState("overview");
    const [advanced, setAdvanced] = useState(false);
    const [message, setMessage] = useState("");
    const [recentEdits, setRecentEdits] = useState(() => {
        try { return JSON.parse(localStorage.getItem(RECENT_EDITS_KEY) ?? "[]"); } catch { return []; }
    });
    const [savedDrafts, setSavedDrafts] = useState(initialDrafts);
    const dirtyKeys = sections.filter(([key]) => drafts[key] !== savedDrafts[key]).map(([key]) => key);
    const parsedDrafts = (key) => {
        const value = JSON.parse(drafts[key]);
        if (key === "brand") {
            for (const field of ["name", "tagline", "description", "email", "location"]) {
                if (typeof value[field] !== "string" || !value[field].trim()) throw new Error(`Brand field “${field}” is required.`);
            }
        } else if (key === "projects" || key === "teamMembers" || key === "technologies" || key === "achievements" || key === "navItems" || key === "coreValues" || key === "workflow") {
            if (!Array.isArray(value)) throw new Error(`${sectionLabel(key)} must be a JSON array.`);
        }
        return value;
    };
    function updateDraft(key, value) {
        setDrafts((previous) => ({ ...previous, [key]: value }));
        setMessage("");
    }
    function save(key = active) {
        try {
            const value = parsedDrafts(key);
            if (key === "projects") localStorage.setItem("fullstack-crew.projects", JSON.stringify(value));
            else saveContent(key, value);
            const savedAt = new Date().toISOString();
            const nextRecent = [{ key, savedAt }, ...recentEdits.filter((edit) => edit.key !== key)].slice(0, 6);
            localStorage.setItem(RECENT_EDITS_KEY, JSON.stringify(nextRecent));
            setRecentEdits(nextRecent);
            setSavedDrafts((previous) => ({ ...previous, [key]: drafts[key] }));
            setMessage(`${sectionLabel(key)} published to this browser.`);
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Check the content and try again.");
        }
    }
    function preview() {
        try {
            const snapshot = Object.fromEntries(sections.map(([key]) => [key, parsedDrafts(key)]));
            sessionStorage.setItem(PREVIEW_KEY, JSON.stringify(snapshot));
            const tab = window.open("/?adminPreview=1", "_blank");
            if (!tab) setMessage("Preview was blocked by the browser. Allow pop-ups for this site and try again.");
            else setMessage("Preview opened in a new tab. Drafts are not published.");
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Fix invalid draft content before previewing.");
        }
    }
    function reset() {
        if (!window.confirm("Reset all saved content and discard every unsaved draft? This cannot be undone.")) return;
        sections.forEach(([key]) => localStorage.removeItem(`fullstack-crew.${key}`));
        localStorage.removeItem(RECENT_EDITS_KEY);
        resetProjects();
        window.location.reload();
    }
    const validCount = sections.filter(([key]) => { try { parsedDrafts(key); return true; } catch { return false; } }).length;
    const activeSection = sections.find(([key]) => key === active);
    const brandDraft = (() => { try { return JSON.parse(drafts.brand); } catch { return {}; } })();
    const renderBrandField = (name, label, multiline = false) => {
        const Input = multiline ? "textarea" : "input";
        return <label key={name} className="field"><span>{label}</span><Input rows={multiline ? 4 : undefined} value={brandDraft[name] ?? ""} onChange={(event) => { try { updateDraft("brand", JSON.stringify({ ...JSON.parse(drafts.brand), [name]: event.target.value }, null, 2)); } catch { updateDraft("brand", JSON.stringify({ ...brandDraft, [name]: event.target.value }, null, 2)); } }} /></label>;
    };
    return <div className="admin-console min-h-dvh bg-mist/45 pb-16">
        <header className="on-ink-deep border-b border-paper/10"><div className="shell flex flex-wrap items-center justify-between gap-5 py-7">
            <div><Link to="/" className="mb-3 inline-flex items-center gap-2 text-sm text-paper/60 hover:text-lime"><ArrowLeft className="h-4 w-4" /> Public site</Link><p className="eyebrow text-electric"><ShieldCheck className="h-3.5 w-3.5" /> Admin control room</p><h1 className="mt-2 font-display text-4xl font-bold text-paper">Content overview</h1><p className="mt-2 text-sm text-paper/60">Review, preview, and publish your portfolio content.</p></div>
            <div className="flex flex-wrap items-center gap-3"><span className={`rounded-lg border px-3 py-2 font-mono text-xs ${dirtyKeys.length ? "border-yellow/30 bg-yellow/10 text-yellow" : "border-lime/25 bg-lime/10 text-lime"}`}>{dirtyKeys.length ? `${dirtyKeys.length} unsaved section${dirtyKeys.length === 1 ? "" : "s"}` : "All changes saved"}</span><button className="btn btn--ghost text-paper" type="button" onClick={reset}><RotateCcw className="h-4 w-4" /> Reset all content</button></div>
        </div></header>
        <main className="shell py-8">
            <div className="grid gap-4 sm:grid-cols-3">
                <article className="surface p-5"><p className="font-mono text-xs uppercase tracking-[.16em] text-ink/50">Content readiness</p><p className="mt-2 font-display text-3xl font-bold text-electric">{Math.round(validCount / sections.length * 100)}%</p><p className="mt-1 text-sm text-ink/55">{validCount} of {sections.length} sections pass validation</p><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-electric transition-all" style={{ width: `${validCount / sections.length * 100}%` }} /></div></article>
                <article className="surface p-5"><p className="font-mono text-xs uppercase tracking-[.16em] text-ink/50">Publishing state</p><p className="mt-2 font-display text-2xl font-bold">{dirtyKeys.length ? "Drafts need review" : "Published content current"}</p><p className="mt-1 text-sm text-ink/55">{dirtyKeys.length ? `${dirtyKeys.map(sectionLabel).join(", ")} not yet saved` : "No unsaved changes in this session"}</p></article>
                <article className="surface p-5"><p className="font-mono text-xs uppercase tracking-[.16em] text-ink/50">Recent edits</p>{recentEdits.length ? <ul className="mt-2 space-y-2">{recentEdits.slice(0, 2).map((edit) => <li key={edit.key} className="flex items-center justify-between gap-2 text-sm"><span className="font-semibold">{sectionLabel(edit.key)}</span><time className="font-mono text-xs text-ink/50">{new Date(edit.savedAt).toLocaleDateString()}</time></li>)}</ul> : <p className="mt-3 text-sm text-ink/55">No edits published yet.</p>}</article>
            </div>
            <section className="mt-6"><div className="mb-3 flex items-center justify-between gap-3"><h2 className="font-display text-xl font-bold">Quick access</h2><button type="button" className="btn btn--ghost" onClick={preview}>Preview public page</button></div><div className="grid gap-3 sm:grid-cols-3">{[["teamMembers", "Team", "Edit the team roster and specialist profiles."], ["projects", "Projects", "Manage mission details and technologies."], ["brand", "Brand", "Update the site identity and hero copy."]].map(([key, title, detail]) => <button key={key} type="button" onClick={() => { setActive(key); setMessage(""); }} className="surface text-left p-4 transition-colors hover:border-electric"><span className="font-mono text-xs uppercase tracking-[.15em] text-electric">{title}</span><p className="mt-1 text-sm text-ink/60">{detail}</p></button>)}</div></section>
            <div className="mt-8 grid gap-6 lg:grid-cols-[0.32fr_0.68fr]">
                <aside className="surface h-fit overflow-hidden"><p className="border-b border-mist p-4 font-mono text-xs uppercase tracking-[.16em] text-ink/50">Content areas</p><nav className="divide-y divide-mist" aria-label="Admin content areas"><button type="button" onClick={() => setActive("overview")} className={`w-full p-3 text-left text-sm font-semibold ${active === "overview" ? "bg-electric/10 text-electric" : "text-ink/65 hover:bg-mist/50"}`}>Overview</button>{sections.map(([key, label]) => <button key={key} type="button" onClick={() => { setActive(key); setMessage(""); setAdvanced(false); }} className={`flex w-full items-center justify-between gap-2 p-3 text-left text-sm font-semibold ${key === active ? "bg-electric/10 text-electric" : "text-ink/65 hover:bg-mist/50"}`}><span className="inline-flex items-center gap-2"><Database className="h-4 w-4 text-electric" />{label}</span><span className={`font-mono text-[.6rem] uppercase ${dirtyKeys.includes(key) ? "text-yellow" : "text-ink/40"}`}>{dirtyKeys.includes(key) ? "Draft" : "Published"}</span></button>)}</nav><Link to="/admin/projects" className="block border-t border-mist p-4 text-sm font-bold text-electric hover:underline">Open visual project editor →</Link></aside>
                <section className="surface min-h-[28rem] p-5 md:p-7">
                    {active === "overview" ? <div><p className="font-mono text-xs uppercase tracking-[.16em] text-electric">Workspace summary</p><h2 className="mt-2 font-display text-2xl font-bold">Your content, at a glance</h2><p className="mt-2 max-w-2xl text-sm text-ink/60">Choose a section to edit. Preview opens a separate public tab using your current drafts; publishing is a separate action.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{sections.map(([key, label]) => <button key={key} type="button" onClick={() => setActive(key)} className="flex items-center justify-between rounded-xl border border-mist p-4 text-left hover:border-electric"><span className="font-semibold">{label}</span><span className={`font-mono text-[.62rem] uppercase ${dirtyKeys.includes(key) ? "text-yellow" : "text-lime"}`}>{dirtyKeys.includes(key) ? "Unsaved draft" : "Published"}</span></button>)}</div></div> : <>
                        <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-[.16em] text-electric">{dirtyKeys.includes(active) ? "Draft changes" : "Published content"}</p><h2 className="mt-1 font-display text-2xl font-bold">{activeSection?.[1]}</h2></div><div className="flex flex-wrap gap-2"><button type="button" className="btn btn--ghost" onClick={preview}>Preview</button><button type="button" className="btn" onClick={() => save()}><Save className="h-4 w-4" /> Publish</button></div></div>
                        <div className="mt-5 flex items-center justify-between gap-3"><p className="text-sm text-ink/55">{active === "brand" && !advanced ? "Edit brand fields with validation." : "Advanced mode: edit structured JSON directly."}</p><button type="button" className="font-mono text-xs font-bold uppercase tracking-wide text-electric hover:underline" onClick={() => setAdvanced((value) => !value)}>{advanced ? "Use labeled fields" : "Advanced JSON"}</button></div>
                        {active === "brand" && !advanced ? <div className="mt-5 grid gap-4 sm:grid-cols-2">{renderBrandField("name", "Site name")}{renderBrandField("tagline", "Tagline")}{renderBrandField("altTagline", "Secondary tagline")}{renderBrandField("email", "Contact email")}{renderBrandField("location", "Location")}{renderBrandField("description", "Description", true)}</div> : <textarea className="mt-4 min-h-[26rem] w-full rounded-xl border border-mist bg-ink-deep p-4 font-mono text-sm leading-relaxed text-lime outline-none focus:ring-4 focus:ring-electric/20" value={drafts[active]} onChange={(event) => updateDraft(active, event.target.value)} spellCheck={false} aria-label={`${activeSection?.[1]} JSON`} />}
                    </>}
                    {message && <p className={`mt-5 rounded-xl border p-3 text-sm font-semibold ${message.toLowerCase().includes("invalid") || message.includes("required") || message.includes("must be") || message.includes("blocked") ? "border-coral/25 bg-coral/10 text-coral" : "border-electric/20 bg-electric/5 text-ink"}`} role="status">{message}</p>}
                </section>
            </div>
        </main>
    </div>;
}
function LegacyAdminPage() {
    const [active, setActive] = useState("brand");
    const [drafts, setDrafts] = useState(() => Object.fromEntries(sections.map(([key, , value]) => [key, JSON.stringify(value, null, 2)])));
    const [message, setMessage] = useState("");
    const current = sections.find(([key]) => key === active);
    function save() {
        try {
            const parsed = JSON.parse(drafts[active]);
            if (active === "projects") {
                localStorage.setItem("fullstack-crew.projects", JSON.stringify(parsed));
            }
            else {
                saveContent(active, parsed);
            }
            setMessage(`${current[1]} saved. Refresh the public site to see the change.`);
        }
        catch {
            setMessage("This is not valid JSON. Fix the syntax before saving.");
        }
    }
    function reset() {
        if (!window.confirm("Clear all admin edits and restore the shipped content?"))
            return;
        sections.forEach(([key]) => localStorage.removeItem(`fullstack-crew.${key}`));
        resetProjects();
        window.location.reload();
    }
    return (_jsxs("div", { className: "min-h-dvh bg-mist/45 pb-20", children: [_jsx("header", { className: "on-ink-deep border-b border-paper/10", children: _jsxs("div", { className: "shell flex flex-wrap items-center justify-between gap-5 py-8", children: [_jsxs("div", { children: [_jsxs(Link, { to: "/", className: "mb-4 inline-flex items-center gap-2 text-sm text-paper/60 hover:text-lime", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), " Public site"] }), _jsxs("p", { className: "eyebrow text-lime", children: [_jsx(ShieldCheck, { className: "h-3.5 w-3.5" }), " Admin workspace"] }), _jsx("h1", { className: "mt-3 font-display text-display text-paper", children: "Manage every page." }), _jsx("p", { className: "mt-3 max-w-2xl text-paper/65", children: "Edit the JSON content that powers the home, team, skills, achievements, projects, navigation, and portfolio pages." })] }), _jsxs("button", { className: "btn btn--ghost text-paper", type: "button", onClick: reset, children: [_jsx(RotateCcw, { className: "h-4 w-4" }), " Reset all content"] })] }) }), _jsxs("main", { className: "shell grid gap-8 py-10 lg:grid-cols-[0.34fr_0.66fr]", children: [_jsxs("aside", { className: "surface h-fit overflow-hidden", children: [_jsx("div", { className: "border-b border-mist p-5", children: _jsx("p", { className: "font-mono text-xs uppercase tracking-[0.18em] text-ink/50", children: "Content areas" }) }), _jsx("nav", { className: "divide-y divide-mist", "aria-label": "Admin content areas", children: sections.map(([key, label]) => _jsxs("button", { type: "button", onClick: () => { setActive(key); setMessage(""); }, className: `flex w-full items-center gap-3 p-4 text-left text-sm font-semibold ${key === active ? "bg-lime/25 text-ink" : "text-ink/65 hover:bg-mist/60"}`, children: [_jsx(Database, { className: "h-4 w-4 text-electric" }), label] }, key)) }), _jsx("div", { className: "border-t border-mist p-4", children: _jsx(Link, { to: "/admin/projects", className: "text-sm font-bold text-electric hover:underline", children: "Open visual project editor \u2192" }) })] }), _jsxs("section", { className: "surface p-5 md:p-8", children: [_jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "font-mono text-xs uppercase tracking-[0.18em] text-electric", children: "Content editor" }), _jsx("h2", { className: "mt-2 font-display text-3xl font-bold", children: current[1] })] }), _jsxs("button", { className: "btn", type: "button", onClick: save, children: [_jsx(Save, { className: "h-4 w-4" }), " Save changes"] })] }), message ? _jsx("p", { className: `mt-5 rounded-xl p-3 text-sm font-semibold ${message.startsWith("This") ? "bg-coral/10 text-coral" : "bg-mint/15"}`, role: "status", children: message }) : null, _jsx("p", { className: "mt-6 text-sm text-ink/60", children: "Edit the structured data below. Arrays use JSON syntax; strings must be wrapped in double quotes." }), _jsx("textarea", { className: "mt-4 min-h-[32rem] w-full rounded-xl border border-mist bg-ink-deep p-5 font-mono text-sm leading-relaxed text-lime outline-none focus:ring-4 focus:ring-electric/20", value: drafts[active], onChange: (event) => setDrafts((old) => ({ ...old, [active]: event.target.value })), spellCheck: false, "aria-label": `${current[1]} JSON` })] })] })] }));
}

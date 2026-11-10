import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Mail, Globe } from "lucide-react";
import { GithubMark, LinkedinMark } from "./BrandIcons";
const base = "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ease-out hover:-translate-y-0.5";
/**
 * Renders only links that exist. Missing URLs show a hint rather than a dead
 * button, so nothing on the site pretends to go somewhere it cannot.
 */
export function SocialLinks({ member, accent = "#4361EE", showEmptyHint = false }) {
    const links = [
        member.githubUrl
            ? { key: "github", href: member.githubUrl, label: `${member.name} on GitHub`, Icon: GithubMark }
            : null,
        member.linkedinUrl
            ? { key: "linkedin", href: member.linkedinUrl, label: `${member.name} on LinkedIn`, Icon: LinkedinMark }
            : null,
        member.portfolioUrl
            ? { key: "site", href: member.portfolioUrl, label: `${member.name}'s personal website`, Icon: Globe }
            : null,
        member.email
            ? { key: "email", href: `mailto:${member.email}`, label: `Email ${member.name}`, Icon: Mail }
            : null,
    ].filter(Boolean);
    if (links.length === 0) {
        return showEmptyHint ? (_jsxs("p", { className: "text-sm text-ink/55", children: ["No external profiles configured for ", member.name, " yet \u2014 add `githubUrl`, `linkedinUrl` or `portfolioUrl` in ", _jsx("code", { className: "font-mono text-xs", children: "src/data/teamMembers.ts" }), "."] })) : null;
    }
    return (_jsx("ul", { className: "flex items-center gap-2.5", children: links.map(({ key, href, label, Icon }) => (_jsx("li", { children: _jsx("a", { href: href, "aria-label": label, title: label, className: base, style: { borderColor: `${accent}55`, color: accent }, ...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {}), children: _jsx(Icon, { className: "h-4.5 w-4.5" }) }) }, key))) }));
}

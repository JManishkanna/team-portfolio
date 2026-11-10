import { useEffect } from "react";
import { brand } from "../data/site";
function setMeta(attr, key, value) {
    let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
    }
    tag.setAttribute("content", value);
}
/**
 * Applies per-route title, description and Open Graph tags. Canonical URLs are
 * only emitted when VITE_SITE_URL is a real deployed origin.
 */
export function useSeo({ title, description, path }) {
    useEffect(() => {
        const fullTitle = title.includes(brand.name) ? title : `${title} | ${brand.name}`;
        document.title = fullTitle;
        setMeta("name", "description", description);
        setMeta("property", "og:title", fullTitle);
        setMeta("property", "og:description", description);
        setMeta("property", "og:url", `${globalThis.location?.origin ?? ""}${path}`);
        setMeta("name", "twitter:title", fullTitle);
        setMeta("name", "twitter:description", description);
        const siteUrl = import.meta.env.VITE_SITE_URL;
        let link = document.head.querySelector('link[rel="canonical"]');
        if (siteUrl) {
            if (!link) {
                link = document.createElement("link");
                link.rel = "canonical";
                document.head.appendChild(link);
            }
            link.href = `${siteUrl.replace(/\/$/, "")}${path}`;
        }
        else if (link) {
            link.remove();
        }
    }, [title, description, path]);
}

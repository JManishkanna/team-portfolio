/**
 * Generates public/sitemap.xml and public/robots.txt from the shipped data files.
 *
 * Slugs are read straight out of src/data/*.ts so the sitemap can never drift
 * from the routes the app actually registers.
 *
 * Usage:  VITE_SITE_URL=https://example.com npm run sitemap
 * Refuses to guess a domain — without VITE_SITE_URL it exits with instructions.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = (process.env.VITE_SITE_URL ?? "").trim().replace(/\/+$/, "");

if (!siteUrl || !/^https?:\/\/./.test(siteUrl)) {
  console.error(
    "[sitemap] Set VITE_SITE_URL to your deployed origin first, e.g.\n" +
      "  VITE_SITE_URL=https://your-domain.com npm run sitemap\n" +
      "Nothing was written — the script will not invent a domain."
  );
  process.exit(1);
}

const slugsFrom = (file, pattern) =>
  [...readFileSync(join(root, "src/data", file), "utf8").matchAll(pattern)].map((m) => m[1]);

const memberSlugs = slugsFrom("teamMembers.ts", /^\s*slug:\s*"([^"]+)"/gm);
const projectSlugs = slugsFrom("projects.ts", /^\s*slug:\s*"([^"]+)"/gm);

const today = new Date().toISOString().slice(0, 10);

const urls = [
  { path: "/", priority: "1.0", frequency: "monthly" },
  { path: "/team", priority: "0.9", frequency: "weekly" },
  { path: "/projects", priority: "0.9", frequency: "weekly" },
  { path: "/skills", priority: "0.7", frequency: "monthly" },
  { path: "/achievements", priority: "0.7", frequency: "monthly" },
  { path: "/contact", priority: "0.8", frequency: "yearly" },
  ...memberSlugs.flatMap((slug) => [
    { path: `/team/${slug}`, priority: "0.8", frequency: "weekly" },
    { path: `/team/${slug}/projects`, priority: "0.6", frequency: "monthly" },
    { path: `/team/${slug}/contact`, priority: "0.5", frequency: "yearly" },
  ]),
  ...projectSlugs.map((slug) => ({ path: `/project/${slug}`, priority: "0.7", frequency: "monthly" })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n` +
      `    <loc>${siteUrl}${u.path}</loc>\n` +
      `    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>${u.frequency}</changefreq>\n` +
      `    <priority>${u.priority}</priority>\n` +
      `  </url>`
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(join(root, "public/sitemap.xml"), sitemap);
writeFileSync(join(root, "public/robots.txt"), robots);
console.log(`[sitemap] wrote ${urls.length} urls -> public/sitemap.xml and public/robots.txt`);

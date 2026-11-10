import type { NavItem } from "../types";
import { hydrateArray, hydrateObject } from "../utils/contentStorage";

export const brand = {
  name: "Team Vinsmokes",
  tagline: "WE DESIGN. WE BUILD. WE SHIP.",
  altTagline: "Different Minds. One Stack. Infinite Possibilities.",
  description:
    "We are a team of full-stack developers transforming ideas into powerful, responsive, and scalable digital experiences.",
  /**
   * Placeholder addresses on the reserved `.example` TLD (RFC 2606): they cannot
   * deliver mail, so nothing real is fabricated. Replace with your own inboxes.
   */
  email: "hello@fullstackcrew.example",
  location: "Bengaluru, India",
} as const;

export const navItems: NavItem[] = [
  { label: "Home", to: "/", accent: "#4361EE" },
  { label: "Team", to: "/team", accent: "#06D6A0" },
  { label: "Projects", to: "/projects", accent: "#FF6B35" },
  { label: "Skills", to: "/skills", accent: "#845EC2" },
  { label: "Achievements", to: "/achievements", accent: "#FFD166" },
  { label: "Contact", to: "/contact", accent: "#FF5A7A" },
];

export const cta = { label: "Let's Collaborate", to: "/contact" } as const;

export const heroHeadline = ["WE", "BUILD", "THE", "DIGITAL", "FUTURE."] as const;

export const coreValues = [
  {
    title: "Ship, then polish",
    body: "Every sprint ends with something a human can click. Refactors follow evidence, not guesswork.",
    accent: "#4361EE",
  },
  {
    title: "Own the whole stack",
    body: "The person who draws the screen is comfortable writing the migration behind it.",
    accent: "#06D6A0",
  },
  {
    title: "Accessible by default",
    body: "Keyboard paths, contrast and reduced motion are part of the definition of done, not a cleanup pass.",
    accent: "#FF6B35",
  },
  {
    title: "Review generously",
    body: "Pull requests are conversations. We explain the why, and we change our minds on evidence.",
    accent: "#845EC2",
  },
];

export const workflow = [
  {
    step: "01",
    title: "Frame",
    body: "We turn the request into a one-page brief: who uses it, what changes, how we measure it.",
    accent: "#4361EE",
  },
  {
    step: "02",
    title: "Design",
    body: "Flows before pixels. Components are chosen from a shared token set so screens stay consistent.",
    accent: "#FF5A7A",
  },
  {
    step: "03",
    title: "Build",
    body: "Typed contracts between client and API, feature branches, small diffs, CI on every push.",
    accent: "#06D6A0",
  },
  {
    step: "04",
    title: "Harden",
    body: "Unit and end-to-end checks, responsive sweeps at 320–1920px, keyboard-only walkthroughs.",
    accent: "#845EC2",
  },
  {
    step: "05",
    title: "Ship & watch",
    body: "Deploy, then read logs and analytics for a week. Fix what the data says, not what we assumed.",
    accent: "#FF6B35",
  },
];

hydrateObject("brand", brand);
hydrateArray("navItems", navItems);
hydrateArray("coreValues", coreValues);
hydrateArray("workflow", workflow);

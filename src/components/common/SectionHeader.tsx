import type { CSSProperties, ReactNode } from "react";
import { Reveal, StaggerGroup, staggerItem } from "../animations/Reveal";
import { motion } from "framer-motion";

/**
 * React's CSSProperties has no index signature, so custom properties need this
 * intersection. Build the object by key assignment to avoid excess-property
 * errors, then hand it to `style` — `Vars` is assignable to CSSProperties.
 */
export type Vars = CSSProperties & { [key: `--${string}`]: string };

export function vars(entries: Record<string, string>): Vars {
  const result: Vars = {};
  for (const [key, value] of Object.entries(entries)) {
    result[key as `--${string}`] = value;
  }
  return result;
}

export const accentStyle = (accent: string) => vars({ "--accent": accent });

export function Badge({ children, accent }: { children: ReactNode; accent?: string }) {
  return (
    <span className="chip" style={accent ? accentStyle(accent) : undefined}>
      {children}
    </span>
  );
}

export function TechChips({ items, accent, limit }: { items: string[]; accent?: string; limit?: number }) {
  const shown = limit ? items.slice(0, limit) : items;
  const rest = limit ? items.length - shown.length : 0;

  return (
    <StaggerGroup className="flex flex-wrap gap-2" stagger={0.04}>
      {shown.map((item) => (
        <motion.span key={item} variants={staggerItem}>
          <Badge accent={accent}>{item}</Badge>
        </motion.span>
      ))}
      {rest > 0 ? (
        <motion.span variants={staggerItem}>
          <span className="chip" style={accentStyle("#94A3B8")}>
            +{rest} more
          </span>
        </motion.span>
      ) : null}
    </StaggerGroup>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  accent?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  action?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  accent = "#4361EE",
  align = "left",
  tone = "light",
  action,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "items-start";
  const ledeColor = tone === "dark" ? "text-paper/70" : "text-ink/70";

  return (
    <header className={`flex flex-col gap-4 ${alignClass}`}>
      {eyebrow ? (
        <Reveal>
          <span className="eyebrow" style={accentStyle(accent)}>
            {eyebrow}
          </span>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <h2 className={`text-display ${tone === "dark" ? "text-paper" : "text-ink"} max-w-3xl`}>{title}</h2>
      </Reveal>

      {lede ? (
        <Reveal delay={0.1}>
          <p className={`max-w-2xl text-lede ${ledeColor}`}>{lede}</p>
        </Reveal>
      ) : null}

      {action ? <Reveal delay={0.15}>{action}</Reveal> : null}
    </header>
  );
}

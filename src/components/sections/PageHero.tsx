import type { ReactNode } from "react";
import { BackdropDecor } from "../animations/BackdropDecor";
import { Breadcrumbs } from "../common/Breadcrumbs";
import type { Crumb } from "../common/Breadcrumbs";
import { StaggerText } from "../animations/StaggerText";
import { Reveal } from "../animations/Reveal";
import { accentStyle, vars } from "../common/SectionHeader";

interface PageHeroProps {
  eyebrow: string;
  titleWords: readonly string[];
  accentWords?: readonly string[];
  lede: ReactNode;
  accent: string;
  crumbs: Crumb[];
  aside?: ReactNode;
}

/**
 * Every route opens on the same dark band. That keeps the fixed navbar's white
 * text above contrast on all pages, and gives the site a consistent entrance.
 */
export function PageHero({ eyebrow, titleWords, accentWords, lede, accent, crumbs, aside }: PageHeroProps) {
  return (
    <section
      className="on-ink relative overflow-hidden"
      style={vars({ "--page-accent": accent, "--accent": accent })}
    >
      <BackdropDecor tone="dark" variant="hero" />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: `radial-gradient(70% 100% at 50% 100%, ${accent}33, transparent)` }}
        aria-hidden="true"
      />

      <div className="shell relative grid gap-10 pb-16 pt-32 md:pb-24 md:pt-40 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div className="flex flex-col gap-6">
          <div style={accentStyle(accent)}>
            <Breadcrumbs items={crumbs} tone="dark" />
          </div>

          <Reveal>
            <span className="eyebrow" style={accentStyle(accent)}>
              {eyebrow}
            </span>
          </Reveal>

          <StaggerText
            words={titleWords}
            accentWords={accentWords ?? []}
            accentClassName="text-[var(--page-accent)]"
            className="font-display text-display max-w-4xl font-bold text-paper"
          />

          <Reveal delay={0.15}>
            <p className="max-w-2xl text-lede text-paper/70">{lede}</p>
          </Reveal>
        </div>

        {aside ? (
          <Reveal delay={0.2} className="lg:justify-self-end">
            {aside}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

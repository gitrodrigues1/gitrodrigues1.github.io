"use client";

import Reveal from "./Reveal";

interface ResumeItemCardProps {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  highlights?: string[];
  index?: number;
}

/** Glass card used for experience & education entries. */
export default function ResumeItemCard({
  title,
  subtitle,
  period,
  description,
  highlights,
  index = 0,
}: ResumeItemCardProps) {
  return (
    <Reveal delay={index * 0.08}>
      <article className="group relative overflow-hidden rounded-2xl border border-line/70 bg-surface/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_8px_40px_-12px_rgba(255,122,77,0.35)]">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        />
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-fg-strong">
              {title}
            </h3>
            <div className="mt-1 text-sm font-bold uppercase tracking-[0.15em] text-primary">
              {subtitle}
            </div>
            {description && (
              <p className="mt-3 leading-relaxed text-fg">{description}</p>
            )}
            {highlights && (
              <ul className="mt-4 space-y-2.5">
                {highlights.map((highlight) => (
                  <li
                    key={highlight.slice(0, 40)}
                    className="flex gap-3 text-sm leading-relaxed text-fg"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            {period}
          </span>
        </div>
      </article>
    </Reveal>
  );
}

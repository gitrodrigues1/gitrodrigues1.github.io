"use client";

import { FaArrowRight } from "react-icons/fa6";
import Reveal from "./Reveal";

interface ResumeItemCardProps {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  highlights?: string[];
  index?: number;
  onClick?: () => void;
  clickable?: boolean;
  compact?: boolean;
}

/** Card used for experience & education entries. Renders as a button when clickable. */
export default function ResumeItemCard({
  title,
  subtitle,
  period,
  description,
  highlights,
  index = 0,
  onClick,
  clickable,
  compact,
}: ResumeItemCardProps) {
  const baseClasses =
    "group w-full rounded-2xl border border-line/60 bg-surface/50 p-6 text-left transition-all duration-200 hover:border-primary/40 hover:bg-surface/70";

  const content = compact ? (
    <div className="flex h-full flex-col justify-between gap-4">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-fg-strong sm:text-2xl">
            {title}
          </h3>
          {clickable && (
            <FaArrowRight
              aria-hidden="true"
              className="mt-1.5 shrink-0 text-sm text-fg-faint transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
            />
          )}
        </div>
        <div className="mt-1 text-sm font-bold uppercase tracking-[0.15em] text-primary">
          {subtitle}
        </div>
      </div>
      <span className="self-start rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
        {period}
      </span>
    </div>
  ) : (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-fg-strong">
              {title}
            </h3>
            {clickable && (
              <FaArrowRight
                aria-hidden="true"
                className="mt-2 shrink-0 text-sm text-fg-faint transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
              />
            )}
          </div>
          <div className="mt-1 text-sm font-bold uppercase tracking-[0.15em] text-primary">
            {subtitle}
          </div>
          {description && (
            <p className="mt-3 leading-relaxed text-fg">{description}</p>
          )}
          {highlights && (
            <ul className="mt-4 space-y-2.5">
              {highlights.slice(0, 2).map((highlight, highlightIndex) => (
                <li
                  key={highlightIndex}
                  className="flex gap-3 text-sm leading-relaxed text-fg"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                  {highlight}
                </li>
              ))}
              {clickable && highlights.length > 2 && (
                <li className="text-xs font-semibold uppercase tracking-wider text-fg-mute">
                  +{highlights.length - 2} mais
                </li>
              )}
            </ul>
          )}
        </div>
        <span className="shrink-0 self-start rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
          {period}
        </span>
      </div>
    </>
  );

  return (
    <Reveal delay={index * 0.08}>
      {clickable ? (
        <button type="button" onClick={onClick} className={baseClasses}>
          {content}
        </button>
      ) : (
        <article className={baseClasses}>{content}</article>
      )}
    </Reveal>
  );
}

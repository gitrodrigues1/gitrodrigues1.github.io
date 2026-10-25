"use client";

import { FaEnvelope } from "react-icons/fa6";
import type { IconType } from "react-icons";
import Reveal from "./Reveal";
import Section from "./Section";
import { useI18n } from "@/i18n/locale";
import { SOCIAL_LINKS, type SocialLink } from "@/lib/social";

/**
 * Brand colors for each supported social network.
 * Using a record keeps the palette in one place and makes it easy to add
 * new networks without touching the UI logic.
 */
const SOCIAL_PALETTE: Record<
  SocialLink["label"],
  { background: string; shadow: string }
> = {
  GitHub: {
    background: "bg-[#171515]",
    shadow: "hover:shadow-[0_12px_35px_-12px_rgba(23,21,21,0.6)]",
  },
  LinkedIn: {
    background: "bg-[#0A66C2]",
    shadow: "hover:shadow-[0_12px_35px_-12px_rgba(10,102,194,0.6)]",
  },
};

/**
 * Network metadata used to render the social cards.
 * Kept outside the component so it is not recreated on every render.
 */
const SOCIAL_NETWORKS: SocialLink[] = SOCIAL_LINKS;

interface SocialCardProps {
  label: string;
  href: string;
  Icon: IconType;
  handle: string;
  delay?: number;
}

/** Extracts the last path segment of a URL to use as the visible handle. */
function handleOf(href: string): string {
  return href.split("/").filter(Boolean).pop() ?? href;
}

/** Returns the Tailwind classes for a given social network, falling back to the brand gradient. */
function socialCardStyles(label: string): string {
  const palette = SOCIAL_PALETTE[label];

  if (!palette) {
    return "bg-gradient-to-r from-primary to-accent hover:shadow-[0_12px_35px_-12px_rgba(34,197,94,0.6)]";
  }

  return `${palette.background} ${palette.shadow}`;
}

/** A single social-media card with the network's brand color and a subtle hover lift. */
function SocialCard({ label, href, Icon, handle, delay = 0 }: SocialCardProps) {
  return (
    <Reveal delay={delay}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} — ${handle}`}
        className={`group flex h-full items-center gap-4 rounded-xl px-5 py-4 text-white shadow-[0_12px_35px_-12px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 ${socialCardStyles(label)}`}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-xl text-white ring-1 ring-white/30 transition-colors duration-300 group-hover:bg-white/25">
          <Icon aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block font-heading text-sm font-bold uppercase tracking-[0.2em] text-white">
            {label}
          </span>
          <span className="block truncate text-sm text-white/85">{handle}</span>
        </span>
      </a>
    </Reveal>
  );
}

export default function ContactSection() {
  const { content, fullName } = useI18n();
  const { profile } = content;

  return (
    <Section id="contact" title={content.ui.contactTitle}>
      <Reveal>
        <p className="max-w-2xl text-lg leading-relaxed text-fg-soft">
          {content.ui.contactIntro}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_-12px_rgba(34,197,94,0.6)]"
        >
          <FaEnvelope aria-hidden="true" />
          {content.ui.contactEmailLabel}
        </a>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {SOCIAL_NETWORKS.map(({ label, profileKey, Icon }, index) => {
          const href = profile.social[profileKey];
          return (
            <SocialCard
              key={label}
              label={label}
              href={href}
              Icon={Icon}
              handle={handleOf(href)}
              delay={0.15 + index * 0.08}
            />
          );
        })}
      </div>

      <Reveal delay={0.3} className="mt-16 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-fg-faint">
          © {new Date().getFullYear()} {fullName} · {content.ui.builtWith}
        </p>
      </Reveal>
    </Section>
  );
}

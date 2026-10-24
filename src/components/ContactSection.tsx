"use client";

import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import Reveal from "./Reveal";
import Section from "./Section";
import { useI18n } from "@/i18n/locale";

/** Username at the end of a profile URL, e.g. ".../marcos-ramos1". */
function handleOf(href: string): string {
  return href.split("/").filter(Boolean).pop() ?? href;
}

export default function ContactSection() {
  const { content, fullName } = useI18n();
  const { profile } = content;

  const socialLinks = [
    {
      label: "GitHub",
      href: profile.social.github,
      Icon: FaGithub,
    },
    {
      label: "LinkedIn",
      href: profile.social.linkedin,
      Icon: FaLinkedin,
    },
  ];

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
          <span className="font-body normal-case tracking-normal opacity-90">
            · {profile.email}
          </span>
        </a>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {socialLinks.map(({ label, href, Icon }, i) => (
          <Reveal key={label} delay={0.15 + i * 0.08}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} — ${handleOf(href)}`}
              className="group flex h-full items-center gap-4 rounded-xl border border-line/60 bg-surface/50 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[0_8px_30px_-14px_rgba(34,197,94,0.45)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface/70 text-xl text-fg-soft transition-colors duration-300 group-hover:border-primary/60 group-hover:text-primary">
                <Icon aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-heading text-sm font-bold uppercase tracking-[0.2em] text-fg-strong">
                  {label}
                </span>
                <span className="block truncate text-sm text-fg-soft">
                  {handleOf(href)}
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-16 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-fg-faint">
          © {new Date().getFullYear()} {fullName} · {content.ui.builtWith}
        </p>
      </Reveal>
    </Section>
  );
}

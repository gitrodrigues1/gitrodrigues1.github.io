"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { useI18n } from "@/i18n/locale";
import { socialLinksOf } from "@/lib/social";

export default function AboutSection() {
  const { content } = useI18n();
  const { profile } = content;

  const socialLinks = socialLinksOf(profile);

  return (
    <section
      id="about"
      className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center border-b border-line/50 px-6 py-20 sm:px-10 lg:px-16"
    >
      {/* Subtle tech doodle background, WhatsApp-style opacity */}
      <div
        aria-hidden="true"
        className="hero-doodles pointer-events-none absolute inset-0 -z-10 bg-[length:400px_400px] bg-repeat"
      />
      <Reveal className="lg:hidden">
        <Image
          src="/profile.jpg"
          alt={`${profile.firstName} ${profile.lastName}`}
          width={160}
          height={160}
          className="mb-8 aspect-square w-40 rounded-full object-cover shadow-lg ring-2 ring-line"
        />
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mt-6 font-heading text-5xl font-bold uppercase leading-[0.95] text-fg-strong sm:text-6xl lg:text-7xl">
          <span className="block">{profile.firstName}</span>
          <span className="block text-fg-strong">
            {profile.lastName}
          </span>
        </h1>
        <p className="mt-4 font-heading text-lg font-medium uppercase tracking-[0.2em] text-fg-soft sm:text-xl">
          {profile.role} - {profile.tagline}
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold uppercase tracking-wider text-fg sm:text-base">
          {profile.location.map((part, index) => (
            <span key={part}>
              {part}
              {index < profile.location.length - 1 && (
                <span className="ml-2 text-primary/60">·</span>
              )}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-8 max-w-3xl space-y-4 leading-relaxed text-fg">
          <p className="text-lg font-semibold text-fg-strong sm:text-xl">
            {profile.about[0]}
          </p>
          {profile.about.slice(1).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <div className="mt-10 flex gap-4">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-xl text-fg-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              <Icon />
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

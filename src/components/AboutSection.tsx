"use client";

import Image from "next/image";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import Reveal from "./Reveal";
import { profile } from "@/data/resume";

const socialLinks = [
  {
    label: "GitHub",
    href: profile.social.github,
    Icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: profile.social.linkedin,
    Icon: FaLinkedinIn,
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center border-b border-line/50 px-6 py-20 sm:px-10 lg:px-16"
    >
      <Reveal className="lg:hidden">
        <Image
          src="/profile.jpg"
          alt={`${profile.firstName} ${profile.lastName}`}
          width={160}
          height={160}
          className="mb-8 aspect-square w-40 rounded-full object-cover shadow-[0_0_40px_-5px_rgba(255,122,77,0.55)] ring-2 ring-primary/70"
        />
      </Reveal>

      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary-soft">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {profile.role}
        </span>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mt-6 font-heading text-6xl font-bold uppercase leading-[0.95] text-slate-100 sm:text-7xl lg:text-8xl">
          {profile.firstName}{" "}
          <span className="bg-gradient-to-r from-primary via-gold to-primary-soft bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,122,77,0.35)]">
            {profile.lastName}
          </span>
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold uppercase tracking-wider text-slate-400 sm:text-base">
          {profile.location.map((part) => (
            <span key={part}>
              {part}
              <span className="ml-2 text-primary/60">·</span>
            </span>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="text-primary transition-colors hover:text-primary-soft"
          >
            {profile.email}
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-8 max-w-3xl space-y-4 leading-relaxed text-slate-400">
          <p className="text-lg font-semibold text-slate-200 sm:text-xl">
            {profile.about[0]}
          </p>
          {profile.about.slice(1).map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
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
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface/70 text-xl text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-[0_0_25px_rgba(255,122,77,0.45)]"
            >
              <Icon />
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

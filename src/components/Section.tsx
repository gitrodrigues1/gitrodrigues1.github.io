"use client";

import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

/** Full-height section with an uppercase heading + glowing accent bar. */
export default function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center border-b border-line/50 px-6 py-20 last:border-b-0 sm:px-10 lg:px-16"
    >
      <Reveal>
        <h2 className="font-heading text-4xl font-bold uppercase tracking-wide text-slate-100 sm:text-5xl">
          {title}
        </h2>
        <div className="mb-10 mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
      </Reveal>
      {children}
    </section>
  );
}

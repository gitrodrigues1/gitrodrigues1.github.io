"use client";

import Reveal from "./Reveal";
import Section from "./Section";
import { interests } from "@/data/resume";

export default function InterestsSection() {
  return (
    <Section id="interests" title="Interests">
      <Reveal>
        <div className="relative max-w-3xl space-y-4 leading-relaxed text-slate-400">
          <span
            aria-hidden="true"
            className="absolute -left-6 -top-8 font-heading text-7xl text-primary/25 select-none"
          >
            “
          </span>
          {interests.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

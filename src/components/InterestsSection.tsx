"use client";

import Section from "./Section";
import Reveal from "./Reveal";
import { useI18n } from "@/i18n/locale";

export default function InterestsSection() {
  const { content } = useI18n();

  return (
    <Section id="interests" title={content.ui.interestsTitle}>
      <Reveal>
        <div className="relative max-w-3xl space-y-4 leading-relaxed text-fg">
          <span
            aria-hidden="true"
            className="absolute -left-6 -top-8 font-heading text-7xl text-primary/25 select-none"
          >
            “
          </span>
          {content.interests.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

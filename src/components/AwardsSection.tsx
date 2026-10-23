"use client";

import { FaTrophy } from "react-icons/fa6";
import Reveal from "./Reveal";
import Section from "./Section";
import { useI18n } from "@/i18n/locale";

export default function AwardsSection() {
  const { content } = useI18n();

  return (
    <Section id="awards" title={content.ui.awardsTitle}>
      <ul className="space-y-3">
        {content.awards.map((award, i) => (
          <li key={award}>
            <Reveal delay={i * 0.06}>
              <div className="flex items-center gap-4 rounded-xl border border-line/60 bg-surface/50 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_8px_30px_-14px_rgba(251,191,36,0.35)]">
                <FaTrophy className="shrink-0 text-xl text-gold" aria-hidden="true" />
                <span className="text-sm text-fg-soft sm:text-base">{award}</span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

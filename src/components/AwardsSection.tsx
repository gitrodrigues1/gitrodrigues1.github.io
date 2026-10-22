"use client";

import { FaTrophy } from "react-icons/fa6";
import Reveal from "./Reveal";
import Section from "./Section";
import { awards } from "@/data/resume";

export default function AwardsSection() {
  return (
    <Section id="awards" title="Awards & Certifications">
      <ul className="space-y-3">
        {awards.map((award, i) => (
          <li key={award}>
            <Reveal delay={i * 0.06}>
              <div className="flex items-center gap-4 rounded-xl border border-line/60 bg-surface/50 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_8px_30px_-14px_rgba(251,191,36,0.35)]">
                <FaTrophy className="shrink-0 text-xl text-gold" aria-hidden="true" />
                <span className="text-sm text-slate-300 sm:text-base">{award}</span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={0.2} className="mt-16 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-600">
          © {new Date().getFullYear()} Marcos Ramos · Built with Next.js, Tailwind CSS &amp; three.js
        </p>
      </Reveal>
    </Section>
  );
}

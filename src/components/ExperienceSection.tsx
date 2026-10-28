"use client";

import { useState } from "react";
import Section from "./Section";
import ResumeItemCard from "./ResumeItemCard";
import ExperienceModal from "./ExperienceModal";
import { useI18n } from "@/i18n/locale";
import type { ExperienceItem } from "@/data/resume";

export default function ExperienceSection() {
  const { content } = useI18n();
  const [selected, setSelected] = useState<ExperienceItem | null>(null);

  return (
    <Section id="experience" title={content.ui.experienceTitle}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.experience.map((item, index) => (
          <ResumeItemCard
            key={index}
            title={item.company}
            subtitle={item.role}
            period={item.period}
            index={index}
            compact
            clickable
            onClick={() => setSelected(item)}
          />
        ))}
      </div>

      <ExperienceModal
        experience={selected}
        onClose={() => setSelected(null)}
      />
    </Section>
  );
}

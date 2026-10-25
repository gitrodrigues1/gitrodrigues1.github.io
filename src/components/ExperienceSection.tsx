"use client";

import Section from "./Section";
import ResumeItemCard from "./ResumeItemCard";
import { useI18n } from "@/i18n/locale";

export default function ExperienceSection() {
  const { content } = useI18n();

  return (
    <Section id="experience" title={content.ui.experienceTitle}>
      <div className="space-y-6">
        {content.experience.map((item, index) => (
          <ResumeItemCard
            key={index}
            title={item.role}
            subtitle={item.company}
            period={item.period}
            description={item.description}
            highlights={item.highlights}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}

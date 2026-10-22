"use client";

import Section from "./Section";
import ResumeItemCard from "./ResumeItemCard";
import { useI18n } from "@/i18n/locale";

export default function EducationSection() {
  const { content } = useI18n();

  return (
    <Section id="education" title={content.ui.educationTitle}>
      <div className="space-y-6">
        {content.education.map((item, i) => (
          <ResumeItemCard
            key={item.school}
            title={item.school}
            subtitle={item.degree}
            period={item.period}
            description={item.note}
            index={i}
          />
        ))}
      </div>
    </Section>
  );
}

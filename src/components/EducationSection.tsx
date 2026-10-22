"use client";

import Section from "./Section";
import ResumeItemCard from "./ResumeItemCard";
import { education } from "@/data/resume";

export default function EducationSection() {
  return (
    <Section id="education" title="Education">
      <div className="space-y-6">
        {education.map((item, i) => (
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

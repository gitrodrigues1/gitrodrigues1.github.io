"use client";

import Section from "./Section";
import ResumeItemCard from "./ResumeItemCard";
import { experience } from "@/data/resume";

export default function ExperienceSection() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-6">
        {experience.map((item, i) => (
          <ResumeItemCard
            key={`${item.company}-${item.period}`}
            title={item.role}
            subtitle={item.company}
            period={item.period}
            description={item.description}
            highlights={item.highlights}
            index={i}
          />
        ))}
      </div>
    </Section>
  );
}

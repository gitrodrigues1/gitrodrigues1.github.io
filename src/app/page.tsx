import AboutSection from "@/components/AboutSection";
import AwardsSection from "@/components/AwardsSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import InterestsSection from "@/components/InterestsSection";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <main>
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <InterestsSection />
      <AwardsSection />
    </main>
  );
}

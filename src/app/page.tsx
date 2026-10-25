import AboutSection from "@/components/AboutSection";
import AwardsSection from "@/components/AwardsSection";
import ContactSection from "@/components/ContactSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import InterestsSection from "@/components/InterestsSection";
import SkillsSection from "@/components/SkillsSection";

/**
 * Single-page resume. Sections are rendered in the same order they appear
 * in the side navigation so the scroll-spy logic stays intuitive.
 */
export default function Home() {
  return (
    <main>
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <InterestsSection />
      <AwardsSection />
      <ContactSection />
    </main>
  );
}

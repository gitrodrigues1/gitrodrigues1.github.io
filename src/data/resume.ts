import en from "./resume.en";
import pt from "./resume.pt";

export type Locale = "en" | "pt";

export interface NavSection {
  id: string;
  label: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights?: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  note?: string;
  period: string;
}

export interface StackGroup {
  title: string;
  items: string[];
}

export interface Profile {
  firstName: string;
  lastName: string;
  role: string;
  tagline: string;
  location: readonly string[];
  email: string;
  phone: string;
  about: readonly string[];
  social: { linkedin: string; github: string };
}

export interface UIStrings {
  docTitle: string;
  language: string;
  navLabel: string;
  backToTop: string;
  skillsLanguages: string;
  skillsStack: string;
  skillsPractices: string;
  experienceTitle: string;
  educationTitle: string;
  skillsTitle: string;
  interestsTitle: string;
  awardsTitle: string;
  builtWith: string;
}

export interface ResumeContent {
  profile: Profile;
  nav: NavSection[];
  experience: ExperienceItem[];
  education: EducationItem[];
  stackGroups: StackGroup[];
  practices: string[];
  interests: string[];
  awards: string[];
  ui: UIStrings;
}

export const dictionaries: Record<Locale, ResumeContent> = { en, pt };

/** Full display name, shared by both locales. */
export function fullNameOf(profile: Profile): string {
  return `${profile.firstName} ${profile.lastName}`;
}

import { FaGithub, FaLinkedin } from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { Profile } from "@/data/resume";

/**
 * Supported social networks and their public profile keys on the Profile object.
 */
export type SocialNetwork = "github" | "linkedin";

export interface SocialLink {
  /** Human-readable label used for aria-labels and headings. */
  label: string;
  /** Key in Profile.social that holds the public URL. */
  profileKey: SocialNetwork;
  /** React icon component to render. */
  Icon: IconType;
}

/**
 * Ordered list of social networks shown across the site.
 * Kept in a single file so AboutSection and ContactSection stay in sync.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", profileKey: "github", Icon: FaGithub },
  { label: "LinkedIn", profileKey: "linkedin", Icon: FaLinkedin },
];

/**
 * Builds the runtime links for a profile by pairing each network with its URL.
 */
export function socialLinksOf(profile: Profile): Required<SocialLink & { href: string }>[] {
  return SOCIAL_LINKS.map((link) => ({
    ...link,
    href: profile.social[link.profileKey],
  }));
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaGraduationCap,
  FaHeart,
  FaTrophy,
  FaUser,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import ThemeSwitch from "./ThemeSwitch";
import LanguageSwitch from "./LanguageSwitch";
import { useI18n } from "@/i18n/locale";

const NAV_ICONS: Record<string, IconType> = {
  about: FaUser,
  experience: FaBriefcase,
  education: FaGraduationCap,
  skills: FaCode,
  interests: FaHeart,
  awards: FaTrophy,
  contact: FaEnvelope,
};

/**
 * Fixed vertical sidebar on desktop (like the original resume template),
 * collapsing to a sticky glass top bar on mobile.
 * Scroll-spy highlights the active section with a sliding pill.
 */
export default function SideNav() {
  const { content, fullName } = useI18n();
  const { nav, ui } = content;
  const [active, setActive] = useState<string>(nav[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    for (const { id } of nav) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [nav]);

  return (
    <aside className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-surface/80 backdrop-blur-xl lg:inset-y-0 lg:left-0 lg:right-auto lg:w-64 lg:border-b-0 lg:border-r lg:bg-surface/60">
      <div className="flex items-center gap-4 px-5 py-3 lg:h-full lg:flex-col lg:items-stretch lg:gap-0 lg:overflow-y-auto lg:px-6 lg:py-10">
        <a
          href="#about"
          className="flex items-center gap-4 lg:block lg:text-center"
          aria-label={ui.backToTop}
        >
          <span className="font-heading text-2xl font-bold uppercase tracking-wide text-fg-strong lg:hidden">
            {fullName}
          </span>
          <span className="hidden lg:block">
            <Image
              src="/profile.jpg"
              alt={fullName}
              width={128}
              height={128}
              className="mx-auto mb-10 aspect-square w-32 rounded-full object-cover shadow-[0_0_40px_-5px_rgba(34,197,94,0.55)] ring-2 ring-primary/70"
            />
          </span>
        </a>

        <nav
          aria-label={ui.navLabel}
          className="min-w-0 flex-1 overflow-x-auto lg:w-full lg:flex-none lg:overflow-visible"
        >
          <ul className="flex items-center gap-1 lg:flex-col lg:items-stretch">
            {nav.map(({ id, label }) => {
              const isActive = active === id;
              const Icon = NAV_ICONS[id];
              return (
                <li key={id} className="shrink-0">
                  <a
                    href={`#${id}`}
                    className={`relative flex items-center gap-3 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-fg hover:text-fg-strong"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-lg bg-primary/10 ring-1 ring-primary/40"
                      />
                    )}
                    {Icon && (
                      <Icon
                        aria-hidden="true"
                        className="relative w-3.5 shrink-0 opacity-90"
                      />
                    )}
                    <span className="relative">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile: toggles sit at the right end of the top bar */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <ThemeSwitch layoutId="theme-active-mobile" />
          <LanguageSwitch layoutId="lang-active-mobile" />
        </div>
      </div>
    </aside>
  );
}

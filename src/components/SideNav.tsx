"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navSections, profile } from "@/data/resume";

const fullName = `${profile.firstName} ${profile.lastName}`;

/**
 * Fixed vertical sidebar on desktop (like the original resume template),
 * collapsing to a sticky glass top bar on mobile.
 * Scroll-spy highlights the active section with a sliding pill.
 */
export default function SideNav() {
  const [active, setActive] = useState<string>(navSections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    for (const { id } of navSections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-surface/80 backdrop-blur-xl lg:inset-y-0 lg:left-0 lg:right-auto lg:w-64 lg:border-b-0 lg:border-r lg:bg-surface/60">
      <div className="flex items-center gap-4 px-5 py-3 lg:block lg:h-full lg:overflow-y-auto lg:px-6 lg:py-10">
        <a
          href="#about"
          className="flex items-center gap-4 lg:block lg:text-center"
          aria-label="Back to top"
        >
          <span className="font-heading text-2xl font-bold uppercase tracking-wide text-slate-100 lg:hidden">
            {fullName}
          </span>
          <span className="hidden lg:block">
            <Image
              src="/profile.jpg"
              alt={fullName}
              width={128}
              height={128}
              className="animate-float mx-auto mb-10 aspect-square w-32 rounded-full object-cover shadow-[0_0_40px_-5px_rgba(255,122,77,0.55)] ring-2 ring-primary/70"
            />
          </span>
        </a>

        <nav
          aria-label="Resume sections"
          className="min-w-0 flex-1 overflow-x-auto lg:overflow-visible"
        >
          <ul className="flex items-center gap-1 lg:flex-col lg:items-stretch">
            {navSections.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id} className="shrink-0">
                  <a
                    href={`#${id}`}
                    className="relative block whitespace-nowrap rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200"
                    style={{ color: isActive ? undefined : "#94a3b8" }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-lg bg-primary/10 ring-1 ring-primary/40"
                      />
                    )}
                    <span
                      className={
                        isActive
                          ? "relative text-primary"
                          : "relative hover:text-slate-100"
                      }
                    >
                      {label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

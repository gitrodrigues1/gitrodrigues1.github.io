"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { useI18n } from "@/i18n/locale";
import type { ExperienceItem } from "@/data/resume";

interface ExperienceModalProps {
  experience: ExperienceItem | null;
  onClose: () => void;
}

/**
 * Accessible modal that displays the full details of a selected experience.
 * Animated with fade in/out and scale transitions.
 */
export default function ExperienceModal({
  experience,
  onClose,
}: ExperienceModalProps) {
  const { content } = useI18n();

  useEffect(() => {
    if (!experience) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [experience, onClose]);

  return (
    <AnimatePresence>
      {experience && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="experience-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />

          {/* Modal card */}
          <motion.article
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-line bg-surface p-6 shadow-2xl sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ink/60 text-fg-soft transition-colors hover:border-primary hover:text-primary"
            >
              <FaXmark aria-hidden="true" />
            </button>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3
                  id="experience-modal-title"
                  className="font-heading text-3xl font-bold uppercase tracking-wide text-fg-strong sm:text-4xl"
                >
                  {experience.role}
                </h3>
                <div className="mt-1 text-sm font-bold uppercase tracking-[0.15em] text-primary sm:text-base">
                  {experience.company}
                </div>
              </div>
              <span className="mt-2 shrink-0 self-start rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent sm:mt-0">
                {experience.period}
              </span>
            </div>

            {experience.description && (
              <p className="mt-6 leading-relaxed text-fg">
                {experience.description}
              </p>
            )}

            {experience.highlights && experience.highlights.length > 0 && (
              <div className="mt-6">
                <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-fg-mute">
                  {content.ui.experienceHighlights}
                </h4>
                <ul className="space-y-3">
                  {experience.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm leading-relaxed text-fg-soft sm:text-base"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-primary to-accent"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

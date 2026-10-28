"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/data/resume";
import { useI18n } from "@/i18n/locale";

interface LocaleOption {
  code: Locale;
  label: string;
}

const LOCALE_OPTIONS: LocaleOption[] = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
];

interface LanguageSwitchProps {
  /** Unique framer-motion layoutId so mobile + desktop instances never collide. */
  layoutId: string;
}

/** EN ⇄ PT pill toggle with a sliding highlight. */
export default function LanguageSwitch({ layoutId }: LanguageSwitchProps) {
  const { locale, setLocale, content } = useI18n();

  return (
    <div
      role="group"
      aria-label={content.ui.language}
      className="inline-flex items-center gap-1 rounded-full border border-line/70 bg-ink/60 p-1"
    >
      {LOCALE_OPTIONS.map(({ code, label }) => {
        const isActive = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={isActive}
            className="relative rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-full bg-accent/15 ring-1 ring-accent/40"
              />
            )}
            <span
              className={
                isActive
                  ? "relative text-accent"
                  : "relative text-fg-mute transition-colors hover:text-fg-soft"
              }
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

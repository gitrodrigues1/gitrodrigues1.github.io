"use client";

import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { useI18n } from "@/i18n/locale";
import { useTheme, type Theme } from "@/i18n/theme";

interface ThemeOption {
  value: Theme;
  labelKey: "darkMode" | "lightMode";
  Icon: IconType;
}

const THEME_OPTIONS: ThemeOption[] = [
  { value: "dark", labelKey: "darkMode", Icon: FaMoon },
  { value: "light", labelKey: "lightMode", Icon: FaSun },
];

interface ThemeSwitchProps {
  /** Unique framer-motion layoutId so mobile + desktop instances never collide. */
  layoutId: string;
}

/** Moon/sun theme toggle with a sliding highlight, matching the language pill. */
export default function ThemeSwitch({ layoutId }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme();
  const { content } = useI18n();

  return (
    <div
      role="group"
      aria-label={content.ui.theme}
      className="inline-flex items-center gap-1 rounded-full border border-line/70 bg-ink/60 p-1"
    >
      {THEME_OPTIONS.map(({ value, labelKey, Icon }) => {
        const isActive = theme === value;
        const label = content.ui[labelKey];
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-pressed={isActive}
            title={label}
            className="relative rounded-full px-2.5 py-1"
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-full bg-accent/15 ring-1 ring-accent/40"
              />
            )}
            <Icon
              aria-hidden="true"
              className={
                isActive
                  ? "relative w-3.5 text-accent"
                  : "relative w-3.5 text-fg-mute transition-colors hover:text-fg-strong"
              }
            />
            <span className="sr-only">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

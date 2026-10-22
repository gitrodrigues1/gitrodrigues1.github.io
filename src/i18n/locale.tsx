"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  dictionaries,
  fullNameOf,
  type Locale,
  type ResumeContent,
} from "@/data/resume";

const STORAGE_KEY = "resume-locale";
const DEFAULT_LOCALE: Locale = "en";

interface I18nValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: ResumeContent;
  fullName: string;
}

const I18nContext = createContext<I18nValue | null>(null);

function detectLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "pt") return stored;
  } catch {
    // private mode / storage disabled — fall through to browser detection
  }
  return window.navigator.language?.toLowerCase().startsWith("pt")
    ? "pt"
    : DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Start on the server-rendered default, then adopt the user's choice on
  // mount — avoids hydration mismatches with the static export.
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocale(detectLocale());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // ignore persistence failures
    }
    document.documentElement.lang = locale === "pt" ? "pt-br" : "en";
    document.title = dictionaries[locale].ui.docTitle;
  }, [locale, ready]);

  const onChange = useCallback((next: Locale) => setLocale(next), []);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale: onChange,
      content: dictionaries[locale],
      fullName: fullNameOf(dictionaries[locale].profile),
    }),
    [locale, onChange]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <LocaleProvider>");
  return ctx;
}

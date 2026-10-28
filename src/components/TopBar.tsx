"use client";

import LanguageSwitch from "./LanguageSwitch";
import ThemeSwitch from "./ThemeSwitch";

/**
 * Glass strip fixed to the top of the content area (desktop), holding the
 * theme and language toggles. On mobile the toggles live inside the SideNav
 * top bar instead, so this bar is hidden below lg.
 */
export default function TopBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-30 hidden h-14 items-center justify-end gap-2 border-b border-line/40 bg-surface/80 px-6 backdrop-blur-lg lg:left-64 lg:flex">
      <ThemeSwitch layoutId="theme-active-top" />
      <LanguageSwitch layoutId="lang-active-top" />
    </div>
  );
}

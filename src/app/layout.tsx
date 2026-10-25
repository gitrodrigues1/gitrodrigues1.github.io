import type { Metadata, Viewport } from "next";
import { Mulish, Saira_Extra_Condensed } from "next/font/google";
import MatrixRain from "@/components/MatrixRain";
import ScrollProgress from "@/components/ScrollProgress";
import SideNav from "@/components/SideNav";
import SpotlightCursor from "@/components/SpotlightCursor";
import TopBar from "@/components/TopBar";
import { LocaleProvider } from "@/i18n/locale";
import { ThemeProvider } from "@/i18n/theme";
import "./globals.css";

const saira = Saira_Extra_Condensed({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-saira",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-mulish",
  display: "swap",
});

const THEME_DARK = "#07080f";
const THEME_LIGHT = "#f4f6fa";

/**
 * Runs before first paint so light-theme visitors never see a dark flash.
 * Must stay in sync with src/i18n/theme.tsx (key/class names).
 *
 * Kept as a single inline string to avoid an extra network request before
 * the blocking script executes.
 */
const THEME_INIT_SCRIPT = `
  try {
    const stored = localStorage.getItem("resume-theme");
    const isLight = stored
      ? stored === "light"
      : window.matchMedia("(prefers-color-scheme: light)").matches;
    if (isLight) {
      document.documentElement.classList.add("theme-light");
      document.documentElement.style.colorScheme = "light";
    }
  } catch (e) {
    // localStorage unavailable — fall back to the default dark theme.
  }
`;

export const metadata: Metadata = {
  title: "Marcos Ramos · Backend Developer",
  description:
    "Resume of Marcos Ramos — Backend Developer specialized in systems integration and REST APIs. AWS certified, based in Rio de Janeiro.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: THEME_DARK },
    { media: "(prefers-color-scheme: light)", color: THEME_LIGHT },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${saira.variable} ${mulish.variable}`}>
      <body className="bg-ink font-body text-fg antialiased">
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <ThemeProvider>
          <LocaleProvider>
            {/* Layered background: CSS gradients (far), canvas digital rain (mid), noise (near) */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(60%_50%_at_15%_20%,rgba(34,197,94,0.10),transparent_60%),radial-gradient(50%_40%_at_85%_75%,rgba(34,211,238,0.07),transparent_60%)]"
            />
            <MatrixRain />
            <div
              aria-hidden="true"
              className="noise-overlay pointer-events-none fixed inset-0 -z-[5] opacity-[0.05] mix-blend-soft-light"
            />

            <ScrollProgress />
            <SpotlightCursor />
            <SideNav />
            <TopBar />

            <div className="pt-14 lg:pt-0 lg:pl-64">{children}</div>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

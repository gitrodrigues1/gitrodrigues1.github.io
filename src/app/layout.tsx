import type { Metadata, Viewport } from "next";
import { Mulish, Saira_Extra_Condensed } from "next/font/google";
import ParticleField from "@/components/ParticleField";
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

/**
 * Runs before first paint so light-theme visitors never see a dark flash.
 * Must stay in sync with src/i18n/theme.tsx (key/class names).
 */
const THEME_INIT_SCRIPT = `try{var s=localStorage.getItem("resume-theme");var light=s?s==="light":window.matchMedia("(prefers-color-scheme: light)").matches;if(light){document.documentElement.classList.add("theme-light");document.documentElement.style.colorScheme="light"}}catch(e){}`;

export const metadata: Metadata = {
  title: "Marcos Ramos · Backend Developer",
  description:
    "Resume of Marcos Ramos — Backend Developer specialized in systems integration and REST APIs. AWS certified, based in Rio de Janeiro.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080f" },
    { media: "(prefers-color-scheme: light)", color: "#f4f6fa" },
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
            {/* Layered background: CSS gradients (far), three.js canvas (mid), noise (near) */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(60%_50%_at_15%_20%,rgba(255,122,77,0.10),transparent_60%),radial-gradient(50%_40%_at_85%_75%,rgba(34,211,238,0.07),transparent_60%)]"
            />
            <ParticleField />
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

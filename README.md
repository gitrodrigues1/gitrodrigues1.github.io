# Marcos Ramos — Resume

Modern personal resume site, rebuilt from the classic Start Bootstrap "Resume"
template into a Next.js + TypeScript + Tailwind CSS application with an
animated Matrix-style digital-rain backdrop (Canvas 2D) and an EN ⇄ PT
language toggle.

## Stack

- [Next.js](https://nextjs.org) (App Router, static export for GitHub Pages)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- Canvas 2D — Matrix rain on three cylinders, camera inside, scroll-driven
  yaw (`src/components/MatrixRain.tsx`)
- [Framer Motion](https://motion.dev) — scroll reveals, sliding nav pill,
  scroll progress bar
- Lightweight i18n — `EN ⇄ PT` toggle (`src/i18n/locale.tsx`), persisted in
  `localStorage` and auto-detected from the browser language

## Development

```bash
npm install
npm run dev     # http://localhost:3000
```

## Production build

```bash
npm run build   # static site generated into ./out
npm run serve   # preview the export locally
```

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds the static export and deploys `out/`
with the official GitHub Pages Actions. In the repository settings, set
**Settings → Pages → Source: GitHub Actions** once.

## Content

All résumé content lives in the typed dictionaries — keep both files in sync:

- [`src/data/resume.en.ts`](src/data/resume.en.ts) — English
- [`src/data/resume.pt.ts`](src/data/resume.pt.ts) — Brazilian Portuguese

Types and the shared structure are in [`src/data/resume.ts`](src/data/resume.ts).

## Credits

Originally based on the MIT-licensed [Start Bootstrap Resume template](https://startbootstrap.com/theme/resume).

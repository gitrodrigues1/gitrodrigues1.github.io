# Marcos Ramos — Resume

Modern personal resume site, rebuilt from the classic Start Bootstrap "Resume"
template into a Next.js + TypeScript + Tailwind CSS application with an
animated three.js particle backdrop.

## Stack

- [Next.js](https://nextjs.org) (App Router, static export for GitHub Pages)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [three.js](https://threejs.org) — particle field, wireframe shapes and
  UnrealBloom post-processing (`src/components/ParticleField.tsx`)
- [Framer Motion](https://motion.dev) — scroll reveals, sliding nav pill,
  scroll progress bar

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

All résumé content lives in [`src/data/resume.ts`](src/data/resume.ts) —
edit that single file to update experience, education, skills and awards.

## Credits

Originally based on the MIT-licensed [Start Bootstrap Resume template](https://startbootstrap.com/theme/resume).

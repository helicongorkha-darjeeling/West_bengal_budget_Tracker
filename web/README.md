# web — the public website

The citizen-facing part of the West Bengal Budget Tracker. Next.js 16 (App Router) · TypeScript (strict) ·
Tailwind CSS v4. It is **read-only**: it never parses PDFs and never holds write credentials.

## Run it

Requires Node.js 20.9 or newer.

```bash
npm install      # first time only
npm run dev      # → open http://localhost:3000
```

## Check it

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript, no output files
npm run build      # production build
npm run check      # all three, in order
```

To preview the production build: `npm run build` then `npm run start` (also on http://localhost:3000).

## Where things are

| Path | What it holds |
| --- | --- |
| `src/app/layout.tsx` | Page shell: header, footer, metadata, skip link |
| `src/app/page.tsx` | The dashboard, composed from section components |
| `src/app/globals.css` | Design tokens (light and dark) and base styles |
| `src/components/` | One file per dashboard section, plus shared pieces (`section`, `status`, `icons`) |
| `src/lib/domain.ts` | Vocabulary: figure kinds, accounting and verification statuses — mirrors `docs/DATA_DICTIONARY.md` |
| `src/lib/site.ts` | Project facts: mission, principles, official sources. Never financial figures |
| `src/lib/evolution.ts` | The public "then → now → next" timeline — mirrors `docs/ROADMAP.md` |

Next.js 16 differs from older versions; read the guides in `node_modules/next/dist/docs/` before changing
framework code (see `AGENTS.md`).

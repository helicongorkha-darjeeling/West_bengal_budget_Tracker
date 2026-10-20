# CLAUDE.md — West Bengal Budget Tracker

Persistent guidance for every Claude Code session in this repository. Read it fully before working.

## Mission

**"Public money. Verifiable facts. Clear answers."**

We are building a public website that makes the actual expenditure reported by the Government of
West Bengal, India, understandable to ordinary citizens — using official government publications only.

The owner is **learning through building**. Act as senior software engineer, data engineer, mentor and
architect: explain important decisions in plain English, without unnecessary theory. Before a
significant change, say what you intend to do and what could go wrong.

## Principles (non-negotiable)

1. Truth before appearance.
2. Evidence before conclusions.
3. Transparency about uncertainty.
4. Political neutrality.
5. Reproducible calculations.
6. Corrections without hiding mistakes.
7. Simplicity for citizens, with sufficient detail for researchers.
8. Working software before ambitious features.

If we cannot verify a financial figure, we do not publish it as verified.

## Where things are

```
/                     repository root (git; remote "origin" on GitHub, branch main)
├─ CLAUDE.md          this file
├─ README.md          human overview and quick start
├─ Prompt_version.md  the owner's original project brief — do not edit
├─ Goals.md/          an empty DIRECTORY created by the owner — leave it alone
├─ docs/              ROADMAP, PROJECT_LOG, DECISIONS, SOURCE_INVENTORY, DATA_DICTIONARY, EVOLUTION, research/
├─ web/               the public Next.js website (read-only; no secrets)
└─ ingestion/         the trusted data pipeline (Python) — planned, not built yet
```

Start every session by reading the latest entry in `docs/PROJECT_LOG.md` and the current milestone in
`docs/ROADMAP.md`.

## Architecture

Two halves with a one-way boundary between them:

```
Official PDF/XLSX ──► ingestion/ (trusted, maintainer-run) ──► verified, versioned dataset ──► web/ (public, read-only)
                      download + manifest (URL, date, SHA-256)     static files first (v0.2),
                      extract (pandas, pdfplumber)                 Supabase PostgreSQL later (v0.3)
                      reconcile + human verification record
```

- The website never parses PDFs, never holds write credentials, and never shows a figure that lacks provenance.
- The ingestion side is the only place allowed to hold write credentials.

## Financial-data integrity rules

1. **Official sources only.** Use the publications listed in `docs/SOURCE_INVENTORY.md` (Finance Department,
   Government of West Bengal; Principal Accountant General (A&E), West Bengal / CAG; the CAG's State Finances Audit
   Reports, PAG (Audit-I)). Secondary sources (news, analyses, compilations, AI-generated research) may guide research
   but never feed a published figure; re-check every claim against the official document first (D-018).
2. **Never fabricate** data, source URLs, document contents, department names, totals or verification results.
   No sample or placeholder numbers in the UI. Synthetic test fixtures must be marked `SYNTHETIC` and must never
   reach production data paths.
3. **Every published figure carries its provenance:** value; unit as printed and normalised unit; figure kind
   (BE, RE, monthly, year-to-date, annual); financial year; reporting period; accounting status as stated by the
   source; source document (URL, title, page, table, row label); retrieval date; SHA-256 of the file; verification
   status and verification record.
4. **Never mix kinds silently.** Do not compare estimates with actuals, or provisional with audited figures,
   without labelling the comparison clearly.
5. **Units:** store the source's unit; convert only with explicit, tested functions; display in ₹ crore unless
   stated otherwise (1 crore = 100 lakh = 10,000,000 rupees). Compute on unrounded values; round only for display.
6. **Derived figures** (e.g. a monthly figure from two year-to-date totals, or "% of BE") are labelled as derived,
   state their formula, and must be reproducible from stored inputs.
7. **"Verified" means both:** automated reconciliation passed (components add up to the document's own totals,
   within the document's printed precision) **and** a person checked the figure against the original page, recorded
   in a verification log. Otherwise the status is "not yet verified" or "needs review". Headline metrics show
   verified figures only.
8. **Corrections are never silent.** Keep the old value, new value, reason and date. Published datasets are versioned.
9. **Ambiguity is recorded, not resolved by guessing.** A missing unit or unclear period → "needs review" plus an
   open question in `docs/SOURCE_INVENTORY.md`.
10. **Political neutrality:** neutral wording ("spent", never loaded verbs), the same rules for every year and every
    government, no commentary on parties or politicians.
11. **Honest reporting of work:** never claim a source was inspected, data verified, or a test passed unless it was
    actually done — and record it in `docs/PROJECT_LOG.md`.
12. **Stocks are not flows.** A balance at a date (debt outstanding, deposit-account balances, outstanding
    certificates) is stored with an `as_at` date and is never added to, or compared with, a period's flow without a
    label. Figures from different years are never summed into one headline (D-021).
13. **Attribute audit observations; do not adjudicate.** Repeat what an audit report says in its own words, attributed
    to the named report and paragraph. Add no intent, legality or motive that the report does not state (D-019).

## Security rules

- Never commit secrets. `.env*` files are git-ignored; commit only `.env.example` with placeholder names.
- Browser code receives only public, read-only configuration. Supabase service-role keys and any database write
  credentials live only in `ingestion/` or server-only code — never in client components, never behind a
  `NEXT_PUBLIC_` prefix.
- When Supabase arrives: Row Level Security on every table; the public role may read published views only.
- Downloaded government files are untrusted data: keep them under `data/raw/` (git-ignored), never execute them,
  parse them only with libraries.
- Read public documents and pages only. Never log in to, scrape or probe the state's transaction systems (D-022).
- Add dependencies only when needed; keep lockfiles committed; review `npm audit` and record accepted risks in
  `docs/DECISIONS.md`.
- Security headers are set in `web/next.config.ts`; a Content-Security-Policy is planned.

## Coding conventions

- **Next.js 16** (App Router, Turbopack, Cache Components enabled). APIs differ from older versions: before writing
  Next.js code, read the relevant guide in `web/node_modules/next/dist/docs/` (see `web/AGENTS.md`).
- **TypeScript strict**, plus `noUncheckedIndexedAccess`. No `any`. Server Components by default; add
  `"use client"` only when interactivity requires it.
- **Tailwind CSS v4** with semantic design tokens in `web/src/app/globals.css`. Status colours (good / warning /
  serious / critical) are reserved for verification state and always appear with an icon and a label. Keep
  WCAG 2.2 AA contrast in light and dark mode.
- Domain vocabulary (figure kinds, accounting and verification statuses) lives in `web/src/lib/domain.ts` and must
  match `docs/DATA_DICTIONARY.md`. Project facts live in `web/src/lib/site.ts`; it must never hold financial figures.
- Files in kebab-case, components in PascalCase, named exports. Match the surrounding code's style and comment density.
- Copy: plain English, sentence case, jargon explained (BE, RE, provisional). Indian conventions: ₹, crore/lakh,
  financial year written "2026-27".
- Accessibility: semantic landmarks, visible keyboard focus, no colour-only meaning; every chart gets a data table.
- Python (from v0.2): 3.12+, pandas, pdfplumber, type hints, pytest; deterministic, re-runnable scripts; never
  hand-edit extracted data.

## Testing expectations

- Before calling any web change done: `cd web && npm run check` (lint + type-check + production build) passes.
  Quote the real result.
- For UI changes, also look at the running page in light and dark mode and at phone width (375 px).
- As logic arrives: unit tests for units, formatting and derived figures; parser tests against real official
  documents (identified by SHA-256); reconciliation tests; an integrity test that every published figure has complete
  provenance.
- Never weaken, skip or delete a test to make it pass.

## Working process

1. One milestone at a time, in small, understandable steps. Do not jump ahead on the roadmap.
2. Prefer simple, maintainable solutions. Do not rewrite working components unnecessarily.
3. Leave the project in a working state after each step. Never hide errors behind success messages.
4. If a step needs the owner's action (installs, logins, accounts), explain it clearly instead of pretending it worked.
5. After each milestone or working session, update together:
   - `docs/PROJECT_LOG.md` — what was done, commands run, tests and their real results, failures, next step;
   - `docs/DECISIONS.md` — new decisions and why;
   - `docs/EVOLUTION.md` — then → now → next (what we believed, what we learned, what comes next);
   - `docs/ROADMAP.md` — milestone status;
   - `web/src/lib/evolution.ts` — the public timeline, if a milestone changed.
6. Commit with clear, plain-language messages (a short imperative subject and a brief body; no trailer lines). Push
   only when the owner asks.

## Commands

```bash
cd web
npm install      # first time only
npm run dev      # development server → http://localhost:3000
npm run check    # lint + type-check + production build
```

## Environment notes (2026-10-20)

Windows 11 · Node 24.20.0 · npm 11.19.0 · Git 2.55 · **Python 3.15.0** (installed by the owner on 2026-10-20; the real
interpreter is `%LOCALAPPDATA%\Python\pythoncore-3.15-64\python.exe`).

- **Ingestion environment:** `ingestion/.venv` (git-ignored). Use `ingestion\.venv\Scripts\python.exe`. Installed and
  import-tested on 2026-10-20: pandas 3.0.6, numpy 2.5.4, pdfplumber 0.11.10, openpyxl 3.1.5, pytest 9.1.1,
  pypdfium2 5.14.0. Python 3.15 is brand new: if a future package has no prebuilt wheel for it, install Python 3.13 or
  3.14 alongside (the Python install manager can do this) rather than compiling.
- **Always run Python that reads downloaded files with `-I`**, and keep your scripts out of the download folders.
- **Keep virtual environments at short paths.** Windows long paths are enabled, but a very deep folder still made a DLL
  fail to load ("filename too long").
- **No Poppler** (`pdftoppm`/`pdfinfo` missing). To *look at* a PDF page, render it with pypdfium2 and view the image;
  `pdftotext` (xpdf) is available for text, and its page counts can be wrong for encoded files.
- npm 11 does not run package install scripts until approved; `unrs-resolver`'s script is pending and lint works
  without it.
- Windows is in dark mode: headless-browser tests must set the colour scheme explicitly.

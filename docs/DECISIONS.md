# Decisions

A short record of the important choices, why we made them, and what they cost. Newest last. When a decision is
reversed, we add a new entry that says so — we do not delete the old one.

Format: **Decision** · **Why** · **Trade-off / revisit when**.

---

## D-001 · 2026-10-20 · Two folders: `web/` and `ingestion/`

- **Decision:** The public website lives in `web/`; the future data pipeline lives in `ingestion/`.
- **Why:** The brief requires keeping the public website separate from the trusted ingestion process. Separate folders
  make the boundary visible: only `ingestion/` may ever hold write credentials. It also avoided `create-next-app`
  conflicting with the files already in the root (`Prompt_version.md`, `Goals.md/`).
- **Trade-off:** Vercel must be told the project's root directory is `web/` when we deploy (one setting).

## D-002 · 2026-10-20 · Next.js 16.4.2 with the official starter's defaults

- **Decision:** Scaffolded with `create-next-app@16.4.2` (TypeScript, Tailwind CSS v4, ESLint, App Router, `src/`
  folder). Kept its defaults: Turbopack, Cache Components and Partial Prefetching.
- **Why:** The brief's preferred stack. The defaults are what the framework is moving to (its documentation says both
  options become the default in the next major release), so we avoid a migration later.
- **Trade-off:** Cache Components changes how data fetching is cached; we must learn it before adding Supabase (v0.3).

## D-003 · 2026-10-20 · No Recharts, Supabase or test framework yet

- **Decision:** Not installed in v0.1.
- **Why:** "Install only necessary dependencies." There is no data to chart, store or calculate yet; the placeholders
  are plain HTML/CSS.
- **Revisit:** test framework (Vitest) in v0.2 when units/formatting logic arrives; Recharts and Supabase in v0.3.

## D-004 · 2026-10-20 · System fonts instead of a downloaded web font

- **Decision:** Use the operating system's UI font (`system-ui` stack).
- **Why:** Fastest option on low-end phones and slow connections; no layout shift; the OS fonts already cover the
  rupee sign (₹) and Bengali script, which a Latin web font might not — important for the planned Bengali version.
- **Trade-off:** Text looks slightly different on Windows, Android and iPhone. Credibility comes from layout and
  restraint, not a custom typeface.

## D-005 · 2026-10-20 · Two separate status labels on every figure

- **Decision:** Every figure carries an **accounting status** (Estimate / Provisional / Audited — as stated by the
  government document) and, separately, a **verification status** (Verified / Not yet verified / Needs review /
  Corrected — our own check).
- **Why:** "How final is this number?" and "Have we checked it?" are different questions. Mixing them would hide
  uncertainty — for example, a provisional figure can be perfectly verified against its source and still change later.
- **Trade-off:** Two badges are slightly more to read; the methodology section explains them.

## D-006 · 2026-10-20 · Store source units, display ₹ crore

- **Decision:** Keep every value in the unit the document prints, plus a normalised value in rupees; display in
  ₹ crore by default.
- **Why:** Official documents use different units (thousands, lakh, crore). Keeping the original makes every number
  traceable to the page; one display unit makes comparisons readable.
- **Trade-off:** Conversions need tested functions (planned for v0.2).

## D-007 · 2026-10-20 · Static verified files before a database

- **Decision:** v0.2 publishes one verified report from a committed, versioned data file. Supabase arrives in v0.3,
  when we have many months to store.
- **Why:** "Working software before ambitious features." Fewer moving parts while we learn the extraction and
  verification process; every number can be reviewed in a git diff.
- **Revisit:** at v0.3.

## D-008 · 2026-10-20 · Basic security headers now; Content-Security-Policy later

- **Decision:** `web/next.config.ts` sends `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and
  `Permissions-Policy`, and hides `X-Powered-By`.
- **Why:** Cheap, low-risk hardening for a public site.
- **Revisit:** a strict CSP needs nonces with Next.js inline scripts — planned before v1.0.

## D-009 · 2026-10-20 · Accept a dev-only `npm audit` finding for now

- **Decision:** Do not run `npm audit fix --force`.
- **Why:** The 5 "high" findings are one chain inside the lint tooling (`braces` → `micromatch` → `fast-glob` →
  `@next/eslint-plugin-next` → `eslint-config-next`): a denial-of-service risk when processing hostile glob
  patterns. It runs only on the developer's machine, on our own config — never in the website. The suggested "fix"
  would downgrade to the Next.js 14 lint config, which is a breaking change.
- **Revisit:** when `eslint-config-next` ships a patched dependency; check `npm audit` each milestone.

## D-010 · 2026-10-20 · Stricter TypeScript

- **Decision:** `strict` plus `noUncheckedIndexedAccess`.
- **Why:** With financial tables, "the row might not exist" must be handled explicitly; this setting makes the compiler
  insist on it.

## D-011 · 2026-10-20 · Light and dark mode from the visitor's system setting

- **Decision:** Colours are semantic tokens with light and dark values; every text/background pair meets WCAG 2.2 AA
  (computed, then confirmed with an axe-core scan). No manual theme switch yet.
- **Why:** Readability for everyone with no extra code.

## D-012 · 2026-10-20 · Git repository with GitHub remote

- **Decision:** Git initialised at the repository root on branch `main`; remote `origin` is
  `https://github.com/helicongorkha-darjeeling/West_bengal_budget_Tracker.git` (created by the owner).
- **Why:** Version history is the ground truth for the project's evolution, and the owner asked to push to GitHub.

## D-013 · 2026-10-20 · "Not an official website" disclaimer

- **Decision:** The footer states the site is not an official website of the Government of West Bengal or the CAG.
- **Why:** Citizens must not mistake a civic project for a government service.
- **Open:** the owner should confirm the project's organisational identity (individual, company or non-profit) so we
  can describe it accurately.

## Open decisions (need the owner)

- **Licence** for the code and for the derived data. Until chosen, others may not legally reuse the code.
- **Python installation** (needed for v0.2): recommended Python 3.13, 64-bit, from python.org (tick "Add to PATH").
- **Organisational identity** for the About text (see D-013).
- **Domain name** and hosting account for launch (v1.0).

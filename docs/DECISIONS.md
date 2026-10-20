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

## D-014 · 2026-10-20 · Python 3.15.0 accepted; project environment at `ingestion/.venv`

- **Decision:** Use the Python 3.15.0 the owner installed, with a virtual environment inside `ingestion/` (git-ignored),
  instead of the 3.13 first recommended.
- **Why:** The concern was that a brand-new Python might lack prebuilt packages. We tested rather than assumed: pandas,
  numpy, pdfplumber, openpyxl, pytest and pypdfium2 all installed as prebuilt wheels and import correctly. The one
  failure ("DLL load failed … filename too long") came from a throwaway test folder buried in a very deep path, not from
  Python 3.15.
- **Trade-off / revisit when:** a later package has no 3.15 wheel — then install 3.13 or 3.14 alongside. Pin exact
  versions when the first script is written.

## D-015 · 2026-10-20 · Every stored total carries its list of components

- **Decision:** A stored total must record which components it adds up and which publication's definition it follows.
- **Why:** Official publications use the same label for different totals: the monthly reports' "Total Expenditure"
  excludes loans and advances, while the annual Accounts at a Glance includes them. Comparing them silently would be
  wrong.
- **Trade-off:** a slightly richer data model, in exchange for never mixing definitions by accident.

## D-016 · 2026-10-20 · "Audited" is never shown bare

- **Decision:** Wherever an audited figure appears, link the CAG certificate and say it carries observations; record
  which statement the figure came from.
- **Why:** The 2020-21 certificate has numbered observations, and names statements prepared from information supplied by
  the State Government. "Audited" does not mean "free of caveats".

## D-017 · 2026-10-20 · Verify by looking, not only by extracting text

- **Decision:** For every document we rely on, render the key pages (title, unit, status wording, table headers) to
  images and read them, and record the page numbers.
- **Why:** Text extraction misled us: some PDFs store characters shifted ("7DEOH" for "Table"), drop the rupee sign, and
  `pdftotext` miscounts their pages. The monthly-report inspection could not catch such things; looking at the page can.
- **Trade-off:** slower, so we limit it to the pages that determine meaning (not every table row — those are reconciled by
  arithmetic instead).

## D-018 · 2026-10-21 · Unofficial research is a source of leads, never of figures

- **Decision:** A compilation, analysis or summary from anyone other than the official publisher — AI-generated research,
  independent budget analyses, news — may tell us where to look. Every claim is re-checked against the official document
  before it is written into our docs, and no figure from such a source is published. The check and its outcome are recorded.
- **Why:** The first compilation we reviewed (note of 2026-10-21) had mostly accurate numbers — 46 of 58 checked figures
  matched the chapters it cited — but also a one-scheme figure shown as a total, stocks added to flows, a stronger claim
  than its source made, out-of-date years and links to the wrong host. Its most useful content, the pointer to the CAG's
  State Finances Audit Reports, could only be used after verification.
- **Trade-off:** slower than copying; in return every fact in our docs traces to an official page.

## D-019 · 2026-10-21 · Quote and attribute audit observations; never strengthen them

- **Decision:** When the site or the docs repeat what an audit report says, we attribute it to the named report and
  paragraph, use its own words or a close neutral paraphrase, and state the period. We add no intent, legality or motive
  that the report does not state, and we do not turn an outstanding balance into a claim about what happened to the money.
  Where the report itself uses strong language, we may quote it, attributed.
- **Why:** Political neutrality (principle 4) and accuracy. In the review, "not furnished to Audit … though called for"
  became "refused", "irregular adjustments" became "fraudulent", and a balance "pending reconciliation" became "zero proof
  of end-use".
- **Applies to:** any future audit-notes feature (`DATA_DICTIONARY.md` §11).

## D-020 · 2026-10-21 · Not adopted: a "Department of Government Efficiency"-style site

- **Decision:** We do not build live debt or deficit "clocks", per-resident or per-household "burden" figures, a "wall of
  receipts", lists of reform or "kill-switch" proposals, or anything styled as a government department.
- **Why:** The project reports what official documents state; it does not prescribe policy (principle 4). Clocks and
  burden figures need projections and population denominators from sources not yet inspected. A name or web address in the
  style of a government body could be mistaken for an official site (see D-013).
- **Revisit:** a per-person view and ratios to GSDP can return as clearly labelled derived measures once an official
  population source and an official GSDP source have been inspected (roadmap backlog).

## D-021 · 2026-10-21 · Stocks and flows are different kinds of figure

- **Decision:** Every figure is a flow (an amount over a period) or a stock (a balance at a date). Stocks carry an `as_at`
  date. We never add a stock to a flow, never add figures from different years into one headline, and never compare a stock
  with a year's flow without labelling the comparison.
- **Why:** The reviewed file compared a multi-year balance of outstanding certificates with one year's spending, and its
  "annual flow" tile added one year's balance to other years' flows.
- **Trade-off:** one more field in the data model (`measure_type`), added to the website vocabulary when the first stock is
  stored.

## D-022 · 2026-10-21 · Public documents only; nothing behind a login

- **Decision:** The project reads only publicly published documents and pages. It does not log in to, scrape or probe the
  state's transaction systems (the integrated financial management and e-procurement portals, for example), even if
  credentials were offered. Where such systems hold data of public interest, the route is a formal request to the
  department, recorded in `SOURCE_INVENTORY.md`.
- **Why:** Data obtained behind a login cannot be re-checked by readers, and automated access to government systems carries
  legal and security risk.

## D-023 · 2026-10-21 · The CAG State Finances Audit Reports are the interim source of audited-basis annual figures

- **Decision:** For years after 2020-21 — the latest Finance Accounts listed by the Accountant General (A&E) — audited-basis
  annual figures come from the appendices of the CAG's State Finances Audit Reports, shown as "as reported in the CAG's State
  Finances Audit Report" with report, appendix and page. If the Finance Accounts for later years appear, they take priority
  and the audit report becomes the cross-check.
- **Why:** The reports are the CAG's own publication, tabled in the Legislature; they name the Finance Accounts and
  Appropriation Accounts as their core data; and for 2024-25 four main rows agree within one crore with the budget's and
  the monthly report's figures.
- **Trade-off / revisit when:** the report is one step away from the accounts and its structure changes every year, so each
  needs its own mapping. Revisit when Finance Accounts for 2021-22 onwards are found.

## Open decisions (need the owner)

- **Licence for derived data and for how we credit the official sources.** (The code licence is decided: MIT — the
  `LICENSE` file was created by the owner on GitHub on 2026-10-20, with the copyright holder shown as the GitHub
  username `helicongorkha-darjeeling`. If you would rather show a real name or organisation there, change it in
  that one file.)
- ~~Python installation~~ — done by the owner on 2026-10-20; see D-014.
- **Organisational identity** for the About text (see D-013).
- **Requests to the Accountant General (A&E):** whether to ask formally for the Finance Accounts and Appropriation
  Accounts for 2021-22 onwards, which the audit reports use but the A&E page does not list (see D-022).
- **Domain name** and hosting account for launch (v1.0).

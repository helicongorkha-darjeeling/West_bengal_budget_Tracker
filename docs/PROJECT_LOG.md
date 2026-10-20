# Project log

What was actually done, the commands run, the tests performed and their **real** results, failures, and the next step.
Newest entry first. Never record a check that was not actually run.

---

## 2026-10-20 (evening, IST) — Session 2: status check, Python, and the rest of the source inspection

**Milestone:** v0.1 Foundation · **Status at end of entry:** nearly complete. Open: a second observer's check of the
budget-document findings, the Appropriation Accounts, the remaining budget volumes (BP-10, BP-12 to BP-31) and the
interim set. The planned four-lens review of the foundation has **not been run**.

### 1. State on return

- Session 1 ended while two background research jobs were running; both were stopped without final results. In this
  session the background-job tool is switched off, so the research continued **directly, as a single observer**. One
  finished first-pass result (Finance Accounts and Accounts at a Glance) was recovered from the interrupted job's log.
- **Git:** local `main` at `28aa85a`, remote `main` at `0d352a7` — a "Create LICENSE" commit the owner made on GitHub
  (an MIT licence, 21 lines, copyright holder shown as the GitHub username). `git fetch` then
  `git merge --ff-only origin/main`: fast-forward, nothing lost.
- **Python:** `python --version` → 3.15.0; `py -0p` → 3.15-64 at `%LOCALAPPDATA%\Python\pythoncore-3.15-64\python.exe`.
  The `python` command resolves through the Windows apps alias and works.

### 2. Python checks

| Test | Result |
| --- | --- |
| Throwaway venv in a very deep folder, `pip install --only-binary=:all: pandas pdfplumber openpyxl pytest` | **Installed**: every package came as a prebuilt cp315 wheel (numpy 2.5.4, pandas 3.0.6, pillow 13.0.0, cryptography 50.0.2, …) |
| Import test in that venv | **Failed**: `ImportError: DLL load failed while importing cd: The filename or extension is too long` — the folder path was about 250 characters (Windows `LongPathsEnabled` was 1, yet it still failed) |
| Project venv `ingestion/.venv` (site-packages prefix 114 characters), same packages | Installed (from pip's cache); `python -I -c "import pandas, pdfplumber, openpyxl, pytest, numpy, pypdfium2"` → **import OK**: pandas 3.0.6, pdfplumber 0.11.10, openpyxl 3.1.5, pytest 9.1.1, numpy 2.5.4, pypdfium2 5.14.0 |

`ingestion/.venv` is git-ignored. Creating it is v0.2 preparation, done early as **verification tooling** (page
rendering); the v0.2 milestone itself has not started.

### 3. The site

`next dev` started on port 3000 (HTTP 200, ready in 3.5 s) and opened in the owner's browser.

### 4. Research done this session

- **Finance Accounts / Accounts at a Glance, 2020-21:** re-downloaded all three files — sizes and SHA-256 identical to the
  first pass's; page counts 108 / 722 / 64 confirmed with a PDF library; archive listing counts per tab confirmed
  (19 / 12 / 13 / 0); the glyph-shifted text layer and the 541-page miscount reproduced; **seven pages rendered and read**
  (tabling date, certificate, signature page, the guide, Statement 2, a Volume II table, the highlights table).
  Written up in `docs/research/2026-10-20-finance-accounts-and-accounts-at-a-glance.md`.
- **Finance Department:** `HEAD` on all 29 files (all HTTP 200; 25 are 0.6–3.5 MB; total about 204 MB); downloaded 8
  (BP-1, 3, 4, 5, 6, 7, 9, 11 — about 12 MB; the server managed roughly 10–100 kB/s); SHA-256 and page counts; **every page
  text-scanned** for units and column headings; covers and sample data pages read as images; a reproducible cross-check of
  the budget documents' 2024-25 actuals against the monthly "March(Sy) 2025" report. Written up in
  `docs/research/2026-10-20-finance-department-budget-publications.md`.
- **Tools** used are committed in `docs/research/tools/` (render pages, overview, unit scan, grep, cross-check).

### 5. Changes made

- `README.md` (licence), `CLAUDE.md` (Python environment notes), `ingestion/README.md`, `docs/ROADMAP.md` (v0.1 ticks, v0.2
  cross-source check, v0.4 rewritten for the 2020-21 limit), `docs/DECISIONS.md` (D-014 to D-017), `docs/DATA_DICTIONARY.md`
  (units, net/gross, three definitions of total expenditure, number formats, new status "not stated", budget-document
  notes), `docs/SOURCE_INVENTORY.md`, `docs/EVOLUTION.md`.
- Website: new accounting status **"Not stated"** (`web/src/lib/domain.ts`, `web/src/components/status.tsx`); public
  "then and now" learnings; both source cards now marked as inspected; no figures added.

### 6. Tests and their actual results

| Test | Result |
| --- | --- |
| `npm run check` (lint + type-check + production build), run after each batch of code edits | **exit 0** every time (last run after the final copy change) |
| axe-core scan of the production build, 1280 px and 375 px, light and dark | **0 violations** in all four; no horizontal overflow (run before the final one-line copy change to the source cards) |
| Zero-figure scan of the served page: every number in the visible text | only version numbers, step numbers, dates and "SHA-256"; **0 monetary-looking patterns**. A first run flagged "1,000 times" in new copy (a ratio, not money); the copy was reworded so the check stays strict |
| Budget-versus-monthly cross-check (`compare_bp9_mki.py`) | revenue receipts, revenue expenditure, capital expenditure (within rounding) and loans and advances **match**; the "total expenditure" gap equals loans and advances plus repayment of loans (difference 0.00 crore) |

Not tested: a second observer's re-check of the budget-document findings; BP-3's number-format reading beyond one page.

### 7. Failures, problems and corrections

- **The comparison script** first reported capital expenditure as "1475 % different": it had picked up a later sector
  table on the same page. Fixed the parser, then added a rounding tolerance of 0.005 per summed component — the "within the
  document's printed precision" rule from our own integrity rules.
- The unit scanner glued one column's "Actuals" to the next column's year and produced a **false** "Actual 2025-2026" in
  BP-9. It was recognised from the page text and discarded; it is not in any note.
- A one-line script used the wrong argument positions with `node -e` (read a directory). Fixed.
- A scratch file written to `/tmp` ended up elsewhere (Node on Windows resolves that path differently). Redone in the
  session scratchpad.
- The package-install test showed the "filename too long" failure described above; the project environment sits at a short
  path.
- The Finance Department server is very slow, which limited how many files were downloaded.
- **Process note:** the second commit of session 1 (`28aa85a`) was pushed on the strength of the owner's earlier request to
  push; `CLAUDE.md` says to push only when asked. From now on pushes happen only when the owner asks.

### Next step

Decide with the owner: (a) finish v0.1 by inspecting the Appropriation Accounts and the remaining budget volumes and
having the findings re-checked by a second observer, or (b) accept the current evidence and start **v0.2 — first
verified report**, whose first task is a repeatable download-and-hash script and extraction of one monthly report.

---

## 2026-10-20 — Session 1: v0.1 Foundation

**Milestone:** v0.1 Foundation · **Status at end of entry:** in progress — website, docs and listing-page source
inspection complete; document-level source inspection still running (see "Open at time of writing").

### 1. Workspace inspection

The folder held `Prompt_version.md` (6,289 bytes — the brief) and `Goals.md`, which is an **empty directory**, not a
file. It was not a Git repository. Both items were left untouched. Conclusion: a new project.

| Check | Command | Result |
| --- | --- | --- |
| Node.js | `node --version` | v24.20.0 |
| npm | `npm --version` | 11.19.0 |
| Git | `git --version` | 2.55.0.windows.5 |
| Python | `python --version`, `python3 --version`, `py --version` | **Not installed** (only the Windows Store alias) |
| Other package managers | `pnpm`, `yarn`, `bun`, `uv`, `conda` | Not installed |
| winget | `winget --version` | v1.29.380 |
| Git identity | `git config --global user.name` / `user.email` | **Not set** |
| Latest packages | `npm view <pkg> version` | next 16.4.2, create-next-app 16.4.2, tailwindcss 4.3.3, recharts 3.10.1, typescript 7.0.2 |
| PDF/zip tools | `command -v …` | `pdftotext` (xpdf 4.06), `unzip`, `sha256sum` available; no `pdfinfo` |
| Browsers | file check | Microsoft Edge and Google Chrome installed |

### 2. Official sources — listing pages

| Command | Result |
| --- | --- |
| `curl -L https://finance.wb.gov.in/Fin_New/Pages/Budget_Publication.aspx` | HTTP 200, 255,301 bytes, 12.7 s |
| `curl -L https://cag.gov.in/ae/west-bengal/en/state-accounts-report` | HTTP 200, 100,102 bytes, 11.2 s |

Both pages were saved (outside the repository) and their links extracted with a small Node script. Findings are in
`docs/SOURCE_INVENTORY.md`.

A **document-level inspection** was started (five first-pass inspections, each to be followed by an independent re-check
that re-downloads and verifies every claim, then a completeness review). It was still running when this
entry was written; its results will be recorded in `docs/research/` and in the inventory.

### 3. Website scaffold

```bash
npx create-next-app@16.4.2 web --ts --tailwind --eslint --app --src-dir --import-alias "@/*" \
  --use-npm --disable-git --no-agent-feedback --empty --yes
```

Result: success, 357 packages. Warnings, recorded honestly:

- npm reported **5 high-severity vulnerabilities** — one chain inside the lint tooling (`braces` → … →
  `eslint-config-next`). Dev-only; accepted for now, see `DECISIONS.md` D-009.
- `eslint@9.39.5` printed a deprecation notice (the version `eslint-config-next` 16.4.2 requires).
- npm 11 did not run the install script of `unrs-resolver` (not yet approved). Lint works without it.

Baseline on the untouched scaffold: `npm run lint` passed, `npx tsc --noEmit` passed, `npm run build` passed.

### 4. What was built

- **Dashboard** (`web/src/app/page.tsx` + `web/src/components/`): header with "Foundation" phase banner, mission and
  empty-state notice, project-status panel, reporting-period panel with figure-kind explainer, four empty headline
  measures, empty spending-chart frame (grid and month axis only), department explorer placeholder (disabled search,
  empty table), methodology and source transparency, evolution timeline, footer disclaimer.
- **Vocabulary and facts:** `web/src/lib/domain.ts` (figure kinds, accounting and verification statuses),
  `web/src/lib/site.ts` (mission, principles, official sources), `web/src/lib/evolution.ts` (timeline).
- **Configuration:** security headers and `poweredByHeader: false` (`web/next.config.ts`); `noUncheckedIndexedAccess`
  (`web/tsconfig.json`); scripts `typecheck` and `check` (`web/package.json`); colour tokens for light and dark mode
  (`web/src/app/globals.css`).
- **Repository:** `git init -b main`, root `.gitignore`, remote `origin` →
  `https://github.com/helicongorkha-darjeeling/West_bengal_budget_Tracker.git` (`git ls-remote` showed an empty
  repository).
- **Docs:** `CLAUDE.md`, `README.md`, `docs/ROADMAP.md`, `docs/DECISIONS.md`, `docs/SOURCE_INVENTORY.md`,
  `docs/DATA_DICTIONARY.md`, `docs/EVOLUTION.md`, this log, `web/README.md`, `ingestion/README.md`.

No financial figures, departments or statistics were added anywhere.

### 5. Tests and their actual results

| Test | Result |
| --- | --- |
| `npm run lint` | exit 0, no findings |
| `npm run typecheck` (`tsc --noEmit`) | exit 0 |
| `npm run build` | exit 0; routes `/`, `/_not-found`, `/icon.svg` prerendered as static |
| `npm run check` (all three) | exit 0 |
| Colour contrast of every token pair (computed, WCAG 2.x formula) | all pairs pass AA in light and dark mode |
| Production server response headers (`curl -D -`) | `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` present; no `X-Powered-By` |
| Headless Edge via DevTools protocol, 1280 px and 375 px, light and dark | no horizontal overflow at 375 px; screenshots reviewed by eye |
| axe-core 4.11.0 accessibility scan, same four set-ups | first run: 1 moderate issue (`landmark-complementary-is-top-level`); after the fix: **0 violations** in all four |

Not tested yet: real phones, screen readers (NVDA, VoiceOver), a full keyboard-only walkthrough, browsers other than
Edge.

### 6. Failures and problems encountered

- **Python is not installed** → the ingestion pipeline cannot start. Owner action needed before v0.2.
- **No Git identity configured** → commits need a name and email (set for this repository only, at the owner's
  request to push).
- The first "light mode" screenshots rendered dark because the headless browser follows Windows' dark theme → fixed by
  forcing the colour scheme in tests.
- Screenshots taken by opening in-page links (`#section`) captured blank frames during smooth scrolling → replaced
  with full-page capture through the DevTools protocol.
- Stopping the background server task left its Node process running on port 3100 → found by port, confirmed its
  command line, stopped it.
- axe-core flagged a `<aside>` nested inside another landmark → changed to a plain `<div>`.
- Visual review found the reporting-period card stretching to its neighbour's height and the empty-value dashes too
  heavy → fixed.

### 7. First push to GitHub

At the owner's request: repository-local identity set (`git config user.name "helicongorkha-darjeeling"`,
`git config user.email` = the owner's account email; global settings untouched), `.gitattributes` added (LF line
endings), staged content scanned for secret patterns (none found; only documentation mentioning the words), then:

```bash
git commit   # 3129779 "Foundation (v0.1): project rules, docs, source inventory and empty dashboard" — 39 files
git push -u origin main
```

Result: `* [new branch] main -> main`; `git ls-remote origin` shows `refs/heads/main` at `3129779`. Git Credential
Manager already had credentials — no sign-in was needed.

### 8. Monthly Key Indicators — document-level results

The first-pass inspection of the Monthly Key Indicators finished: 6 PDFs, 1 Google Sheet and 3 listing views examined.
Because the research job runs only two tasks at a time, its own re-check for this area was still queued, so the key
claims were **re-checked independently** with fresh downloads:

| Re-check | Result |
| --- | --- |
| June 2026 PDF: HTTP status, size, SHA-256, page count | 200 · 111,591 bytes · `607a2c8d…37bb1` · 18 pages — all match |
| Title, status line, unit, column headers (page 1) | match: "(UNAUDITED PROVISIONAL FIGURES)", "(₹ in crore)", "Budget Estimates 2026-27", "Actuals upto JUNE 2026" |
| Row definitions | "Total Expenditure (4+ 5)" = revenue + capital; "Loans and Advances Disbursed" separate — match |
| March(P)/March(Sy) 2025 titles, hashes, pages | match (18 and 17 pages) |
| March(Sy) total = "March(Final)" trend row; March(P) total = "March(Pre)" | both match; control (Sy vs "March(Pre)") does not match, as expected |
| June 2026 Google Sheet | downloads without login: HTTP 200 after one redirect, real `.xlsx`, 18 sheets, same title/status/unit |
| Archive view | 2008-09 to 2020-21; 2008-09 and 2009-10 are `.swf` files |

Written up in `docs/research/2026-10-20-monthly-key-indicators.md`; inventory, data dictionary, evolution record and
the website's source card, "Total expenditure" definition and "then and now" learnings updated accordingly. No
financial figures were copied into the repository.

### Open at time of writing

- Document-level inspection of the Finance Accounts, Appropriation Accounts, Accounts at a Glance and the Finance
  Department's budget documents (research job still running).

### Next step

Record the document-level inspection results, then start **v0.2 — First verified report** (see `ROADMAP.md`), which
first needs Python installed.

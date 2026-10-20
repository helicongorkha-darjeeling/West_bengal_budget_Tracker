# Project log

What was actually done, the commands run, the tests performed and their **real** results, failures, and the next step.
Newest entry first. Never record a check that was not actually run.

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

A multi-agent **document-level inspection** was started (five inspectors, each followed by an independent adversarial
verifier that re-downloads and re-checks every claim, then a completeness critic). It was still running when this
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

### Open at time of writing

- Document-level source inspection (units, table structure, printed accounting status, March(Pre)/March(Sup)
  meaning, Google Sheets accessibility, BP-number titles).

### Next step

Record the document-level inspection results, then start **v0.2 — First verified report** (see `ROADMAP.md`), which
first needs Python installed.

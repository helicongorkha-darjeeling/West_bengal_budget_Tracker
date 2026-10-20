# Roadmap

Each milestone has **measurable exit criteria**. A milestone is done only when every criterion is met and the
evidence is recorded in `docs/PROJECT_LOG.md`. We do not start a milestone before the previous one is done.

The public timeline on the website (`web/src/lib/evolution.ts`) mirrors this file.

| Version | Milestone | Status |
| --- | --- | --- |
| v0.1 | Foundation | **In progress → see exit criteria** |
| v0.2 | First verified report | Next |
| v0.3 | Monthly history in a database | Planned |
| v0.4 | Audited annual accounts | Planned |
| v0.5 | Department explorer | Planned |
| v1.0 | Public launch | Planned |

---

## v0.1 — Foundation

Goal: a working, honest skeleton and a clear understanding of the official sources. No figures.

Exit criteria:

- [ ] `CLAUDE.md`, `README.md` and the docs set exist: `ROADMAP`, `PROJECT_LOG`, `DECISIONS`, `SOURCE_INVENTORY`,
      `DATA_DICTIONARY`, `EVOLUTION`.
- [ ] Both official sources have been inspected, with evidence (URLs, retrieval dates, SHA-256 of inspected files),
      and `SOURCE_INVENTORY.md` separates inspected/verified facts from open questions.
- [ ] The website runs locally and shows: mission, empty metrics, reporting-period section, chart placeholder,
      department explorer placeholder, methodology and source transparency, and an informative empty state.
- [ ] Zero fabricated figures, departments or statistics anywhere in the UI.
- [ ] `npm run lint`, `npm run typecheck` and `npm run build` pass (0 errors).
- [ ] Automated accessibility scan (axe-core) reports no serious or critical issues in light and dark mode; no
      horizontal scrolling at 375 px width.
- [ ] Project log records the commands run, tests performed, failures and the next step.

## v0.2 — First verified report

Goal: one official monthly report, extracted reproducibly, verified and shown with full provenance.

Exit criteria:

- [ ] Python installed; `ingestion/` has pinned dependencies (pandas, pdfplumber) and a README.
- [ ] A script downloads one Monthly Key Indicators report and writes a manifest entry (URL, retrieval time,
      byte size, SHA-256).
- [ ] The extraction script reproduces **100 % of the rows** of the report's main table into a CSV, with the unit and
      page recorded, and running it twice gives byte-identical output.
- [ ] Reconciliation checks pass: every printed total equals the sum of its printed components within the
      document's precision. Any failure is reported, not hidden.
- [ ] A human verification record exists for every figure shown (who, when, page checked).
- [ ] The dashboard shows the four headline measures for that report from a committed, versioned data file, each with
      source link, page, unit, period, accounting status and verification status.
- [ ] Unit tests cover unit conversion, Indian number formatting and derived percentages.
- [ ] An integrity test fails the build if any displayed figure lacks complete provenance.

## v0.3 — Monthly history in a database

Goal: follow spending month by month across the current and previous financial year.

Exit criteria:

- [ ] Supabase project created by the owner; schema migration committed; Row Level Security enabled on every table;
      the public role can only read published views.
- [ ] All available monthly reports for the current and previous financial year are imported, reconciled and
      verified, or explicitly listed as "needs review" with reasons.
- [ ] Year-to-date chart (Recharts) with a matching accessible data table.
- [ ] An automated check confirms no service-role key or write credential appears in the client bundle.

## v0.4 — Audited annual accounts

Goal: add final, audited full-year figures and show how provisional figures changed after audit.

Exit criteria:

- [ ] The latest audited Finance Accounts summary figures are imported and verified.
- [ ] For each year with both, the dashboard shows provisional (March, monthly accounts) vs audited values and the
      difference, clearly labelled.

## v0.5 — Department explorer

Goal: department-wise (grant-wise) budget vs spending.

Exit criteria:

- [ ] A documented, source-backed mapping between grants (demand numbers) and departments, including changes
      between years.
- [ ] Grant-wise Budget Estimates and actual expenditure imported and verified for at least one complete year.
- [ ] Search, sort and a per-department page linking to the exact source pages.

## v1.0 — Public launch

Exit criteria:

- [ ] Bengali language version of all interface text.
- [ ] Manual accessibility audit to WCAG 2.2 AA; Content-Security-Policy in place.
- [ ] Public corrections log and methodology page.
- [ ] Deployed on Vercel with the owner's chosen domain; monitoring for errors.
- [ ] A licence chosen for code and for derived data.

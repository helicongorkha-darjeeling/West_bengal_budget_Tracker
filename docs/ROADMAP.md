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

- [x] `CLAUDE.md`, `README.md` and the docs set exist: `ROADMAP`, `PROJECT_LOG`, `DECISIONS`, `SOURCE_INVENTORY`,
      `DATA_DICTIONARY`, `EVOLUTION`.
- [ ] The official sources have been inspected, with evidence (URLs, retrieval dates, SHA-256 of inspected files),
      and `SOURCE_INVENTORY.md` separates inspected/verified facts from open questions.
      *Progress (2026-10-21): PAG (A&E) monthly reports and the 2020-21 Finance Accounts / Accounts at a Glance done and
      re-checked; the Finance Department's 2026-27 budget set observed (8 of 29 files); the CAG's State Finances Audit
      Reports (PAG Audit-I) observed — five years listed, the 2024-25 report and chapters of three earlier ones read. Still
      to do: the Appropriation Accounts, BP-10 and BP-12 to BP-31, the interim 2026-27 set, and a second observer's check of
      the budget-document and audit-report findings.*
- [x] The website runs locally and shows: mission, empty metrics, reporting-period section, chart placeholder,
      department explorer placeholder, methodology and source transparency, and an informative empty state.
- [x] Zero fabricated figures, departments or statistics anywhere in the UI. *(Checked 2026-10-20 by scanning the
      served page: only version numbers, dates and step numbers; no monetary-looking values.)*
- [x] `npm run lint`, `npm run typecheck` and `npm run build` pass (0 errors).
- [x] Automated accessibility scan (axe-core) reports no serious or critical issues in light and dark mode; no
      horizontal scrolling at 375 px width.
- [x] Project log records the commands run, tests performed, failures and the next step.

## v0.2 — First verified report

Goal: one official monthly report, extracted reproducibly, verified and shown with full provenance.

Exit criteria:

- [ ] Python installed; `ingestion/` has pinned dependencies (pandas, pdfplumber) and a README.
      *Progress (2026-10-20): Python 3.15.0 installed and import-tested; `ingestion/.venv` created; pinned requirements
      still to be committed with the first script.*
- [ ] A script downloads one Monthly Key Indicators report and writes a manifest entry (URL, retrieval time,
      byte size, SHA-256).
- [ ] The extraction script reproduces **100 % of the rows** of the report's main table into a CSV, with the unit and
      page recorded, and running it twice gives byte-identical output.
- [ ] Reconciliation checks pass: every printed total equals the sum of its printed components within the
      document's precision. Any failure is reported, not hidden.
- [ ] A cross-source check passes: for the same financial year, the state-level actuals in the budget documents
      (Budget at a Glance) equal the monthly report's closing "March(Sy)" figures within printed precision, with the
      differing definitions of "total expenditure" reconciled and shown. *(Prototype: `docs/research/tools/compare_bp9_mki.py`;
      the 2024-25 comparison already passes, and with the CAG audit report's time series as a third document the four main
      rows agree within one crore.)*
- [ ] A human verification record exists for every figure shown (who, when, page checked).
- [ ] The dashboard shows the four headline measures for that report from a committed, versioned data file, each with
      source link, page, unit, period, accounting status and verification status.
- [ ] Unit tests cover unit conversion, Indian number formatting and derived percentages.
      *Progress (2026-10-28): covered for the site calculator (`web/src/lib/calc.test.ts`, 17 tests); the pipeline's
      own conversions will need theirs.*
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

*What we learned on 2026-10-20 and 21 (see `research/2026-10-20-finance-accounts-and-accounts-at-a-glance.md` and
`research/2026-10-21-cag-state-finances-audit-reports.md`):* the latest Finance Accounts listed by the PAG (A&E) are for
**2020-21**; later years are not listed. The CAG's **State Finances Audit Reports** are published for every year up to
**2024-25**, and their appendices carry Finance Accounts–based annual tables (decision D-023). So this milestone uses the
2020-21 Finance Accounts to prove the extraction, then covers 2021-22 to 2024-25 from the audit reports — labelled as such —
and switches to the Finance Accounts if later years appear. The Finance Accounts use a glyph-shifted text layer, two-digit
comma grouping and two volumes in different units (crore and lakh); the audit reports have a clean text layer but a
different structure every year.

Exit criteria:

- [ ] The official listing and the central CAG portal are re-checked for Finance Accounts newer than 2020-21, and the
      result is recorded.
- [ ] Audited full-year state-level figures for 2020-21 (Finance Accounts) are imported and verified — the extraction
      handles the shifted encoding, the comma format and both units, and every figure is checked against a rendered page.
- [ ] Audited-basis figures for 2021-22 to 2024-25 are imported from the State Finances Audit Reports, each report mapped
      separately, labelled "as reported in the CAG's State Finances Audit Report", and checked against rendered pages.
- [ ] For each year with both, the dashboard shows the closing provisional figures (the monthly "March(Sy)" edition) vs
      audited values and the difference, with the differing definitions of "total expenditure" reconciled and labelled.
      *(For 2024-25 the four main rows already agree within one crore.)*
- [ ] Stock figures (for example debt outstanding) are stored with an `as_at` date and never added to flows (D-021).
- [ ] The site states clearly which years have which kind of figure.

## v0.5 — Department explorer

Goal: department-wise (grant-wise) budget vs spending.

Exit criteria:

- [ ] A documented, source-backed mapping between grants (demand numbers) and departments, including changes
      between years.
- [ ] Grant-wise Budget Estimates and actual expenditure imported and verified for at least one complete year. The audit
      reports' grant-wise appendices (53 grants with overall savings in 2024-25) serve as a cross-check, not a substitute for
      the Appropriation Accounts.
- [ ] Search, sort and a per-department page linking to the exact source pages.

## v1.0 — Public launch

Exit criteria:

- [ ] Bengali language version of all interface text.
- [ ] Manual accessibility audit to WCAG 2.2 AA; Content-Security-Policy in place.
- [ ] Public corrections log and methodology page.
- [ ] Deployed on Vercel with the owner's chosen domain; monitoring for errors.
- [ ] A licence chosen for code and for derived data.

---

## Backlog — ideas not yet scheduled

Each idea waits for its prerequisite; none starts before the milestone it depends on is done. They come from the review of
an unofficial research file ([`research/2026-10-21-third-party-research-file-review.md`](research/2026-10-21-third-party-research-file-review.md)),
re-expressed under our rules.

| Idea | Prerequisite | Notes |
| --- | --- | --- |
| Audit notes: short observations from the CAG's reports, with paragraph and page | v0.4 done; wording rules in D-019 | Quote and attribute; never strengthen. |
| Balance ("stock") measures: debt outstanding, balances in deposit accounts, outstanding utilisation certificates | `measure_type` and `as_at` in the data model (D-021); the report tables identified | Shown separately from spending. |
| A per-person view | An official population source inspected | Labelled as derived; no "burden" wording (D-020). |
| Ratios to GSDP | An official GSDP source inspected, with its estimate status shown | The audit reports note GSDP is a Final, First Revised or Provisional Estimate. |
| Structure of spending (salaries, pensions, interest) | The definition confirmed per document | The CAG glossary defines "committed expenditure"; use a document's definition only as that document gives it. |
| Procurement (tender) layer | A scope decision and the portal's public terms | Public pages only (D-022). |
| Cross-check of grants received against Union releases | Official Union sources inspected | Compare the state accounts' grants-in-aid with the Union's own figures. |
| Formal request for the Finance Accounts and Appropriation Accounts for 2021-22 onwards | The owner's decision | See `DECISIONS.md`, open decisions. |

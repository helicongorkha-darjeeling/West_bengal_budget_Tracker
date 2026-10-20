# Research note — CAG audit reports on the finances of the Government of West Bengal

- **Date:** 2026-10-21 (IST). Pages and files retrieved on 2026-10-20 between 19:22 and 19:37 UTC.
- **Question:** Do the Comptroller and Auditor General's (CAG) reports on West Bengal's finances give us (a) audited-basis
  annual figures for years after 2020-21, the latest year of Finance Accounts listed by the Accountant General (A&E);
  (b) grant-wise budget and spending tables; and (c) official context on how reliable the accounts are?
- **How they were found:** from the citations in an unofficial research file supplied by the owner (reviewed in
  [`2026-10-21-third-party-research-file-review.md`](2026-10-21-third-party-research-file-review.md)). Everything below
  was then checked against the CAG's own pages and files; nothing here rests on that file.
- **Method:** opened the report listing (two of its eight result pages) and seven report pages; downloaded **nine PDFs**,
  hashed them, counted pages and dumped the text of every page; searched for the passages and tables described below;
  **rendered four pages to images and read them** (cover, Appendix 1.1, Appendix 2.9, glossary); ran a cross-check
  against two documents already inspected. The tools are in [`tools/`](tools/).
- **Evidence levels:** ✅ observed first-hand (text layer, counts, page headers) · 👁 also read from a rendered page
  image. **Single observer** — nobody has re-checked this note yet.
- **No financial figures are quoted.** The cross-check is reported as verdicts only.

## Where the reports are

- **Listing:** <https://cag.gov.in/ag1/west-bengal/en/audit-report> — title "Audit Reports | Principal Accountant General
  (Audit-I) West Bengal, Kolkata". ✅ HTTP 200. Pagination links run to **page 8**; pages 1 and 2 were read (20 reports,
  2021 to 2026). This is a different office from the A&E office whose State Accounts Report page we inspected earlier
  (both belong to the Indian Audit & Accounts Department).
- **State Finances Audit Reports (SFARs) listed** ✅ — one for each year from 2020-21 to 2024-25:

  | Report | Year covered | Report page id | Sent to Government | Tabled |
  | --- | --- | --- | --- | --- |
  | Report No. 1 of 2022 | 2020-21 | 115760 | 28 Feb 2022 | 25 Mar 2022 |
  | Report No. 01 of 2023 | year ended March 2022 | 125750 | 19 Apr 2023 | **25 Jul 2026** |
  | Report No. 02 of 2024 | year ended March 2023 | 125751 | 3 Jul 2024 | **25 Jul 2026** |
  | Report No. 02 of 2025 | year ended March 2024 | 125754 | 2 Apr 2025 | **25 Jul 2026** |
  | **Report No. 02 of 2026** | **year ended March 2025** | 125757 | 27 Apr 2026 | **25 Jul 2026** |

  The dates are the ones printed on each report's own page ("Date on which Report Tabled", "Date of sending the report to
  Government"). **Four of the five were tabled on the same day, 25 July 2026.** The other 15 reports on the two listing pages
  are compliance, performance, commercial and combined audit reports; the one examined for its date (Report No. 05 of 2025,
  performance and compliance, year ended March 2023) was also tabled on 25 July 2026.
- **Where the files are served from:** the same content-delivery host as the monthly reports,
  `d7i5wg8xwe4hf.cloudfront.net/uploads/download_audit_report/<year>/…` ✅. Direct addresses of the form
  `cag.gov.in/uploads/download_audit_report/…` (as given in the research file) return **HTTP 404**; the same file names
  exist on the delivery host (HTTP 200, sizes identical to the downloads below). Always take the file address from the
  report's own page.
- Each report page offers the full report and its parts (for Report No. 02 of 2026: the full report, Chapters 1–3, the
  appendices, and a merged contents-preface-executive-summary file).

## Documents examined

| What | Bytes | Pages | SHA-256 |
| --- | --- | --- | --- |
| 👁 SFAR 2024-25 (Report No. 2 of 2026), **full report** | 5,008,340 | 214 | `c2bfc0a06cadf67ad0ddc6b8ae145c04ec5d17333dec5e3ca35a4a22cc26ccb4` |
| SFAR 2024-25, contents + preface + executive summary | 1,000,799 | 12 | `89dcbcc4ea9eef7eb726f79c9f45274c52f2aa94e45290e4ed7a1b4d660ef4dc` |
| SFAR 2023-24 (Report No. 2 of 2025), Chapter 4 "Quality of Accounts & Financial Reporting Practices" | 787,504 | 19 | `0a879e5222a651c0c2583f5096d7640989a7c341551e0bff386eb81e8ba28020` |
| SFAR 2022-23, Chapter IV (same title) | 478,877 | 18 | `eebda46f3fe61f0546eed0227878d088d963e9b26e8b5fb6685398e0d6885667` |
| SFAR 2021-22, Chapter II | 1,227,884 | 59 | `46b1db299169f0ae98052c1dd08e361ef7ddb9181fd1ba4590f0ffff67e6cbac` |
| Performance and Compliance Audit Report 2022-23 (Report No. 5 of 2025), Chapter 1 (Swasthya Sathi) | 1,338,421 | 48 | `6efa64ffb26c6164be34647b2d3985b64fd10dc1c3be233b74623b348d8d14aa` |
| same report, Chapter 2 | 924,263 | 17 | `5ef0ad7236ced6827cd6d967fe62cef3236c8835e9ac2300bf3019a591f2e7e6` |
| same report, contents + preface + executive summary | 769,135 | 11 | `fbfb4d8233632239909581c9570d4837d7da14fec41c74d2aca363b4340eb0d7` |
| Index of Report No. 5 of 2021 (compliance audit report 2019-20) | 143,007 | 4 | `d9efae1fbf58ca9b62b5db9626f8c927a9c50f0b7143b0538f8e1e1865a23b0c` |

All nine start with `%PDF-` and carry a text layer. Pages with almost no text (under 20 characters) number 0 to 2 per file
and 15 in the full 2024-25 report; they were not examined one by one. Page numbers below are **PDF pages** of the full 2024-25
report unless stated; the printed page number is lower (for example, printed page 117 is PDF page 142).
Saved copy of the listing page 1: SHA-256 `db0b76a954f6ffdde0c50b5cf442b2905a04350cf67880843a51af4206ab3974`
(identifies our copy only; the page changes).

## Findings

### What an SFAR is, as printed ✅

- Cover 👁: "Report of the Comptroller and Auditor General of India on State Finances for the year 2024-25 — Government of
  West Bengal — Report No. 2 of 2026 (State Finances Audit Report)".
- Preface (PDF pp. 4–6 of the contents file; printed pp. v–vii): prepared for the Governor under Article 151; it "intends to assess the financial
  performance of the State, during the financial year 2024-25 and to provide the State Legislature with inputs, based on
  audit analysis of financial data". **The Finance Accounts and Appropriation Accounts "constitute the core data"**; they
  are prepared by the Accountant General (A&E), "independently audited by the Principal Accountant General (Audit-I) and
  certified by the Comptroller and Auditor General of India". The preface also explains the three parts of the
  government accounts (Consolidated Fund, Contingency Fund, Public Account).
- **Structure varies by year.** The 2024-25 report has three chapters — I Overview of Finances of the State, II Budgetary
  Management (based on the Appropriation Accounts), III Financial Reporting Practices (comments on the quality of the
  accounts) — plus appendices. The 2023-24 report has four (the quality-of-accounts material is Chapter 4), the
  2022-23 report calls it Chapter IV. **Read titles and numbers from each report.**

### Tables that matter to this project

| Table (2024-25 report) | Where | What it is |
| --- | --- | --- |
| **Appendix 1.1** Time Series Data on the State Government Finances | printed p.117–119; PDF 142–144 👁 | Five years (2020-21 to 2024-25) of receipts, expenditure, deficits and indicators. "**(₹ in crore)**", whole numbers, two-digit Indian grouping. Ends "**Source: Finance Accounts**". |
| Appendix 1.2 Abstract of Receipts and Disbursements, two years | printed p.120–123; PDF 145–148 ✅ | Receipts and disbursements with expenditure split into "Administrative" and "Programme". "Source: Finance Accounts". |
| Appendix 1.3 Summarised financial position as on 31 March 2025 | PDF 149 ✅ | Liabilities and assets **at a date** (balances, not spending). |
| Appendix 1.4 Ten-year trends, 2015-16 to 2024-25 | PDF 150 ✅ | Ten columns plus a growth-rate column. Negative values are printed "(-)" here but "-" in Appendix 1.1. |
| **Appendix 2.9** Grant-wise percentage of utilisation of budget and savings, 2024-25 | printed p.139–140; PDF 164–165 👁 (first page) ✅ (second) | Columns: number and name of grant, total budget, total expenditure, savings, percentage of utilisation; "(₹ in crore)", two decimals; ends "Source: Appropriation Accounts". **53 grants** — those with overall savings; grants with overall excesses are not in this table (note to Chart 2.4, PDF 105). |
| Appendices 2.15, 3.1, 3.4, 3.5 | PDF 176, 181, 186, 189 ✅ (titles only) | Outstanding utilisation certificates and abstract contingent bills by department, balances in personal deposit accounts, expenditure booked under Minor Head 800, revenue expenditure booked as capital. Not examined beyond their titles. |
| Glossary of Terms | printed p.180–181; PDF 205 👁 | Defines, among others, "Committed Expenditure" (on revenue account, mainly interest payments, salaries and wages, and pensions) and "Consolidated Fund". |

The report states that the expenditure it shows from the Appropriation Accounts is **gross**, "without taking into
account the recoveries adjusted in the accounts as reduction of expenditure" (note under the summary table in
Chapter II, PDF 91) ✅ — consistent with what we recorded for the Appropriation Accounts and Demands for Grants.

### Definitions and statuses the report prints ✅

- **"Total expenditure"** in Appendix 1.1 is row 13, "Total (10+11+12)" = revenue expenditure + capital expenditure +
  disbursement of loans and advances. Repayment of public debt is a separate row (14), added to reach "Total Disbursement
  out of Consolidated Fund (13+14+15)". So the report follows the pattern of the Accounts at a Glance (loans and advances
  included, debt repayment excluded) — not the monthly reports' definition.
- **The denominators have a status too.** A note on PDF 21 says the "GDP figures" shown against 2023-24 and 2024-25 are
  "First Revised Estimates" and "Provisional Estimates" respectively, and the data for 2022-23 are "Final Estimates". Any
  ratio to GSDP inherits that status.
- **Deposit-account transfers (paragraph 3.7, printed p.102; PDF 125):** "Some credits under Personal Deposit Accounts
  represent mere transfer of money from the Consolidated Fund of the State. Since such transfers are accounted for as
  expenditure from the Consolidated Fund of the State, such transfers would overstate the expenditure from the
  Consolidated Fund, if the money so transferred is not utilised within the financial year." The report adds that the
  unused part "was not discernible, as the PD accounts only depicted cumulative balances" (PDF 126).
- **Booked is not adjusted.** The report has a separate appendix on revenue expenditure booked as capital expenditure in
  2024-25 (Appendix 2.15) and notes under its tables. The time-series figures for revenue and capital expenditure equal the
  monthly and budget figures (cross-check below), so they are the figures **as booked**; the auditor's adjustments are
  commentary, not restated figures. "Audited" therefore never means "reclassified" (see D-016).

### Cross-check: three documents, one year ✅

`docs/research/tools/compare_bp9_mki.py` now takes an optional fourth argument, the 2024-25 report. For the rows all
three documents print — **revenue receipts, revenue expenditure, capital expenditure, loans and advances** — the audit
report's 2024-25 figures are **consistent within one crore** with both the monthly "March(Sy) 2025" edition and the
budget's "Actual 2024-25" column (verdicts: MATCH within printed precision; the tolerance is wide because the audit report
prints whole crore and its totals can be sums of separately rounded parts). The earlier result stands: the budget and the
monthly report agree to the printed two decimals, and their "total expenditure" figures differ exactly by loans and
advances plus repayment of loans.

What this does and does not show:

- For these four rows the **provisional closing figures were not changed** by the time the accounts were certified, at a
  resolution of about one crore. That is a first answer to the v0.4 question "how far do provisional figures move after
  audit?" — for **one year** and **four rows**.
- It does **not** show the same for every line, every year, or at the rupee level. Differences smaller than about half a
  crore cannot be seen in a whole-crore table.
- We have **not** seen the Finance Accounts for 2024-25. The report labels its appendices "Source: Finance Accounts"; that
  label is the only link, so figures from the report must be shown as "as reported in the CAG's State Finances Audit
  Report", not as "Finance Accounts".

### How the reports word their observations ✅

The auditor's language is attributive and measured: details "were not furnished to Audit by the State Government, though
called for"; transfers "indicated that the same was intended to avoid lapse of budget provisions" (2023-24) and were
"indicative of an attempt to circumvent the lapsing of budget provision" (2024-25); adjustments are headed "irregular";
the balance of outstanding utilisation certificates is "as per the records of AG (A&E), which is pending reconciliation".
Where this project ever repeats such findings, it quotes and attributes them (decision D-019) — it does not strengthen them.

## What this changes

- **Audited-basis annual figures exist beyond 2020-21**, in the reports' appendices, up to 2024-25. The v0.4 plan can
  cover 2021-22 to 2024-25 (labelled as above) and still use the 2020-21 Finance Accounts to test the extraction.
- **Open question 6** (a grant-wise source for actual spending) is partly answered: Appendix 2.9 and neighbours give
  budget versus expenditure for 2024-25, but only for 53 grants. The **Appropriation Accounts** themselves, which are
  complete, are still not inspected.
- **Open question 8** (Finance Accounts for 2021-22 onwards): still not listed by the A&E office; the audit reports are
  the interim route. A possible link, not established: the reports for 2021-22 to 2024-25 were all tabled on 25 July 2026,
  and the 2020-21 Finance Accounts were laid on 25 March 2022, the same day as the 2020-21 report. The A&E office may post
  later years after tabling — to be checked at the next inspection.
- A source with a **different structure each year** (chapter numbers, appendix numbers) needs per-report mapping, not a
  fixed template.

## Not examined

- The chapters of the 2024-25 report beyond the passages and tables cited; Appendices 1.5 and 2.x–3.x beyond their titles;
  the appendices of the earlier reports; whether any figure differs between a report and the Finance Accounts.
- Listing pages 3–8 and the compliance, performance and commercial reports, except the two Swasthya Sathi items cited in
  the review note.
- Older SFARs (before 2020-21).

## Evidence log (UTC, 2026-10-20)

| Time | What | Result |
| --- | --- | --- |
| 19:22–19:24 | Report pages 22856 (the 2014-15 report, cited by the file; used only to see where files are hosted), 125756, 125757, 125754, and listing page 1 | HTTP 200 each |
| 19:37 | Report pages 125750, 125751, 115760 (to confirm which report each id is) | HTTP 200 each; file names and dates read from the pages |
| 19:23 | Chapter files of SFAR 2023-24, 2022-23 and 2021-22 (CDN host) | HTTP 200, `%PDF-` |
| 19:25 | SFAR 2024-25 full report and front matter | HTTP 200, `%PDF-` |
| 19:29 | Report No. 5 of 2025 Chapters 1–2 and front matter; Index of Report No. 5 of 2021 | HTTP 200, `%PDF-` |
| 19:32 | Listing page 2 | HTTP 200 |
| after | Text dump of every page of all nine PDFs; page searches; four pages rendered and read; cross-check run | as described above |

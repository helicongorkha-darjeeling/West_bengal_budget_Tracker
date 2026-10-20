# Source inventory

Which official sources we use, what we have actually inspected, and what still needs investigation.

**Evidence labels used below**

- ✅ **Verified by inspection** — we observed it directly, on the date stated, and kept evidence.
- ⏳ **Pending** — inspection is under way or not yet done. Nothing marked ⏳ may be relied on.
- ❓ **Open question** — something we could not determine yet.

Detailed evidence for each inspection lives in [`docs/research/`](research/).

_Last updated: 2026-10-20 (listing pages and Monthly Key Indicators inspected; other documents in progress)._

---

## Source A — Finance Department, Government of West Bengal

- **Page:** Budget Speech & Publications —
  <https://finance.wb.gov.in/Fin_New/Pages/Budget_Publication.aspx>
- **Role for this project (expected, to be confirmed document by document):** Budget Estimates (BE), Revised Estimates
  (RE) and earlier years' actuals, including department-wise Demands for Grants.

### ✅ Verified by inspection (listing page, 2026-10-20 07:58 UTC)

- The page responded with HTTP 200 (255,301 bytes).
- It is an ASP.NET page with a **budget-year drop-down** offering 1999-2000 through 2026-2027, plus separate
  **interim** entries for 2026-2027, 2021-2022 and 2016-2017. Changing the year triggers an ASP.NET form post
  (`__doPostBack`); we have not found a separate web address per year.
- The default view (2026-2027) links **29 distinct PDF files**:
  - Budget speech 2026 in English (`Budget_Speech/2026_English.pdf`) and Bengali (`Budget_Speech/2026_Bengali.pdf`);
  - one fiscal-policy document (`Fiscal_Policy/FRBM26_Part1.pdf`);
  - 26 budget publications under `Budget_Publication/`: BP-1 (`2026_bp1-1.pdf`), BP-3, BP-4, BP-5
    (`2026_bp5-Disb.pdf`), BP-6, BP-7, BP-9 (`2026_bp9-1.pdf`), BP-10, and the **Detailed Demands for Grants
    2026-2027** volumes BP-11 to BP-26, BP-30 and BP-31 (BP-20 is `2026_bp-20.pdf`). BP-2, BP-8 and BP-27 to BP-29 are
    not linked.
  - Three further links point to the folder itself with no file name (no document behind them).
- Titles shown on the page include "Civil Budget Estimate", "Public Account - Receipts & Disbursements",
  "Statement - I Budget at a Glance", "Departmental Expenditure", "Guarantee Statement", "Key to Budget Doccuments"
  [sic], "Revenue & Receipts", "Financial Results of some of PSUs/Corporation" and "Medium Term Fiscal Policy &
  Fiscal Policy Strategy Statement". **Which title belongs to which BP number is ambiguous in the page layout** — see
  open questions.
- The Detailed Demands for Grants section lists demand numbers with department names (for example "01" with
  "Legislative Assembly Secretariat") next to links to the BP-11 to BP-31 volumes; which demands each volume covers
  must be confirmed from the volumes themselves.
- No API was visible on the page; documents are published as PDF files.

### ⏳ Pending (document-level inspection)

- The printed title, financial year, units and column headings of each general publication.
- Which documents contain actuals, for which year, and their accounting status as printed.
- The structure of a Detailed Demands for Grants volume (level of detail, columns, units).
- Whether older years and the interim budgets can be listed reliably by reproducing the year selection.

## Source B — Office of the Principal Accountant General (A&E), West Bengal (CAG of India)

- **Page:** State Accounts Report — <https://cag.gov.in/ae/west-bengal/en/state-accounts-report>
- **Role for this project (expected, to be confirmed):** monthly accounts summaries (provisional actuals) and the annual
  Finance Accounts and Appropriation Accounts (audited actuals).

### ✅ Verified by inspection (listing page, 2026-10-20 07:58 UTC)

- The page responded with HTTP 200 (100,102 bytes). Its heading is "State Accounts Report"; the office is shown as
  "Principal Accountant General (A&E), West Bengal, Kolkata — Indian Audit & Accounts Department".
- It has five tabs: **FA&AA data**, **Appropriation Accounts**, **Finance Accounts**, **Accounts at a Glance** and
  **Monthly Key Indicators**. In the page as first loaded, only the Monthly Key Indicators tab contains listings; the
  site menu links the other report types through a query parameter (`?defuat_account_report_type=357` Accounts at a
  Glance, `358` Appropriation Accounts, `359` Finance Accounts Vol-I & II, `360` Monthly Key Indicators). An archive
  view exists (`?arch=1`).
- **Monthly Key Indicators (MKI)** are listed for financial years **2021-22 to 2026-27**:

  | Financial year | Entries listed | Notes |
  | --- | --- | --- |
  | 2026-27 | April, May, June 2026 | Latest month listed: **June 2026**. May and June also have a "Click Here" link to a Google Sheets file. |
  | 2025-26 | April 2025 – February 2026, "March(Pre), 2026", "March(Sup), 2026" (listed twice) | One Google Sheets link. |
  | 2024-25, 2023-24, 2022-23, 2021-22 | April – February, "March(Sup)", "March(Pre)" | 13 PDFs each. |

  The PDFs are served from `d7i5wg8xwe4hf.cloudfront.net/uploads/state_accounts_report/`. The listing shows every
  file size as "(0.00 MB)", which is clearly a display fault, not the real size.
- **March is published in two stages** each year, labelled "March(Pre)" and "March(Sup)" on the page.

### ✅ Verified by inspection — Monthly Key Indicators documents (2026-10-20)

Evidence, hashes and exact labels: [`research/2026-10-20-monthly-key-indicators.md`](research/2026-10-20-monthly-key-indicators.md).
Items marked ✅✅ there were observed by an inspector and independently re-checked; the summary below uses only those.

- **Coverage:** monthly reports from **April 2008 to June 2026** — 2021-22 onwards on the main page, 2008-09 to
  2020-21 in the archive view (2008-09 and 2009-10 as Flash `.swf` files; PDFs from 2010-11).
- **Accounting status as printed:** "(UNAUDITED PROVISIONAL FIGURES)" — the only status wording in each report.
- **Unit as printed:** "(₹ in crore)", values to two decimals.
- **Period:** page 1 is **year-to-date** ("Actuals upto JUNE 2026" = 1 April to 30 June 2026), compared with the same
  year's **Budget Estimates** only — no Revised Estimates column.
- **Structure:** an 11-item state-level table (receipts, revenue expenditure with interest, salaries, pension and
  subsidy, capital expenditure, sector-wise expenditure, total expenditure, loans and advances, deficits).
  **"Total Expenditure (4+ 5)" = revenue + capital expenditure; "Loans and Advances Disbursed" is a separate row.**
  No department, grant or major-head breakdown.
- **March:** the documents print "MARCH(P)" and "MARCH(Sy)" (the listing says "March(Pre)" and "March(Sup)"); the
  abbreviations are not spelled out anywhere. The "Sy" edition's totals equal its trend row "March(Final)", so it
  carries the year's closing provisional figures. The two editions must never be added together.
- **Spreadsheet versions:** the June 2026 "Click Here" Google Sheet downloads as `.xlsx` without login and mirrors the
  PDF page by page (same title, status, unit, headings). It is a live, editable file, so we must keep a fingerprinted
  copy and reconcile it against the PDF.
- **Text layer:** present in every PDF checked; `pdftotext -table` keeps rows aligned, `-layout` does not.

### ⏳ Pending (document-level inspection)

- The workflow's adversarial verifier for the MKI findings (the key claims above were re-checked independently).
- Available years, units, certification text and table structure of the Finance Accounts, Appropriation Accounts and
  Accounts at a Glance; what "FA&AA data" contains.

---

## ❓ Open questions

1. Which printed title belongs to each BP number on the Finance Department page?
2. What units do the budget documents and annual accounts use (thousand, lakh or crore of rupees)? (MKI: crore — answered.)
3. What do "Pre/P" and "Sup/Sy" officially stand for? (The documents show that the "Sy" edition's totals run to
   "March(Final)", i.e. it closes the year's provisional accounts — but the abbreviations are not defined anywhere.)
4. Which version is authoritative when an MKI is listed both as a PDF and as a live Google Sheet? (June 2026 sheet:
   public and mirrors the PDF — answered for that one file only.)
5. How do the 2026-27 interim budget and the full 2026-27 budget differ in what they present?
6. Which document gives department-wise (grant-wise) **actual** expenditure in a form we can reconcile with budget
   figures? (Not the MKI — it has no department breakdown.)
7. Why were no July–September 2026 MKIs listed on 2026-10-20?

## Candidates not yet inspected (no claims made)

These may help later for cross-checking or context. None has been inspected, and none may feed a published figure
unless it is added above as an inspected official source.

- CAG audit reports on the finances of the Government of West Bengal (cag.gov.in).
- The West Bengal IFMS portal (wbifms.gov.in) — linked from the Finance Department site; the links seen lead to a
  login page.
- Secondary compilations and analyses (for example the Reserve Bank of India's studies of state budgets). Orientation
  only, never a source for published figures.

## Inspection log

| When (UTC) | What | Method | Evidence |
| --- | --- | --- | --- |
| 2026-10-20 07:58 | Finance Department listing page | `curl` download, link extraction | HTML saved; SHA-256 `fb29a942c72a3e84ac4293e797e5dc335e65c1cdb1d018673d68427c71ab150a` (page content changes with each load because of ASP.NET state, so the hash identifies our copy only) |
| 2026-10-20 07:58 | CAG / PAG (A&E) West Bengal listing page | `curl` download, link extraction | HTML saved; SHA-256 `74bbb7f0b5eb4d9a571e8af10ffd6b10d7961cc6ffc6483548e06d483494a6ce` |
| 2026-10-20 08:05–08:45 | Monthly Key Indicators: 6 PDFs, 1 Google Sheet, main and archive listings | Inspector agent, then independent re-download and re-check of key claims | [`research/2026-10-20-monthly-key-indicators.md`](research/2026-10-20-monthly-key-indicators.md) |
| 2026-10-20 (in progress) | Finance/Appropriation Accounts, Accounts at a Glance; Finance Department budget documents | Multi-agent inspection with independent adversarial verification | Will be recorded in `docs/research/` |

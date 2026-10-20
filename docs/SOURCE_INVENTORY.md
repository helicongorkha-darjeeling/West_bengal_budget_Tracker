# Source inventory

Which official sources we use, what we have actually inspected, and what still needs investigation.

**Evidence labels used below**

- ✅ **Verified by inspection** — we observed it directly, on the date stated, and kept evidence.
- ⏳ **Pending** — inspection is under way or not yet done. Nothing marked ⏳ may be relied on.
- ❓ **Open question** — something we could not determine yet.

Detailed evidence for each inspection lives in [`docs/research/`](research/).

_Last updated: 2026-10-20 (listing pages, Monthly Key Indicators, Finance Accounts / Accounts at a Glance and the main
Finance Department budget publications inspected; Appropriation Accounts and the remaining budget volumes still to do)._

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

### ✅ Observed — 2026-27 budget publications (June 2026), 8 of 29 files (2026-10-20, single observer)

Evidence: [`research/2026-10-20-finance-department-budget-publications.md`](research/2026-10-20-finance-department-budget-publications.md)
(sizes, SHA-256, page counts; every page text-scanned; covers and sample data pages read as images). Not yet re-checked
by a second observer.

- **Which BP is which:** the covers settle the listing page's ambiguity — each title follows its own "BP-n" link.
  BP-1 "Annual Financial Statement" (headed "Civil Budget Estimate" inside), BP-3 "Details of Department Wise Demands for
  Grants", BP-4 receipts under the Consolidated Fund, BP-5 Contingency Fund and Public Account, BP-6 guarantees and
  financial trend, BP-7 public sector undertakings, BP-9 "Budget at a Glance", BP-11 "Detailed Demands for Grants".
- **Period columns:** Actual 2024-2025 · Budget Estimate 2025-2026 · Revised Estimate 2025-2026 · Budget Estimate
  2026-2027. A budget for year *Y* shows actuals for *Y−2*.
- **Accounting status of "Actual":** **not stated** (no "provisional" or "audited" wording on any page searched).
- **Units differ by table:** thousand of rupees, crore, lakh and whole rupees; BP-4 and BP-6 mix units inside one document.
- **Department vs grant:** BP-3 is by department (58, with two-letter codes); BP-11 onward by Demand number, gross with
  recoveries deducted. No stated mapping between the two.
- **The budget's 2024-25 actuals equal the monthly March(Sy) 2025 closing figures** for revenue receipts, revenue
  expenditure, capital expenditure and loans and advances; the two documents' "total expenditure" differ by exactly
  loans and advances plus repayment of loans (reproducible: `research/tools/compare_bp9_mki.py`).

### ⏳ Pending (document-level inspection)

- BP-10, BP-12 to BP-31, the budget speeches, the fiscal policy statement, and the **interim** 2026-27 set.
- Earlier years, and whether the year-selection form post can be reproduced with plain HTTP requests.
- A second observer's check of the observations above.

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

### ✅ Verified by inspection — Finance Accounts and Accounts at a Glance, 2020-21 (2026-10-20)

Evidence: [`research/2026-10-20-finance-accounts-and-accounts-at-a-glance.md`](research/2026-10-20-finance-accounts-and-accounts-at-a-glance.md).
An inspector's findings, then re-checked by re-downloading the files (size and SHA-256 identical) and **rendering the
pages to images and reading them**. The summary below uses only what was re-checked.

- **Availability:** listed only in the **Archive** view of the page — Finance Accounts 19 files (2009-10 to 2020-21),
  Accounts at a Glance 12, Appropriation Accounts 13, "FA&AA data" none. **The latest year listed is 2020-21**; nothing
  for 2021-22 or later is listed.
- **Accounting status:** the Finance Accounts carry a CAG certificate ("true and fair view", dated 10 DEC 2021, with
  numbered observations) and were laid before the State Legislature on 25.03.2022. The Accounts at a Glance is based on
  those certified accounts and is not itself certified.
- **Units:** Finance Accounts **Volume I "(₹ in Crore)"**, **Volume II "(₹ in Lakh)"** — a factor of 100 — and the
  Accounts at a Glance "(₹ in Crore)".
- **Number format:** statement tables print commas after every two digits (`12,34,56.78` = 123,456.78; illustrative).
- **"Total expenditure" is defined differently:** monthly reports exclude loans and advances; the Accounts at a Glance
  includes them.
- **Net vs gross:** Finance Accounts expenditure is net of recoveries; the Appropriation Accounts and Demands for Grants
  are gross.
- **Text layer:** the 2020-21 Finance Accounts use a glyph-shifted encoding (characters stored 29 code points low);
  the Accounts at a Glance is clean.

### ⏳ Pending (document-level inspection)

- **Appropriation Accounts** — the expected source of grant-wise (gross) expenditure. Not yet opened.
- Whether newer Finance Accounts exist anywhere official; what the empty "FA&AA data" tab is for.
- The finance-accounts claims marked ✅ (inspector only) in the research note.

---

## ❓ Open questions

1. Which printed title belongs to each BP number on the Finance Department page? (Answered from the covers for BP-1, 3,
   4, 5, 6, 7, 9 and 11; BP-10 and BP-12 onward not examined.)
2. What units do the budget documents use (thousand, lakh or crore of rupees)? (Answered for the monthly reports and
   annual accounts: crore, except Finance Accounts Volume II, which is lakh. Budget documents: still to check.)
3. What do "Pre/P" and "Sup/Sy" officially stand for? (The documents show that the "Sy" edition's totals run to
   "March(Final)", i.e. it closes the year's provisional accounts — but the abbreviations are not defined anywhere.)
4. Which version is authoritative when an MKI is listed both as a PDF and as a live Google Sheet? (June 2026 sheet:
   public and mirrors the PDF — answered for that one file only.)
5. How do the 2026-27 interim budget and the full 2026-27 budget differ in what they present?
6. Which document gives department-wise (grant-wise) **actual** expenditure in a form we can reconcile with budget
   figures? (Not the MKI, and not the Finance Accounts statements — most likely the Appropriation Accounts, not yet
   inspected.)
7. Why were no July–September 2026 MKIs listed on 2026-10-20?
8. Are Finance Accounts or Accounts at a Glance for **2021-22 onwards** published anywhere official? None is listed
   on the regional page or the central CAG portal's West Bengal view (archive included) as of 2026-10-20.
9. What is the accounting status of the "Actual 2024-2025" columns in the budget documents? They match the monthly
   closing figures, but nothing printed says "provisional" or "audited".
10. How do the Finance Department's departments map to Demand numbers (grants), and is the mapping stable across years?
11. Is BP-3's no-decimal-point number format (last two digits as decimals) consistent on all 397 pages?

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
| 2026-10-20 08:05–08:42 and 13:58 | Finance Accounts Vol I and II 2020-21, Accounts at a Glance 2020-21, FA 2019-20 sample; archive listings | Inspector agent (08:xx); my own re-download, page counts, and page-image reading (13:58) | [`research/2026-10-20-finance-accounts-and-accounts-at-a-glance.md`](research/2026-10-20-finance-accounts-and-accounts-at-a-glance.md) |
| 2026-10-20 13:5x | Finance Department: HTTP status and size of all 29 PDFs linked from the 2026-27 page | `curl -I` for each file | All returned HTTP 200 `application/pdf`; 25 files are 0.6–3.5 MB, the largest 44 MB; total about 204 MB |
| 2026-10-20 14:01–14:09 UTC | Finance Department: BP-1, 3, 4, 5, 6, 7, 9 and one Demands for Grants volume (BP-11) | My own download, SHA-256, page counts, every-page text scan, page-image reading, cross-check against the monthly report | [`research/2026-10-20-finance-department-budget-publications.md`](research/2026-10-20-finance-department-budget-publications.md) |
| not yet done | Appropriation Accounts; BP-10 and BP-12 to BP-31; interim 2026-27 set; earlier years | — | — |

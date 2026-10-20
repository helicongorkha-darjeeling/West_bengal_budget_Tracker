# Research note — Monthly Key Indicators (MKI), PAG (A&E) West Bengal

- **Date:** 2026-10-20
- **Question:** What are the monthly expenditure reports published by the Principal Accountant General (A&E),
  West Bengal — their periods, accounting status, units and table structure?
- **Method:** An inspector agent downloaded and examined 6 PDFs, 1 spreadsheet and 3 listing views (text layer via
  `pdftotext`, PDF objects via a read-only script). The key claims were then **re-checked independently** by fresh
  downloads into a separate folder. The workflow's own adversarial verifier for this area had not run yet when this
  note was written.
- **Evidence levels:** ✅✅ = observed by the inspector **and** independently re-checked · ✅ = observed by the
  inspector only (pending the verifier).
- **No financial figures are quoted in this note on purpose:** nothing has been through the verification pipeline yet.

## Documents examined

| Listed as | Title as printed (page 1) | Pages | Bytes | SHA-256 | Level |
| --- | --- | --- | --- | --- | --- |
| June, 2026 | ACCOUNTS AT A GLANCE (At the end of JUNE, 2026) · Monthly Key Indicator for the month of JUNE, 2026 | 18 | 111,591 | `607a2c8db50c53209d83e26266e4a2d8db9e5dd76b4656264b4e4b4889c37bb1` | ✅✅ |
| June, 2026 (Google Sheet) | Same title, in sheet `SUMMARY` | 18 sheets | 69,963 | `7b5f3645a6b4738a5b9f9054409af8fd872d32648176686404d1512a35d501b7` | ✅✅ (title, status, unit, sheets) |
| May, 2026 | … At the end of MAY, 2026 | 18 | 121,171 | `48febe657ce9b4853537e508e50914a692aae4c6ff846e2cc29ccb43c8ac59d6` | ✅ |
| March(Pre), 2025 | … At the end of MARCH(P), 2025 | 18 | 234,902 | `31024b871fe26db2d4df16e86b434f9cd7fd6bf6b02a21af4fe999ff8de6e10e` | ✅✅ |
| March(Sup), 2025 | … At the end of MARCH(Sy), 2025 | 17 | 111,929 | `8ca524e6981977e7f005d66733c8329cddde2c0cd0b29a4b93b94accd9e2eff1` | ✅✅ |
| April, 2024 | … At the end of APRIL, 2024 | 18 | 146,818 | `7089a5fac8e97238aa036a74e94ea63bdd61d0ad15ddb7908e46a9ceb586b66c` | ✅ |
| June, 2023 | … At the end of JUNE, 2023 | 19 | 199,930 | `a030074405e1e882a0e7cacd1d5a123b88c20291396a3fb8e230496031920276` | ✅ |

All files are served from `https://d7i5wg8xwe4hf.cloudfront.net/uploads/state_accounts_report/` (the Google Sheet
from `docs.google.com`). Retrieved 2026-10-20 between 08:05 and 08:45 UTC; every request returned HTTP 200.

## Findings

### Coverage ✅✅

- Main page: financial years **2021-22 to 2026-27**; latest month listed **June 2026** (no July–September 2026 entry
  on 2026-10-20).
- Archive view (`?arch=1`): **2008-09 to 2020-21**. The 2008-09 and 2009-10 editions are Flash (`.swf`) files, not
  PDFs; PDFs start with 2010-11.
- So official monthly reports exist from **April 2008 to June 2026**.

### Accounting status ✅✅

Every edition prints **"(UNAUDITED PROVISIONAL FIGURES)"** under its title. It is the only status wording in the
document — nothing says audited, certified or "subject to audit".

### Unit ✅✅

**"(₹ in crore)"**, printed at the top right of page 1 (and, per the inspector, on every trend page). Values have two
decimals.

### Period ✅✅

Page 1 is **year-to-date**: "Actuals upto JUNE 2026" means 1 April to 30 June 2026. It is compared with the
**Budget Estimates** of the same year only — there is **no Revised Estimates column**, even in the March editions.

### Page-1 table ("Monthly Accounts at a Glance") ✅✅

Columns: `Sl. No` · `Description` · `Budget Estimates 2026-27` · `Actuals upto JUNE 2026` ·
`% of Actual to Budget Estimates` — split into `Current` and `Corresponding period of the previous year` (the
previous year appears only as a percentage).

Rows (exact labels):

1. Revenue Receipts — (a) Tax Revenue (i+ii+iii+iv+v+vi+vii): SGST; Stamps and Registration; Land Revenue; Sales
   Tax; State Excise Duties; State's Share of Union Taxes; Other Taxes and Duties · (b) Non –Tax Revenue ·
   (c) Grants –in-Aid and Contribution
2. Capital Receipts — (a) Recovery of Loans and Advances (Non debt Capital Receipts) · (b) Other Receipts ·
   (c) Borrowings and Other Liabilities (Net)
3. Total Receipts (1+2)
4. **Revenue Expenditure (a+b+c+d+e)** — (a) Expenditure on Revenue Account {(excluding (b), (c), (d) & (e)} ·
   (b) Interest Payments · (c) Salaries/Wages · (d) Pension · (e) Subsidy
5. **Capital Expenditure (a+b)** — (a) Expenditure on Capital Account {(excluding (b)} · (b) Salaries/Wages
6. Sector Wise Expenditure — General / Social / Economic sector, each Revenue and Capital; plus grants to local
   bodies and Panchayati Raj institutions under Major Head 3604
7. **Total Expenditure (4+ 5)** — revenue plus capital expenditure
8. **Loans and Advances Disbursed** — reported separately, **not** part of row 7
9. Revenue Surplus (+)/Deficit (-) (1-4)
10. Fiscal Surplus (+)/Deficit (-) [{1 + 2(a) + 2(b)}] - (7+8)
11. Primary Deficit (-)/Surplus (+)

There is **no breakdown by department, grant or major head** in this report.

### Trend pages ✅

Pages 3–18 hold 16 "Monthly Trend" tables (items 1, 1(a)–(c), 2(a)–(c), 3, 4(a)–(e), 5(a), 5(b), 8). Each shows,
for the current and the previous year, **Monthly** and **Progressive** (year-to-date) values, by month from April to
February, then **"March(Pre)"** and **"March(Final)"**. So every edition also carries the previous year's
month-by-month figures for these items. Page 2 of most editions is an "exclusion details" table: how many
Treasury/Pay & Accounts Office accounts were due, received and excluded that month.

### March is published twice ✅✅

- The listing says "March(Pre)" and "March(Sup)"; the documents print **"MARCH(P)"** and **"MARCH(Sy)"**.
- Neither the documents nor the listing spell out the abbreviations.
- For 2024-25, the March(P) page-1 Revenue Receipts actual equals the trend row "March(Pre)" (progressive), and the
  March(Sy) page-1 actual equals the trend row "March(Final)" — and, as a control, does **not** equal "March(Pre)".
  (Re-checked by script comparing values without printing them.) So the "Sy" edition carries the year's closing
  provisional position. Reading the labels as "preliminary" and "supplementary" is a plausible interpretation,
  **not yet confirmed** by an official source.
- The March(Sy) edition has no exclusion page (17 pages).

### Spreadsheet versions ✅✅ (access) · ✅ (content match)

- Some recent entries (May 2026, June 2026, March(Sup) 2026) also link a **Google Sheet**. The June 2026 sheet
  downloads as an Excel file with **no login** (one redirect, HTTP 200, a genuine `.xlsx`).
- It has **18 sheets mirroring the 18 PDF pages** (`SUMMARY`, `EXCLUTION` [sic], `Item No 1` … `Item No 8`), with the
  same title, status line, unit and headings.
- Per the inspector, every number printed in the PDF appears in the sheet (one rounding edge case), the sheet stores
  unrounded values and formulas, and its modification time is minutes before the PDF's creation time — i.e. it is the
  **source workbook** of the PDF.
- Caution: it is a live, editable Google file, so it could change after publication. We must store a fingerprinted
  copy at retrieval time, and treat the PDF as the reference document.

### Derived rows ✅

Per the spreadsheet's formulas: "% of Actual to Budget Estimates — Current" = Actual ÷ BE × 100; "Other Taxes and
Duties" is a residual (tax revenue minus the six named taxes); "Borrowings and Other Liabilities (Net)" equals minus
the fiscal surplus/deficit. These must be labelled as derived when shown.

### Structure stability ✅

The same 11 headline items, columns and 16 trend tables appear in editions from June 2023 to June 2026; differences
are cosmetic (page breaks, sign-off style, a reference line from 2025-26 onwards).

## Extraction hazards for v0.2

- `pdftotext -layout` **misaligns** values against row labels on page 1; `-table` mode aligns them correctly. ✅
- In the March(P) 2025 PDF, two data cells and the sign-off exist only as **PDF annotations** — a parser reading only the
  page content would silently miss them. ✅
- **File names are unreliable** (e.g. a file named "…23-24" is the April 2024 report; typos; re-uploads with doubled
  prefixes). Use the printed title as the key. ✅
- Listing metadata is unusable for dates and sizes: every file shows "(0.00 MB)" ✅✅, and the CDN's Last-Modified date
  is the same recent date even for old files ✅.
- The spreadsheet has hidden cells inside merged ranges, a number stored as text and inconsistent formulas. ✅
- Documents do not name the PAG or CAG in their text; attribution rests on the official page that hosts them. ✅

## Open questions

1. Official meaning of "Pre/P" and "Sup/Sy", and how the closing provisional figures relate to the audited Finance
   Accounts.
2. Why no July–September 2026 editions were listed on 2026-10-20 (a delay, or a process change?).
3. Which version is authoritative when both a PDF and a live Google Sheet are listed.
4. The denominator of "% … Corresponding period of the previous year" (presumably the previous year's BE; hard-coded in
   the sheet).
5. Whether re-uploaded files (January and February 2026) changed content.

## What this means for the project

- The **v0.2 source is clear**: one MKI edition gives state-level year-to-date revenue, capital and total expenditure,
  BE and % of BE, in ₹ crore, explicitly marked unaudited and provisional.
- Our headline "Total expenditure" must say what it includes: in the MKI it is **revenue plus capital expenditure**;
  loans and advances are separate.
- Extraction should prefer the spreadsheet (unrounded values, no layout problems) **and** reconcile every value against
  the PDF, recording both fingerprints.
- Department-level spending is **not** in the MKI; it must come from other documents (to be inspected).

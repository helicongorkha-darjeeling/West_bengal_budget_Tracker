# Research note — Finance Accounts and Accounts at a Glance, PAG (A&E) West Bengal

- **Date:** 2026-10-20
- **Question:** What are the annual, audited accounts published by the Principal Accountant General (A&E), West Bengal
  — which years exist, how final they are, what units and table layouts they use — and how do they relate to the
  monthly reports?
- **Method:** A first-pass inspection examined four PDFs (its result was recovered from the job's log after the
  session was interrupted). **The key claims were then re-checked**: the three 2020-21 documents were re-downloaded, size
  and SHA-256 compared, pages counted, and **pages rendered to images and read** — something the first pass could not
  do. The job's own planned verification step never ran.
- **Evidence levels:** ✅✅ = observed in the first pass **and** independently re-checked (visually, unless stated) ·
  ✅ = first pass only.
- **No financial figures are quoted in this note.** Number-format examples are marked *illustrative* and are not
  taken from any document.

## Documents examined

| Document | Title as printed | Pages | Bytes | SHA-256 | Level |
| --- | --- | --- | --- | --- | --- |
| Finance Accounts **Volume I** 2020-21 | "Finance Accounts (Volume - I) 2020-21, Government of West Bengal" (cover, PDF p.2) | 108 | 1,572,861 | `f10cb8a7415787d374fd7c1371d4e36ac81206cf1b4eada903e80ede3c9240b1` | ✅✅ |
| Finance Accounts **Volume II** 2020-21 | "Finance Accounts (Volume-II) 2020-21 …" | 722 | 5,027,058 | `a42b668b8ce11c76523063c40fdc686da11deccab28c4bba4385193ed39c7b4e` | ✅✅ (size, hash, pages, unit page); title ✅ |
| **Accounts at a Glance** 2020-21 | "Accounts at a Glance 2020-21 Government of West Bengal" | 64 | 3,285,886 | `32d4f608ebb4cf8a735e4537ac862f93081c4740b2a00fdb04c0ef8e990a04e4` | ✅✅ |
| Finance Accounts Vol I 2019-20 (sample) | "Finance Accounts (Volume-I) 2019-20 …" | 109 | 2,096,502 | `aa6a59c8e8b125e4df1ff5c0e8a3bea1b3b878ed2e37f7038ddbd197c124918a` | ✅ |

Files are served from `https://d7i5wg8xwe4hf.cloudfront.net/uploads/state_accounts_report/`. The re-check copies were
retrieved 2026-10-20 at about 13:58 UTC (the first pass's at about 08:14 UTC); sizes and hashes were identical.

## Findings

### Availability — the latest listed year is 2020-21 ✅✅

- On the default listing page the **Finance Accounts, Accounts at a Glance, Appropriation Accounts and "FA&AA data"
  tabs are empty**. Documents appear only under the **Archive** view: Finance Accounts **19 files** (2009-10 to
  2020-21), Accounts at a Glance **12**, Appropriation Accounts **13**, "FA&AA data" **none** (counted again at the re-check).
- **The most recent Finance Accounts and Accounts at a Glance listed are for 2020-21.** The first pass found the same on
  the central CAG portal's West Bengal view ✅. As of 2026-10-20 nothing for 2021-22 or later is listed on either.
- "Not listed" is not the same as "not published" — see open questions.

### Accounting status ✅✅

- The Finance Accounts carry a **CAG certificate**: the accounts, "read with the explanatory 'Notes to Accounts'",
  "give a true and fair view" of the position and the receipts and disbursements for 2020-21 (printed page vii).
  Dated **10 DEC 2021**, New Delhi, signed for the Comptroller and Auditor General of India (printed page xi).
- The cover says they were **laid on the Table of the State Legislature on 25.03.2022** (PDF p.2).
- **"Audited" is not "free of caveats".** The certificate continues to printed page xi with numbered observations (for
  example about guarantees and off-budget liabilities). It also states that some statements were prepared directly
  from information supplied by the State Government and other bodies, who are responsible for its correctness —
  Statements 9, 17(b) and (c), 19(1) and 20, notes to Statement 14, and Appendices IV and IX. We must link to the
  certificate wherever we show an audited figure, and be careful which statements we draw from.
- Volume II's Appendix VI is explicitly headed "(UNAUDITED FIGURES)" ✅.
- The Accounts at a Glance says it is **not itself certified**: it is based on the certified accounts, which prevail in
  case of difference ✅.

### Units — two volumes, a factor of 100 apart ✅✅

| Document | Unit printed | Seen at |
| --- | --- | --- |
| Finance Accounts **Volume I** (statements 1–13, notes) | **(₹ in Crore)** | Statement 2, printed p.4 (PDF p.23) |
| Finance Accounts **Volume II** (statements 14–22, appendices) | **( ₹ in Lakh )** | Statement 15, printed p.129 (PDF p.50) |
| **Accounts at a Glance** | **(₹ in Crore)**, whole numbers | Highlights table, printed p.9 (PDF p.18) |

**Number-format trap:** in the Finance Accounts statement tables, commas fall after **every two digits** to the left of
the decimal point. *Illustration (not a real figure):* `12,34,56.78` means **123,456.78**, not 1,234,056.78 as normal
Indian lakh–crore grouping would suggest. Strip all commas before parsing, and never re-apply Indian grouping to a
printed value. The narrative text uses normal Indian grouping.

### "Total expenditure" is not one thing ✅✅

| Publication | How its "total expenditure" is defined (row labels as printed) |
| --- | --- |
| Monthly Key Indicators (see the MKI note) | "Total Expenditure (4+ 5)" = revenue + capital expenditure. **Loans and advances are a separate row.** |
| Accounts at a Glance 2020-21, highlights | "Total Expenditure (10 + 12 + 20)" = total revenue expenditure + total capital expenditure + **loans and advances** |
| Finance Accounts, Statement 2 | Revenue expenditure, capital expenditure, loans and advances disbursed, and repayment of public debt are **separate lines** |
| Finance Accounts, head-of-account coding (printed p.xiv) | Major heads 2011–3606 = revenue expenditure; 4046–7810 = capital expenditure **"including Public Debt, Loans and Advances"** |

So the same words mean different totals in different official documents. **The data model must store, with every total,
the list of components it adds up.**

### Net versus gross ✅✅

The guide (printed p.xiv) says Finance Accounts expenditure is shown **net of recoveries**, unlike the **Demands for
Grants and the Appropriation Accounts, where expenditure is gross**. Figures for the same head can therefore differ
legitimately between these documents.

### Layout ✅ (Vol I Statement 2, Vol II Statement 15 and the AAG highlights table ✅✅)

- **Volume I**, summary statements: 1 financial position · 2 receipts and disbursements · 3 receipts · 4 expenditure
  (**A. by function**, **B. by nature/object**) · 5 progressive capital expenditure · 6 borrowings · 7 loans and advances
  · … · 13 summary of balances · Notes to Accounts. Expenditure by function is by major-head description (no codes).
- **Volume II**, detail: statement 14 receipts and 15 revenue expenditure by minor head (columns: State Fund
  Expenditure, Central Assistance, Total, previous year, % change; charged expenditure in italics) · 16 capital
  expenditure · 17–22 borrowings, loans, investments, guarantees, funds. Appendices include **I salary by department**,
  **II subsidy**, **V schemes**, **X maintenance expenditure by grant (salary and non-salary)**.
- **No budget-estimate columns** in the Finance Accounts statements. The **Accounts at a Glance** has them: "Budget
  Estimate | Actuals | Percentage of actuals to B.E. | Percentage of actuals to GSDP" (✅✅), with five-year trends and a
  summary of the Appropriation Accounts.
- **No grant-wise statement** in the Finance Accounts; grant-wise accounts are the separate **Appropriation Accounts**
  (not yet inspected).

### Extraction hazards ✅✅ unless stated

- The 2020-21 Finance Accounts PDFs have a **glyph-encoded text layer**: most characters are stored 29 code points
  below their real value. Confirmed: the table-of-contents page reads `7DEOH^CRI^C&RQWHQWV` in the raw text, which is
  "Table of Contents" shifted by 29. The rupee sign and dashes cannot be recovered by the shift. The 2019-20 sample is
  mostly normal (5 of 109 pages affected) ✅; the Accounts at a Glance is clean.
- `pdftotext` mis-counts pages in these files (**541** reported for a 108-page document) because a closing bracket is
  encoded as the form-feed character. Use the PDF's real page count (108 / 722 / 64 — confirmed with a PDF library).
- Printed and PDF page numbers differ: Vol I body pages, PDF = printed + 19; Vol II, PDF = printed + 79 (confirmed on the
  pages examined).
- In Vol II, charged (italic) amounts sit on a separate line beneath the voted amount (seen on page 50).
- `pdftotext -layout` misaligns columns ✅ → extraction will need coordinate-based parsing, **plus rendering pages and
  looking at them** as a verification step. This is now possible: `pypdfium2` is installed in `ingestion/.venv`.
- Older files are large (four archive files exceed 80 MB) ✅; every listed file shows "(0.00 MB)" ✅✅.

## Open questions

1. Are Finance Accounts or Accounts at a Glance for **2021-22 and later** published anywhere official? Not on the
   regional A&E page or the central portal's West Bengal view (archive included) as of 2026-10-20 ✅.
2. Is the 2009-10 Finance Accounts item a mislink to the Accounts at a Glance file? (identical size and ETag) ✅
3. What is the empty "FA&AA data" tab for — possibly machine-readable data in future?
4. Appropriation Accounts (grant-wise gross expenditure) — not yet inspected.
5. Do the single-file older Finance Accounts contain both volumes? Not checked.
6. Can a font-aware extractor read the 2020-21 text layer correctly (the files contain `ToUnicode` maps)? Not tested.

## What this means for the project

- **Audited annual actuals from these sources currently reach 2020-21.** Milestone v0.4 ("audited vs provisional") can
  still be piloted on 2020-21 — the monthly archive contains that year's closing provisional edition — but newer years
  will have **no audited counterpart** unless newer accounts are found. We will say so on the site.
- Every total must carry its **component list**, and the site must never put an MKI "total expenditure" beside an
  Accounts-at-a-Glance one without saying they differ.
- Finance Accounts figures are **net**, Appropriation Accounts and budget figures **gross** — comparisons need a label.
- Extraction for these PDFs is a project of its own (encoded text, two-digit commas, lakh vs crore); budget it
  accordingly and verify visually.

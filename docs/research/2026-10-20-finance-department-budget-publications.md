# Research note — Finance Department, Government of West Bengal: 2026-27 budget publications

- **Date:** 2026-10-20
- **Question:** What are the budget publications — which period columns, units, accounting status and structure do they
  have — and which could feed (a) headline budget-versus-spending comparisons and (b) a department explorer?
- **Method:** I downloaded **8 of the 29 files** linked from the 2026-27 listing (seven general documents — BP-1, 3, 4, 5,
  6, 7, 9 — and one Demands for Grants volume, BP-11), checked sizes with `HEAD` first, hashed them, counted pages, scanned
  **every page's text** for unit statements and column headings, and **read the covers and sample data pages as rendered
  images**. The tools are in [`tools/`](tools/).
- **Evidence levels:** ✅ observed first-hand (text layer or counts) · 👁 also read from a rendered page image. This
  note has a **single observer**: no independent verifier has re-checked it yet (the multi-agent verifier was not
  available in this session).
- **No financial figures are quoted.** Number-format examples are marked *illustrative*; cross-check results are reported
  as verdicts only.

## Documents examined

All eight were retrieved from `https://finance.wb.gov.in/writereaddata/Budget_Publication/` on 2026-10-20 between 14:01
and 14:09 UTC (the server is slow — roughly 10 kB/s to 100 kB/s). Page counts from a PDF library.

| File | Printed title | Pages | Bytes | SHA-256 |
| --- | --- | --- | --- | --- |
| `2026_bp1-1.pdf` | 👁 Cover: "Annual Financial Statement of the Government of West Bengal 2026-2027". Heading inside: "Civil Budget Estimate for the Year 2026-2027 (General Abstract of Receipts and Expenditure)" | 91 | 645,133 | `65271497819cf4d77940d04987ad685261019ab0936cacc688b500647af7af4f` |
| `2026_bp3.pdf` | 👁 "Details of Department Wise Demands for Grants 2026-2027". Heading inside: "Details of Departmental Administrative Expenditure, State Development Schemes, … and Central Sector Schemes included in the Demands for Grants for the Financial Year 2026-2027" | 397 | 2,136,693 | `17faf86652141607a4540a393329e7baecb7c1b17b2bbf952ad6d628ec0209be` |
| `2026_bp4.pdf` | "Receipts under Consolidated Fund for the Year 2026-2027 and Explanatory Memorandum thereon under Revenue Account" | 521 | 2,038,071 | `555ec52847dc4e312e6acdb7c7e4c955fbcfe2608d495438c13582c7ca00a722` |
| `2026_bp5-Disb.pdf` | "Receipts and Disbursements under Contingency Fund and Public Account for 2026-2027 and Explanatory Memorandum thereon" | 277 | 1,068,855 | `9babedef273a44e37546efee2eb2b64d01a3e1ddafe701cf31dc2afbcb409a0b` |
| `2026_bp6.pdf` | "Statement showing the Guarantees given by the State Government and the Financial Trend of the State" | 22 | 776,473 | `98732c20a15ca227e90974325aef5908811a0a39a27644c10b18b3364408388c` |
| `2026_bp7.pdf` | "Statement showing the Financial Results of some important State Public Sector Undertakings/Corporations of Government involving transactions of commercial or semi-commercial nature for the year 2026-2027" | 63 | 849,209 | `d5a418e571592aa1c507721f606a213bf2571bc98389616f7735780a3123a418` |
| `2026_bp9-1.pdf` | "Budget at a Glance" (Statement - I …); a preface says it gives "a broad overview of the Budget of West Bengal for the year 2026-2027" | 32 | 3,650,584 | `67ee7b49af347b7d08c46e3fc2993ad31e934138543351ea0f6b4a5b6c87324f` |
| `2026_bp11.pdf` | 👁 "Detailed Demands for Grants for 2026-2027" (Budget Publication No. 11) | 261 | 978,684 | `1588b472fad0545e6cea569cb53d786cadf65c3894d948e7b742b4cc63a9a416` |

Not examined: BP-10 (39 MB), BP-12 to BP-31 (the other Demands volumes; BP-30 and BP-31 are 44 MB and 28 MB), the budget
speeches (16 and 35 MB), the fiscal policy statement (15 MB), the 2026-27 **interim** budget and every earlier year.

## Findings

### The 2026-27 set is dated June 2026 ✅👁

Every cover reads "June, 2026" and the PDFs were created on 2026-06-20 (file metadata). The listing page also offers a
separate "2026-2027 (Interim)" set, which we have **not** looked at.

### Which BP number is which ✅👁

The listing page's text order is ambiguous (titles and links alternate). The printed covers settle it: **each title
follows its own "BP-n" link** — BP-4, BP-5, BP-6 and BP-7 all match their covers. Two labels differ from the cover title:
BP-1 is called "Civil Budget Estimate" on the listing (the heading inside the document) but "Annual Financial Statement"
on its cover, and BP-3's listing label is "Departmental Expenditure". **The printed title is authoritative; store both.**
By position only (not examined): BP-9 "Budget at a Glance" ✅ (confirmed by its preface), BP-10 "Key to Budget Documents".

### Period columns, and what "Actual" is ✅

All the general documents show the **same four columns**: **Actual 2024-2025 · Budget Estimate 2025-2026 · Revised
Estimate 2025-2026 · Budget Estimate 2026-2027**. So *a budget for year Y shows actuals for year Y−2, the budget and
revised estimate for Y−1, and the budget estimate for Y.* The most recent year's actuals (2025-26) are not in the budget
documents.

**Accounting status of the "Actual" columns: not stated.** A search of every page of BP-1 and BP-9 (and BP-4) finds no
"provisional", "unaudited" or "audited" wording about them. We must label them **"not stated"** — not "audited" and not
"provisional".

### Units — at least five different ones ✅

| Document | Unit(s) printed | Where |
| --- | --- | --- |
| BP-1 | "All Figures are in Thousand of Rupees" | 19 pages (every statement page) |
| BP-3 | "Rupees in Thousand" 👁 | 355 pages |
| BP-4 | mostly "in thousand of rupees" (111 pages), **but also "in crore of rupees" / "(Rs in crore)" / "(` in crore)" on 10 pages** | mixed within one document |
| BP-5 | "in thousand of rupees" | 34 pages |
| BP-6 | **"rupees in crore" (14 pages) and "rupees in lakh" (6 pages)**; includes a long-run series back to 1947-48 | mixed within one document |
| BP-7 | "All figures are in thousands of rupees" | 58 pages |
| BP-9 | "(Rupees in crores)" | summary statements |
| BP-11 (Demands for Grants) | **whole rupees**, "Rs." 👁 | every table |

Together with the audited accounts (crore and lakh), official documents use **thousand, lakh, crore and whole rupees**.
A converter must take the unit **per table, not per document**.

### Number formats ✅ unless stated

- **BP-11** prints whole rupees with normal Indian grouping and shows actuals to the rupee, estimates rounded to the
  thousand 👁.
- **BP-3** prints no decimal point: on the page checked, the parts add up to the totals only if the **last two digits are
  decimals and commas fall every two digits** — *illustration (not a real figure):* `12,34,56` = 1,234.56 thousand
  rupees. This is inferred from arithmetic on **one page** 👁 and must be confirmed on more pages before we rely on it.
  Also on that page, the component rows sum to a grand total that differs from the printed one by a few hundredths — the
  kind of rounding gap our reconciliation tolerance must allow for.
- The covers and some headings are in Bengali set in a legacy font that does **not** extract as Unicode; English text
  extracts cleanly.

### Gross versus net ✅👁

The Demands for Grants show **Gross Expenditure**, then "Deduct – Recoveries", then **Net Expenditure**, split into Voted and
Charged. This matches the Finance Accounts guide: grants and appropriation accounts are gross, the Finance Accounts net.

### Two ways to slice spending by department ✅

- **BP-3 is organised by department** — **58 departments** in its index, each with a two-letter code — showing
  administrative expenditure, state development schemes, central-assistance and centrally sponsored schemes, salaries
  versus other than salaries, by major head 👁.
- **BP-11 onward are organised by Demand number (grant)** — e.g. "Demand No. 01", a name, then major, sub-major and minor
  heads, with Voted/Charged amounts 👁.

Neither document, as far as examined, states how departments map to demand numbers. **A documented, source-backed mapping
must be built (and may change between years)** before a department explorer can be trusted.

### The budget's actuals agree with the monthly closing figures ✅ (reproducible)

I compared the state-level **"Actuals 2024-2025"** in **BP-9** with the monthly report's **"MARCH(Sy), 2025"** edition (the closing
provisional position for 2024-25) using [`tools/compare_bp9_mki.py`](tools/compare_bp9_mki.py). Verdicts only:

| Row | Result |
| --- | --- |
| Revenue receipts | **match** within printed precision |
| Revenue expenditure | **match** |
| Capital expenditure (BP-9 general + social + economic services) | **match** within rounding of the three parts |
| Loans and advances | **match** |
| "Total expenditure", as each document defines it | **differ by 11.7 %** |
| That difference versus *(loans and advances + repayment of loans)* | **match — the difference is fully explained** |

So the budget documents' "Actuals" are, for these rows, **the same figures as the monthly closing provisional position**,
which suggests (but the documents do not say) that they come from the same unaudited provisional accounts.

### "Total expenditure" now has three definitions ✅👁

| Publication | Total expenditure = |
| --- | --- |
| Monthly Key Indicators | revenue expenditure + capital expenditure (**loans and advances excluded**) |
| Accounts at a Glance (annual) | revenue + capital + **loans and advances** |
| **Budget at a Glance (BP-9)** | revenue + capital, where the **capital block includes loans and advances and repayment of loans** |

### Extraction hazards

- Units change within documents (BP-4, BP-6) and between tables; decimal conventions differ (BP-3 vs BP-11).
- Dozens of volumes: BP-3 has 397 pages, BP-4 521, BP-5 277; some demand volumes are tens of megabytes.
- Every page has a text layer except a single page in each of BP-3, 4, 5, 7 and 11 (PDF page 3 in BP-3 and BP-11 — it
  looks blank) ✅.
- The Finance Department server is slow; downloads need patience, retries and politeness.

## Open questions

1. What is the accounting status of "Actual 2024-2025" in the budget documents? The values match the monthly closing
   figures, but nothing printed says "provisional" or "audited".
2. How do departments map to Demand numbers? Is the mapping stable from year to year?
3. What does the **interim** 2026-27 set contain, and how does it differ from the June 2026 set?
4. Is the BP-3 two-digit-decimal convention consistent across all 397 pages? Which pages of BP-4 and BP-6 use which unit?
5. Where are the actuals for the most recent completed year (2025-26) published, if anywhere, apart from the monthly report?
6. How do earlier years' sets compare (does the 4-column pattern hold back to 1999-2000)? Does the year-selector form post
   work with plain HTTP requests?

## What this means for the project

- **Budget estimates and revised estimates come from here** (BP-1, BP-9 for state totals; BP-3 and BP-11+ per department),
  in several units — conversion must be per table.
- A **"Budget vs actual so far"** comparison is possible: current-year BE (BP-9) against year-to-date spending (monthly
  report) — but only after reconciling the *definition* of total expenditure.
- **Previous-year actuals in budget documents can be cross-checked** against the monthly report's closing figures: a
  ready-made, automatic reconciliation test for the pipeline.
- Our status vocabulary needs a fourth value, **"not stated"** — added to the data dictionary and the site on the same day.

# Data dictionary

The meaning of every term the project uses — in the docs, the future database and the website. The website's
vocabulary in `web/src/lib/domain.ts` mirrors this file; change both together.

General definitions below follow standard Indian government accounting. Wherever a definition depends on how a
particular document presents its figures, the document's own wording wins and is cited in
[`SOURCE_INVENTORY.md`](SOURCE_INVENTORY.md). Nothing in this file is a financial figure.

---

## 1. Expenditure

**Plain English:** money paid out by the State Government, as recorded in its accounts.

| Term | Meaning | Notes for this project |
| --- | --- | --- |
| **Revenue expenditure** | Spending that does not create assets: salaries, pensions, interest payments, subsidies, grants, day-to-day running and maintenance. | Shown as its own headline measure. |
| **Capital expenditure** (capital outlay) | Spending that creates lasting assets, such as roads, buildings, irrigation works, and investments. | Shown as its own headline measure. |
| **Loans and advances** | Money the State lends (for example to local bodies, public undertakings or its employees). | Recorded separately from capital outlay in government accounts. Whether a document's "total expenditure" includes it is taken from that document's own rows — never assumed. |
| **Total expenditure** | The total printed by the source document. | We record the document's own definition (which rows it adds up) alongside the value. In the Monthly Key Indicators it is revenue + capital expenditure, **excluding** loans and advances; in the Accounts at a Glance it **includes** them; in the Budget at a Glance (BP-9) the capital block itself contains loans and advances **and repayment of loans**, so its total is larger still (see source notes below). **Never compare totals from different publications without checking their component lists.** |
| **Charged vs voted** | *Charged* expenditure (for example interest payments) does not need the Legislative Assembly's vote; *voted* expenditure is authorised through Demands for Grants. | Appropriation Accounts report the two separately. |
| **Gross vs net** | Gross expenditure is before deducting recoveries; net is after. | Always record which one the document prints. |

**Not expenditure:** transactions in the *Public Account* (for example provident-fund deposits and withdrawals) are
money the government holds on behalf of others. They are excluded from expenditure unless a document explicitly
treats them otherwise.

## 2. Financial year

- The Indian government financial year runs from **1 April to 31 March**.
- Written as **"2026-27"**, meaning 1 April 2026 to 31 March 2027. Stored as the starting calendar year (`2026`)
  plus the display label.
- Budget documents for a year can be presented in two stages in some years — an *interim budget / vote on account*
  followed by a full budget. Each document's own title says which it is; we record it.

## 3. Reporting period

The span of time a figure covers. Every figure has a `period_start`, a `period_end` and one of these period types:

| Period type | Covers | Example |
| --- | --- | --- |
| `month` | A single calendar month | June 2026 only |
| `year_to_date` | 1 April up to the end of a month (also called *cumulative* or *progressive*) | April–June 2026 |
| `full_year` | The complete financial year | 2025-26 |

A single-month figure that the source does not print directly can be **derived** as the difference between two
consecutive year-to-date figures. It is then labelled `derived` with its formula (see §8).

## 4. Kinds of figure

| Kind | Meaning | Accounting status |
| --- | --- | --- |
| **Budget estimate (BE)** | What the government plans to spend in a financial year, as presented in the budget. | Estimate |
| **Revised estimate (RE)** | An updated estimate for the current year, presented alongside the next year's budget. | Estimate |
| **Monthly actual** | Spending recorded for one month (published or derived). | Provisional |
| **Year-to-date actual** | Spending recorded from 1 April to the end of the reporting month. | Provisional |
| **Annual actual** | Spending for a complete year. Final figures come from the audited annual accounts. | Audited (when from the annual accounts) |

Budget documents also print "actuals". For a budget of year *Y* they show year *Y−2* (for example 2024-25 in the 2026-27
budget), with the budget estimate and revised estimate for *Y−1* and the budget estimate for *Y*. The documents do not
say how final those actuals are (status **not stated**), although for the state-level rows checked they equal the
monthly reports' closing provisional figures.

## 5. Accounting basis

How transactions are recognised in the accounts. Indian government accounts are generally kept on a **cash basis**
(a payment is recorded when it is made). The exact basis and any exceptions are taken from the notes in the annual
Finance Accounts — see the source inventory for what has been confirmed.

## 6. Accounting status

How final a figure is, **as stated by the source document** — never inferred by us.

| Status | Meaning |
| --- | --- |
| **Estimate** | A plan or forecast from budget documents — not money spent. |
| **Provisional** | Actual figures from monthly accounts that have not been audited yet and may be revised. |
| **Audited** | Final full-year accounts certified by the Comptroller and Auditor General of India (CAG). |
| **Not stated** | The document does not say how final its actual figures are — for example the "Actual" columns in the Finance Department's budget documents, which carry no "provisional" or "audited" wording. We record "not stated" and never fill the gap by guessing. |

## 7. Unit

- **Unit as printed:** exactly what the document says, e.g. "(₹ in crore)", "(Rupees in lakh)",
  "(In thousands of rupees)".
- **Normalised value:** the value converted to rupees using an explicit multiplier:

  | Unit | Multiplier to rupees |
  | --- | --- |
  | whole rupees ("Rs.") | 1 |
  | thousand | 1,000 |
  | lakh | 1,00,000 (100 thousand) |
  | crore | 1,00,00,000 (10 million = 100 lakh) |

- **The unit belongs to the table, not the document.** Some documents mix units (the Finance Accounts' two volumes; the
  Finance Department's BP-4 and BP-6). Record the unit for every table.

- **Display unit:** ₹ crore by default. Indian digit grouping is used for rupee amounts (1,00,000).
- **Rounding:** compute on unrounded values; round only when displaying, and state the rounding (for example
  "rounded to two decimal places").
- **Percentages:** computed from unrounded values; displayed to one decimal place.

## 8. Source reference (provenance)

Every stored figure keeps all of these:

| Field | Meaning |
| --- | --- |
| `publisher` | The issuing office, as printed. |
| `document_title` | The title as printed on the document. |
| `document_url` | Direct URL of the exact file. |
| `listing_url` | The official page that links to the file. |
| `retrieved_at` | When we downloaded it (UTC timestamp). |
| `sha256` | Fingerprint of the exact file, so anyone can confirm they have the same document. |
| `pdf_page` / `printed_page` | The PDF page index **and** the page number printed on the page (they often differ). |
| `table` | Table name or number as printed. |
| `row_label` / `column_label` | Exactly as printed. |
| `value_as_printed` | The value exactly as printed (text), before any conversion. |
| `derivation` | `published`, or `derived` plus the formula and the inputs it uses. |

## 9. Verification status

Our own check of a figure against its source. Separate from the accounting status.

| Status | Criteria |
| --- | --- |
| **Verified** | Automated reconciliation passed (components add up to the document's printed totals, within the document's printed precision) **and** a person compared the figure with the original page; the check is in the verification log. |
| **Not yet verified** | Extracted from an official document but not yet checked. Never presented as verified; never shown as a headline figure. |
| **Needs review** | A check failed or the source is unclear (for example a missing unit). Held back until resolved, with an open question recorded. |
| **Corrected** | A published figure was fixed; the old value, new value, reason and date remain visible. |

## 10. Planned record shape (v0.2)

Illustrative structure only — no real or sample values.

```text
figure
  id                    stable identifier
  measure               e.g. total_expenditure | revenue_expenditure | capital_expenditure | share_of_be_spent
  figure_kind           budget_estimate | revised_estimate | monthly_actual | year_to_date_actual | annual_actual
  financial_year        start year + label, e.g. 2026 / "2026-27"
  period_type           month | year_to_date | full_year
  period_start, period_end
  value_as_printed      text, exactly as printed
  unit_as_printed       text, exactly as printed
  value_rupees          number (normalised)
  accounting_status     estimate | provisional | audited | not_stated   (as stated by the source)
  verification_status   verified | unverified | needs_review | corrected
  source                → the provenance fields in §8
  verification_record   who checked, when, which page, outcome
```

## Source-specific notes

How each official document presents these concepts is recorded, with evidence, in
[`SOURCE_INVENTORY.md`](SOURCE_INVENTORY.md) and [`research/`](research/). Confirmed so far:

### Monthly Key Indicators (PAG (A&E) West Bengal) — verified 2026-10-20

| Concept | How the MKI presents it |
| --- | --- |
| Accounting status | Printed as "(UNAUDITED PROVISIONAL FIGURES)" → our status **Provisional**. |
| Unit | "(₹ in crore)", two decimals → multiplier 1,00,00,000. |
| Reporting period | Page 1: "Actuals upto *Month Year*" → **year-to-date** from 1 April. Trend pages: *Monthly* and *Progressive* (= year-to-date) values by month. |
| Budget comparison | "Budget Estimates *YYYY-YY*" of the same year only; **no Revised Estimates**. "% of Actual to Budget Estimates — Current" = actual ÷ BE × 100 (derived). |
| Revenue expenditure | Row 4 "Revenue Expenditure (a+b+c+d+e)", including interest, salaries/wages, pension and subsidy sub-rows. |
| Capital expenditure | Row 5 "Capital Expenditure (a+b)". |
| Total expenditure | Row 7 "Total Expenditure (4+ 5)" = revenue + capital expenditure. **Loans and advances are excluded** — they are row 8, "Loans and Advances Disbursed". |
| March | Two editions: "MARCH(P)" (trend row "March(Pre)") and a later "MARCH(Sy)" whose totals run to "March(Final)". Abbreviations not defined in the documents. |
| Department detail | None — state-level totals and sectors only. |

### Finance Accounts and Accounts at a Glance (PAG (A&E) West Bengal) — verified 2026-10-20 for 2020-21

| Concept | How these documents present it |
| --- | --- |
| Accounting status | Finance Accounts: CAG certificate ("true and fair view") → our status **Audited**; link the certificate's numbered observations wherever an audited figure is shown. The certificate names statements prepared from information supplied by the State Government (9, 17(b)–(c), 19(1), 20, notes to 14, Appendices IV and IX), so record which statement a figure comes from. Accounts at a Glance: based on the certified accounts, **not itself certified**; the certified accounts prevail if they differ. |
| Reporting period | Full financial year (year ending 31 March) — annual, not year-to-date. |
| Unit | Finance Accounts Volume I: "(₹ in Crore)". **Volume II: "(₹ in Lakh)" — 100 times smaller a unit.** Accounts at a Glance: "(₹ in Crore)", rounded to whole numbers. |
| Number format | Statement tables print commas after every two digits left of the decimal point (illustrative, not a real figure: `12,34,56.78` = 123,456.78). Strip all commas before parsing. |
| Total expenditure | Accounts at a Glance: total revenue + total capital expenditure + **loans and advances**. Finance Accounts show revenue expenditure, capital expenditure, loans and advances, and repayment of public debt as separate lines. Head-of-account coding: major heads 2011–3606 are revenue expenditure; 4046–7810 are capital expenditure "including Public Debt, Loans and Advances". |
| Net vs gross | Finance Accounts expenditure is **net of recoveries**; Appropriation Accounts and Demands for Grants are **gross**. |
| Budget comparison | Finance Accounts statements have no budget columns. The Accounts at a Glance compares actuals with Budget Estimates and with GSDP. |
| Latest year listed | 2020-21 (as of 2026-10-20). |

### Finance Department budget publications, 2026-27 (June 2026) — observed 2026-10-20 (single observer)

Evidence: [`research/2026-10-20-finance-department-budget-publications.md`](research/2026-10-20-finance-department-budget-publications.md).

| Concept | How these documents present it |
| --- | --- |
| Figure kinds and periods | Four columns throughout: **Actual 2024-2025**, **Budget Estimate 2025-2026**, **Revised Estimate 2025-2026**, **Budget Estimate 2026-2027**. |
| Accounting status | **Not stated** for the "Actual" columns — no "provisional" or "audited" wording. Estimates are estimates. |
| Unit | Per table: thousand of rupees (BP-1, BP-3, BP-4, BP-5, BP-7); crore (BP-9, and some BP-4 pages); crore **and** lakh (BP-6); **whole rupees** (Detailed Demands for Grants, BP-11 onward). |
| Number format | BP-11: whole rupees, normal Indian grouping. BP-3: no decimal point; on the page checked the last two digits behave as decimals with commas every two digits (illustrative: `12,34,56` = 1,234.56) — **to be confirmed on more pages**. |
| Total expenditure | Budget at a Glance: revenue + capital, where the capital block **includes loans and advances and repayment of loans**. For 2024-25 its actuals equal the monthly closing figures row by row, and its total exceeds the monthly report's total by exactly loans and advances plus repayment of loans. |
| Gross vs net | Demands for Grants are **gross**: Gross Expenditure, then "Deduct – Recoveries", then Net Expenditure; Voted and Charged shown separately. |
| Department vs grant | BP-3 is by **department** (58, each with a two-letter code); BP-11 onward are by **Demand number** (grant). The mapping between them is not stated in the documents examined and must be built. |

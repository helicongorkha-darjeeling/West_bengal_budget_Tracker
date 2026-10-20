# Evolution — what we knew then, what we know now, what comes next

Products that last improve in generations: each one is built on what the previous one taught. This file is that
story for the West Bengal Budget Tracker. For every generation we record:

- **Then** — what we believed, assumed or did not know before the work.
- **Now** — what we learned, with the evidence behind it.
- **Next** — what that makes possible, and the next question to answer.

Wrong assumptions and mistakes stay in the record — that is the point. Git history holds the exact changes; this file
holds the reasoning. The website's "How this tracker is evolving" section is the public summary.

---

## Generation 0.1 — Foundation (started 2026-10-20)

### Then

- An empty project folder: the brief (`Prompt_version.md`) and an empty `Goals.md` directory. No code, no Git history.
- We knew the addresses of two official sources, but not what they publish, how often, in what format or in what units.
- The brief warned: do not assume an API exists.
- We assumed the machine had every tool the planned stack needs (Node.js, Python, Git).

### Now

**About the sources (listing pages, verified 2026-10-20 — details in `SOURCE_INVENTORY.md`):**

- The Principal Accountant General (A&E), West Bengal lists **Monthly Key Indicators for 2021-22 to 2026-27**; the
  latest month listed is June 2026. Each completed year's **March appears twice — "March(Pre)" and "March(Sup)"**.
  Until the documents themselves explain the two stages, we treat them as two distinct reports and never add them up.
- The Finance Department offers budget documents for **28 budget years (1999-2000 to 2026-27)**, plus separate
  **interim** budgets for 2016-17, 2021-22 and 2026-27.
- Both sources publish **PDF files linked from web pages**; neither page shows an API. Some recent monthly reports
  also have Google Sheets links, which might be machine-readable — not yet confirmed.
- On the Finance Department page, the layout makes it ambiguous which title belongs to which document.
  **Lesson: the web page is not the document** — titles, units and periods must be read from the files themselves.

**About the monthly reports (documents, verified 2026-10-20 — details in `research/2026-10-20-monthly-key-indicators.md`):**

- Then: we did not know whether official monthly figures existed. Now: **Monthly Key Indicators exist from April
  2008 to June 2026**, printed as "(UNAUDITED PROVISIONAL FIGURES)", in "(₹ in crore)", year-to-date against the
  year's Budget Estimates.
- Then: we would have assumed "total expenditure" means all spending. Now: in these reports **"Total Expenditure"
  is revenue + capital expenditure; loans and advances are a separate row.** Every total we show must say what it
  includes.
- Then: we expected to parse PDFs. Now: recent reports also come as **downloadable spreadsheets** that mirror the PDF.
  Easier to extract — but a live file can change, so we will fingerprint our copy and reconcile it against the PDF.
- Then: one report per month. Now: **March appears twice**; the later "MARCH(Sy)" edition carries the year's closing
  provisional figures (its totals equal the "March(Final)" trend row). Never add the two together.
- Then: file names looked like reliable labels. Now: they are not (a file named "…23-24" is the April 2024 report);
  the printed title is the key.
- The monthly reports have **no department breakdown** — the department explorer will need other documents.

**About the budget documents (observed 2026-10-20, single observer — details in
`research/2026-10-20-finance-department-budget-publications.md`):**

- Then: the listing page's titles were ambiguous. Now: **each document's cover prints its own number and title**; the
  title follows its "BP-n" link, and BP-1's listing label ("Civil Budget Estimate") differs from its cover ("Annual
  Financial Statement"). The printed title is authoritative.
- Then: one set of period columns per document. Now: the **same four columns everywhere** — Actual for year Y−2, Budget
  and Revised Estimate for Y−1, Budget Estimate for Y. The latest completed year's actuals are not in the budget.
- Then: we hoped "Actual" would be labelled provisional or audited. Now: **it is not labelled at all** — we added a fourth
  status, "not stated".
- Then: units vary between documents. Now: they vary **between tables inside one document** (thousand, crore, lakh,
  whole rupees), and one table prints numbers with no decimal point.
- Then: we did not know whether the sources agree. Now: for 2024-25, the budget documents' "actuals" **match the monthly
  closing figures** for revenue receipts, revenue expenditure, capital expenditure and loans and advances; the two
  "total expenditure" figures differ by **exactly loans and advances plus repayment of loans** (a reproducible check in
  `docs/research/tools/`). That is our first genuine reconciliation between two official sources — and a ready-made test
  for the pipeline.
- Then: "department-wise" sounded like one breakdown. Now: there are **two** — by department (58, in BP-3) and by Demand
  number (grants, BP-11 onward) — with no stated mapping.

**About the annual accounts (documents, verified 2026-10-20 — details in
`research/2026-10-20-finance-accounts-and-accounts-at-a-glance.md`):**

- Then: we assumed audited annual accounts would be easy to find for recent years. Now: **the latest Finance Accounts
  listed are for 2020-21**, only in the Archive section; nothing for 2021-22 or later is listed. Recent monthly
  figures have no audited counterpart in these sources yet.
- Then: one unit per source. Now: **Finance Accounts Volume I is in crore and Volume II in lakh** — the same amount
  looks 100 times different depending on the volume.
- Then: a number's commas tell you its size. Now: the statement tables print **commas every two digits**, so reading
  them with normal Indian grouping is wrong by a large factor. We parse by stripping the commas.
- Then: "total expenditure" means one thing. Now: it means **different totals in different official publications**
  (loans and advances are included in one and excluded in another). Every total must carry its component list.
- Then: "audited" means "fully correct". Now: the CAG certificate comes with **numbered observations**, and some
  statements are prepared from the State Government's own information. We will link them wherever we show an audited
  number.
- Then: a PDF can be read as text. Now: some are stored with a **shifted character encoding** — extraction returns
  gibberish (the raw text for "Table" comes out as "7DEOH"). We will render pages as images and read them to verify.
- Then: the first-pass inspection could only read text. Now: with Python installed, **we can look at the pages as
  images**, which let us confirm units, dates and the certificate as printed. This is the biggest change in how we
  verify.

**About audit reports and an unofficial research file (documents, observed 2026-10-21, single observer — details in
`research/2026-10-21-cag-state-finances-audit-reports.md` and `research/2026-10-21-third-party-research-file-review.md`):**

- Then: we believed audited annual figures stopped at 2020-21. Now: the Accountant General (A&E) page lists nothing later,
  but the CAG's **State Finances Audit Reports** exist for every year up to **2024-25** — four of them tabled together on
  25 July 2026 — and their appendices carry Finance Accounts–based tables, grant-wise tables and the auditor's comments.
- Then: provisional monthly figures might change a lot once the year is certified. Now: for 2024-25, four main rows in the
  audit report agree with the monthly closing figures and the budget's "Actual" column within one crore — our first
  provisional-versus-audited comparison for a recent year (one year, four rows, whole-crore resolution).
- Then: "expenditure" in the accounts meant money used. Now: the CAG's report says transfers into deposit accounts are
  accounted for as expenditure when they leave the Consolidated Fund, and could overstate it if the money is not used in
  the year. We will say "reported" (booked) expenditure.
- Then: a balance and a year's spending can be compared. Now: a balance at a date (a **stock**) and an amount over a period
  (a **flow**) are different kinds of figure; an unofficial summary that compared them gave misleading ratios. We store and
  label them separately.
- Then: a research summary can be trusted if its numbers match. Now: most of its numbers did (46 of 58 checked), but a
  one-scheme amount was presented as a total, and strong words replaced the auditor's measured ones; its links also pointed
  at the wrong host although the documents were real. We keep the pointers and re-check every claim.
- Then: the audit reports would share one layout. Now: chapter and appendix numbers change every year, so each report needs
  its own mapping.

**About the tools:**

- Node.js 24, npm 11 and Git 2.55 were present; **Python was not** — the extraction pipeline had to wait for it.
  The owner installed **Python 3.15.0** later the same day. Our worry that a brand-new Python would lack prebuilt
  packages was tested rather than assumed: pandas, numpy, pdfplumber, openpyxl, pytest and pypdfium2 all installed as
  prebuilt wheels. A test environment in a very deep folder failed to load a library ("filename too long"), so the
  project environment lives at a short path (`ingestion/.venv`).
- npm 11 no longer runs packages' install scripts unless approved — a supply-chain protection that older tutorials
  will not mention.
- A headless browser inherits the operating system's dark theme, so our first "light mode" screenshots came out dark.
  We now set the colour scheme explicitly when testing.
- Smooth scrolling made screenshots of in-page links capture blank frames; we switched to full-page captures through
  the browser's DevTools protocol, plus an automated accessibility scan (axe-core).

**About the product:** a working Next.js 16 website that is honest about having no data yet — every value is "—",
and each section explains what will appear and where it will come from.

### Next

- Finish the document-level inspection: the Appropriation Accounts, the remaining budget volumes (BP-10, BP-12 to
  BP-31), the interim 2026-27 set, and a second observer's check of the budget-document and audit-report findings.
- **v0.2:** (Python is now installed) extract one Monthly Key Indicators report with a repeatable script (spreadsheet
  first, reconciled against the PDF); verify it by hand; publish four headline figures with full provenance.
- Question to answer next: how far do the closing provisional figures ("March(Sy)") differ from the audited-basis figures
  for the same year? A first answer exists for 2024-25 (four rows, within one crore); the 2020-21 Finance Accounts and
  the 2021-22 to 2023-24 audit reports extend it. And: do the Finance Accounts for 2021-22 onwards exist anywhere
  official?

---

## Future generations (planned)

| Generation | Theme | What should be true when it is done |
| --- | --- | --- |
| 0.2 | First verified report | One official monthly report extracted reproducibly, verified, and shown with source, page and status. |
| 0.3 | Monthly history | Every available monthly report stored in a database, charted month by month with a data table. |
| 0.4 | Audited accounts | Provisional versus audited figures side by side, from the Finance Accounts (2020-21) and the CAG's audit reports (2021-22 to 2024-25), showing how much the numbers moved after audit. |
| 0.5 | Department explorer | Grant-wise budgets and spending, mapped to departments with a documented, source-backed mapping. |
| 1.0 | Public launch | Bengali interface, accessibility audit, public corrections log, deployed. |
| Beyond | Open questions | Alerts when new reports appear? District-level spending, if official sources publish it? Downloadable verified datasets for researchers? Attributed audit notes? A per-person view? Each will be tested against our principles before it is built (see the roadmap backlog). |

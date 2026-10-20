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

**About the tools:**

- Node.js 24, npm 11 and Git 2.55 were present; **Python was not** — the extraction pipeline has to wait for it.
- npm 11 no longer runs packages' install scripts unless approved — a supply-chain protection that older tutorials
  will not mention.
- A headless browser inherits the operating system's dark theme, so our first "light mode" screenshots came out dark.
  We now set the colour scheme explicitly when testing.
- Smooth scrolling made screenshots of in-page links capture blank frames; we switched to full-page captures through
  the browser's DevTools protocol, plus an automated accessibility scan (axe-core).

**About the product:** a working Next.js 16 website that is honest about having no data yet — every value is "—",
and each section explains what will appear and where it will come from.

### Next

- Finish the document-level inspection: units, row and column structure, and the printed provisional/audited wording.
- **v0.2:** install Python; extract one Monthly Key Indicators report with a repeatable script; reconcile its totals;
  verify it by hand; publish four headline figures with full provenance.
- Question to answer next: when both "March(Pre)" and "March(Sup)" exist, which one is the year's closing
  provisional figure — and how far does it differ from the audited Finance Accounts?

---

## Future generations (planned)

| Generation | Theme | What should be true when it is done |
| --- | --- | --- |
| 0.2 | First verified report | One official monthly report extracted reproducibly, verified, and shown with source, page and status. |
| 0.3 | Monthly history | Every available monthly report stored in a database, charted month by month with a data table. |
| 0.4 | Audited accounts | Provisional versus audited figures side by side, showing how much the numbers moved after audit. |
| 0.5 | Department explorer | Grant-wise budgets and spending, mapped to departments with a documented, source-backed mapping. |
| 1.0 | Public launch | Bengali interface, accessibility audit, public corrections log, deployed. |
| Beyond | Open questions | Alerts when new reports appear? District-level spending, if official sources publish it? Downloadable verified datasets for researchers? Each will be tested against our principles before it is built. |

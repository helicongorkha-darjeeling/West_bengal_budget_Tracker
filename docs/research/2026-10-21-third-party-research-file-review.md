# Research note — Review of an unofficial research file (portals, off-budget flows, fiscal relationships)

- **Date:** 2026-10-21 (IST). Link checks on 2026-10-20 at 19:21–19:23 UTC; documents downloaded between 19:22 and 19:37 UTC.
- **What it is:** a Markdown file named "West Bengal Budget Portal & Fiscal Flow Research.md", 446,069 bytes, 236 lines,
  SHA-256 `28e9de1a077c33453726e54fd7e3d4ed0f74a35fbeb88cfdb5e0bb604b1fbe94`. Supplied by the owner; produced by an AI
  research tool (per the owner); unsigned and undated. Lines 1–177 are prose, lines 178–228 are a "Works cited" list of 49
  numbered citations, and the rest is four embedded chart images (about 370 kB of encoded image data). It is **not an
  official source** (rule 1 in `CLAUDE.md`); it can only suggest where to look.
- **Question:** which parts help this project, and which of its claims survive a check against the official documents?
- **Method:** read all of the text; extracted its 49 citations with a script; asked the official and analysis hosts whether
  its links respond (headers only); downloaded the CAG documents it cites and searched them for the figures and phrases it
  attributes to them; compared its wording with the documents' wording. Details of the CAG documents are in
  [`2026-10-21-cag-state-finances-audit-reports.md`](2026-10-21-cag-state-finances-audit-reports.md).
- **Evidence levels:** ✅ observed first-hand. **Single observer** — nobody has re-checked this note yet.
- **The file's figures are not repeated here.** Claims are described in words with the page where the official text can be
  read.

## What the file contains

1. **Portal architecture** — the state's integrated financial management system (nine modules), who can see what, the
   e-procurement portal. Its sources are an app-store listing, a payment-system training deck on a college website, a
   blog, a document-sharing site, a social-media post and a video; no document from the Finance Department itself.
2. **Audit findings and fiscal analysis** — items attributed to the CAG's State Finances Audit Reports (balances in
   personal deposit accounts, outstanding utilisation certificates, abstract contingent bills, classification of
   spending, cess not transferred, central funds sent directly to implementing agencies), then a macro-fiscal section
   (population, GSDP, receipts, expenditure, deficits, debt) drawn mostly from independent budget analyses and
   non-official pages.
3. **"Functional website copy" for a proposed "WB-DOGE (Department of Government Efficiency — West Bengal)" site** — live
   "clocks", a feed of "dispatches", a "wall of receipts", per-resident and per-household "burden" figures, and a "payment
   kill-switch" reform protocol. It copies the format of a US federal initiative, cites a US Government Accountability
   Office report as the standard it "complies with", and proposes a domain under the state government's own `gov.in`
   namespace.

## The 49 citations

| Kind | Count |
| --- | --- |
| CAG report documents and pages (`cag.gov.in`) | 7 |
| Other Government of India bodies (Department of Economic Affairs, NITI Aayog, the Finance Commission) | 3 |
| A page on a state government portal (tender listing) | 1 |
| Independent research institutes (PRS Legislative Research ×6, CBGA ×1) | 7 |
| US federal pages (`doge.gov` ×2, `gao.gov` ×2) | 4 |
| Document-sharing site (Scribd) | 6 |
| Files on college, university and state-company websites (a training deck, tender notices) | 6 |
| Blogs, job and tender-aggregator sites, social media, video, app store, encyclopaedia (one in Mongolian), news, a "debt clock" site | 15 |

**Do the links work?** 20 of the 49 were tested, plus four web addresses of portals (headers only, one request each):

| Result | Count | Which |
| --- | --- | --- |
| HTTP 200 | 15 | the two CAG report pages, all six PRS links, the CBGA PDF, the NITI Aayog and Finance Commission PDFs, the DEA page, `finance.wb.gov.in`, `wbifms.gov.in` (only after a retry asking for the first byte), `wbtenders.gov.in` |
| **HTTP 404** | **4** | **all four direct CAG file addresses** (`cag.gov.in/uploads/…`, `cag.gov.in/webroot/uploads/…`) |
| HTTP 403 | 2 | `doge.gov` (refused our request) |
| no answer | 3 | both `gao.gov` hosts (the name did not resolve through this machine's DNS; a public resolver does resolve it — so the report cited as a standard was **not verified**, not shown to be absent), and `wbfin.nic.in` (timed out after 15 s, tried once) |

The four 404s are an **address error, not missing documents**: the same file names exist on the CAG's delivery host
(`d7i5wg8xwe4hf.cloudfront.net/uploads/download_audit_report/…`) and download normally. The other 29 citations were not tested (mostly non-official hosts;
one address with a session parameter and one mangled address were skipped).

## Claims checked against the CAG documents

The file attributes figures to three CAG chapters: the State Finances Audit Reports for 2023-24 (Chapter 4), 2022-23
(Chapter IV) and 2021-22 (Chapter II). **58 numbers** were searched for in the cited chapter:

| Outcome | Numbers |
| --- | --- |
| Printed in the cited chapter, counting what the file says it counts | **46** |
| Printed, but describing something **narrower** than the file says | 5 |
| Printed in the **previous year's** report (cited loosely) | 1 |
| **Sums the file computed itself** from printed parts | 4 |
| Not found in the cited chapter | 2 |

Other checks that passed: the treasury-rule numbers it cites; the existence of "Appendix VI of Volume II" of the Finance
Accounts for central funds sent directly to implementing agencies; the dissolution date of the 16th Assembly; the two audit
reports that mention unrecovered penalties from health-insurance companies (Report No. 5 of 2021, contents page;
Report No. 5 of 2025, executive summary); and the statement that Report No. 5 of 2025 was tabled in July 2026 (25 July).

**Errors and misreadings found** (each can be re-checked in the cited chapter):

1. **Direct central transfers.** The file presents four yearly amounts as the total of funds sent directly to state
   implementing agencies. In the CAG text those four amounts belong to **one scheme** (a food subsidy under the National
   Food Security Act; Chapter 4, PDF page 4, footnote). The report's own table of totals (Table 4.1, PDF page 3) is between
   about three and thirty times larger in each of those years.
2. **Stocks mixed with flows.** The file compares the outstanding balance of utilisation certificates — a multi-year
   cumulative balance — with one year's revenue expenditure ("roughly 95 %"), and its "annual flow" tile adds one year's
   closing balance in deposit accounts to spending booked under a residual head that year, a cess amount from the next
   year and unadjusted advances. Different years and different kinds of figure cannot be added (decision D-021).
3. **A stronger claim than the report's.** The report says the certificates were "not received by AG (A&E) and pending
   reconciliation… as per the records of AG (A&E), which is pending reconciliation"; the file says there is "zero proof of
   end-use".
4. **Not the latest figure.** The file quotes the 2022-23 closing balance of deposit accounts as the current one, although
   the 2023-24 chapter it cites (and the 2024-25 report, which it does not mention) gives later ones.
5. **Out of date and partly derived.** It is built on the 2025-26 Budget Estimates, with a "FY26 end" debt clock, although
   the 2026-27 budget (with 2025-26 revised estimates) and monthly accounts to June 2026 were already published; one column
   is labelled "RE Derived", meaning values the file computed.

**Wording.** The file's conclusions are stronger than the documents' sentences:

| The file | The CAG report |
| --- | --- |
| "refused to furnish" breakups "despite formal audit requisitions" | details "were not furnished to Audit by the State Government, though called for" |
| "fraudulently showed" advances as "adjusted"; "fictitious" | a heading "Irregular adjustments of AC bills"; advances "were shown adjusted … merely by transferring the amount into the PL Account" |
| "illegally retained" constituency-development funds | "retention of unutilised BEUP funds … even after its dissolution"; the funds "were to have been refunded to the Government Account by 31 March 2022" |
| "astonishing backlog", "massive black box" | certificates "were outstanding"; "as per the records of AG (A&E), which is pending reconciliation" |

In fairness, the auditor itself sometimes uses evaluative language (a transfer "indicative of an attempt to circumvent the
lapsing of budget provision"). The rule that follows is **quote and attribute, never strengthen** (decision D-019).

## What we take, what we defer, what we do not use

**Taken (after checking):**

- The pointer to the **CAG State Finances Audit Reports** — the most useful item. Inspected; see the companion note. They
  extend audited-basis figures to 2024-25 and carry the grant-wise tables and the official comments on the accounts.
- The **topics** audit reports raise about reading "expenditure" — deposit-account transfers, classification between
  revenue and capital, funds outside the state treasury, outstanding certificates — as a list of caveats for a future
  "reading these numbers" note, each to be sourced from the report paragraph.
- The **stock-versus-flow** lesson (D-021) and the reminder that denominators such as GSDP carry their own status.

**Deferred** (kept in the roadmap backlog with their prerequisites): an attributed audit-notes panel, balance ("stock")
measures, a per-person view, ratios to GSDP, the structure of spending (salaries, pensions, interest), a procurement layer,
a cross-check against central releases.

**Not used** (decision D-020, D-022):

- The **"WB-DOGE" concept** — political neutrality; a scope of reporting what official documents state, not prescribing
  reforms; and a name and domain that could be mistaken for a government body.
- **Clocks, "burden" figures and projections** — they need forecasts and population denominators we have not inspected.
- **Policy prescriptions** and the "kill-switch" protocol.
- **The macro-fiscal tables** — drawn from secondary sources; the official documents carry the same series.
- **The portal-architecture claims** — sourced from non-authoritative pages; the state's transaction systems sit behind
  logins and are out of scope. We confirmed only that `wbifms.gov.in` and `wbtenders.gov.in` respond.

## Not verified

The portal and procurement claims; the demographic and economic figures; "industrial units shut down"; any claim whose
only source is a non-official page; the cited US report; whether `wbfin.nic.in` is still the Finance Department's address
(the working address is `finance.wb.gov.in`).

## How to repeat the checks

Citations: parse the numbered list at the end of the file. Links: one `HEAD` request per address. Claims: download the
three chapters from the delivery host (names in the companion note, hashes there too), dump each page's text, and search
for each number the file attributes to the chapter. The helper scripts used were throwaway and are not committed; the
method is simple enough to redo, and the documents are identified by SHA-256.

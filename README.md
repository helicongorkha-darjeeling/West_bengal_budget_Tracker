# West Bengal Budget Tracker

**Public money. Verifiable facts. Clear answers.**

A public website that will track the actual expenditure reported by the Government of West Bengal, India — using
official government publications only — and make it understandable to ordinary citizens.

> **Status: v0.1 Foundation.** The website skeleton, project rules and a first inspection of the official sources
> exist. **No financial figures have been imported or published yet**, and the dashboard deliberately shows empty
> values rather than samples.

## Run the website locally

You need [Node.js](https://nodejs.org) 20.9 or newer (`node --version` to check).

```bash
cd web
npm install        # first time only
npm run dev
```

Then open **http://localhost:3000** in your browser. Stop the server with `Ctrl + C`.

To check the code: `npm run check` (lint + type-check + production build) inside `web/`.

## What is in this repository

| Path | Purpose |
| --- | --- |
| `web/` | The public website (Next.js, TypeScript, Tailwind CSS). Read-only; holds no secrets. |
| `ingestion/` | The trusted data pipeline (Python) that will turn official documents into verified data. Not built yet. |
| `docs/` | Roadmap, project log, decisions, source inventory, data dictionary, evolution record and research notes. |
| `CLAUDE.md` | Standing project rules: mission, architecture, data-integrity and security rules, conventions, working process. |
| `Prompt_version.md` | The original project brief. |

## Official sources

| Publisher | Page | Used for |
| --- | --- | --- |
| Finance Department, Government of West Bengal | [Budget Speech & Publications](https://finance.wb.gov.in/Fin_New/Pages/Budget_Publication.aspx) | Budget Estimates, Revised Estimates, earlier years' actuals |
| Office of the Principal Accountant General (A&E), West Bengal (CAG of India) | [State Accounts Report](https://cag.gov.in/ae/west-bengal/en/state-accounts-report) | Monthly Key Indicators; annual Finance and Appropriation Accounts |
| Office of the Principal Accountant General (Audit-I), West Bengal (CAG of India) | [Audit Reports](https://cag.gov.in/ag1/west-bengal/en/audit-report) | State Finances Audit Reports: audited-basis annual tables, grant-wise tables, the auditor's comments |

What we have inspected, and what still needs investigation, is recorded in
[`docs/SOURCE_INVENTORY.md`](docs/SOURCE_INVENTORY.md).

## How a figure will get onto the site

1. **Collect** the official document, recording its URL, retrieval date and SHA-256 fingerprint.
2. **Extract** its tables with a repeatable script, keeping unit, period and page for every number.
3. **Check** that totals reconcile, then have a person compare the figures with the original page.
4. **Publish** each figure with its source, page, unit, period, accounting status and verification status.
5. **Correct openly** — old value, new value and reason stay visible.

Definitions of every term are in [`docs/DATA_DICTIONARY.md`](docs/DATA_DICTIONARY.md).

## Principles

Truth before appearance · Evidence before conclusions · Transparency about uncertainty · Political neutrality ·
Reproducible calculations · Corrections without hiding mistakes · Simplicity for citizens, with sufficient detail for
researchers · Working software before ambitious features.

## Documentation

- [Roadmap](docs/ROADMAP.md) — milestones with measurable exit criteria
- [Project log](docs/PROJECT_LOG.md) — what was actually done, commands, test results, failures
- [Decisions](docs/DECISIONS.md) — why things are the way they are
- [Source inventory](docs/SOURCE_INVENTORY.md) — official sources: inspected vs still to investigate
- [Data dictionary](docs/DATA_DICTIONARY.md) — expenditure, financial year, reporting period, units, statuses
- [Evolution](docs/EVOLUTION.md) — what we knew then, what we know now, what comes next

## Disclaimer

This is not an official website of the Government of West Bengal or the Comptroller and Auditor General of India.

## Licence

The code in this repository is released under the [MIT Licence](LICENSE). How derived datasets will be licensed, and
what reuse terms the official publications themselves allow, is still an open question — see
[`docs/DECISIONS.md`](docs/DECISIONS.md).

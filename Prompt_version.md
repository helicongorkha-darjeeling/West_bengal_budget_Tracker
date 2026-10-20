# PROJECT INITIALIZATION — WEST BENGAL BUDGET TRACKER

You are my senior software engineer, data engineer, technical mentor and project architect.

We are building a public website that tracks actual expenditure reported by the Government of West Bengal, India, using official government publications.

This is a long-term project. We will build it incrementally, verify every important result and improve it over time. I am learning through building, so explain important decisions in plain English without overwhelming me with unnecessary theory.

## OUR MISSION

Make public expenditure understandable to ordinary citizens.

Our guiding statement is:

"Public money. Verifiable facts. Clear answers."

Our principles:

1. Truth before appearance.
2. Evidence before conclusions.
3. Transparency about uncertainty.
4. Political neutrality.
5. Reproducible calculations.
6. Corrections without hiding mistakes.
7. Simplicity for citizens, with sufficient detail for researchers.
8. Working software before ambitious features.

If we cannot verify a financial figure, do not publish it as verified.

## OFFICIAL DATA SOURCES

Begin with these sources:

West Bengal Finance Department:
https://finance.wb.gov.in/Fin_New/Pages/Budget_Publication.aspx

Principal Accountant General (A&E), West Bengal / CAG:
https://cag.gov.in/ae/west-bengal/en/state-accounts-report

Use official government publications as the authoritative source for the data we import.

Inspect the available publications and identify the actual expenditure reports, their reporting periods, accounting status, units and table structures.

Do not assume an API exists. Do not fabricate data, source URLs, document contents, department totals or verification results.

Distinguish monthly expenditure, cumulative expenditure, annual actual expenditure, budget estimates and revised estimates.

## TECHNICAL DIRECTION

Preferred stack:

- Next.js App Router
- TypeScript in strict mode
- Tailwind CSS
- Recharts
- Supabase PostgreSQL
- Python, pandas and pdfplumber for data extraction
- Git for version control
- Vercel for deployment when the MVP is ready

Keep the public website separate from the trusted data-ingestion process.

Do not add unnecessary frameworks, services or paid dependencies. Inspect the available environment and recommend the simplest suitable setup.

Do not expose database write credentials, service-role keys or other secrets in browser code.

## YOUR FIRST ASSIGNMENT: FOUNDATION ONLY

Do not attempt to build the entire product immediately.

### Step 1: Inspect

- Inspect the existing project directory.
- Check the available Node.js, npm, Python and Git versions.
- Identify whether this is a new project or an existing codebase.
- Preserve existing work.
- Do not delete files, reset repositories or run destructive commands.

### Step 2: Create our permanent project instructions

Create a root-level CLAUDE.md containing the mission, architecture, financial-data integrity rules, security rules, coding conventions, testing expectations and incremental working process.

This file must serve as persistent project guidance for future Claude Code sessions.

Create these documentation files:

- README.md
- docs/ROADMAP.md
- docs/PROJECT_LOG.md
- docs/DECISIONS.md
- docs/SOURCE_INVENTORY.md
- docs/DATA_DICTIONARY.md

The roadmap should define measurable milestones.

The project log should record what was actually completed, the commands run, tests performed, failures encountered and the next step.

The source inventory must distinguish inspected and verified sources from sources that still require investigation.

The data dictionary should define expenditure, financial year, reporting period, accounting basis, unit, source reference and verification status.

### Step 3: Establish the first working application

If the environment is suitable, scaffold a minimal Next.js application using TypeScript and Tailwind CSS.

Create an initial, responsive dashboard page titled "West Bengal Budget Tracker".

Include:

- A clear project mission.
- Empty expenditure metrics.
- A reporting-period section.
- An expenditure chart placeholder.
- A department explorer placeholder.
- A methodology and source-transparency section.
- An informative empty state explaining that verified data has not yet been imported.

Use a clean, credible civic-data design.

Do not populate the interface with fake financial values, fake departments or simulated official statistics.

Do not connect Supabase, implement PDF scraping or add AI features during this initial foundation milestone.

### Step 4: Verify the application

Install only necessary dependencies.

Run the available linting, type-checking and build commands. Fix any errors caused by your changes.

Tell me how to start the website locally and how to open it in my browser.

If an installation or configuration step requires my action, explain it clearly instead of pretending it succeeded.

### Step 5: Report honestly

At the end, tell me:

1. What files you created.
2. What the application can currently do.
3. What you tested and the actual results.
4. What remains incomplete.
5. What decisions you made and why.
6. The next single milestone we should tackle.

Update the project log with the actual results.

Do not claim that a source was inspected, data was verified, or a test passed unless you performed that work.

## WORKING AGREEMENT

Work in small, understandable steps.

Prefer simple solutions that are easy to maintain.

Do not rewrite working components unnecessarily.

Before significant changes, explain the intended change and potential risks.

After each milestone, leave the project in a working state whenever possible.

Never hide errors behind placeholder success messages.

Start by inspecting the workspace and establishing the foundation. Do not jump ahead to the entire roadmap.

And keep evolving and researching, R&D its important that to show how did we learn what was then and what was now kinda thing like tesla evolved from roadster first that went to space and now the flying roadster recently and what will happen in the future.
/**
 * The public work log: a dated, plain-English summary of each working session.
 * Mirrors docs/PROJECT_LOG.md, which holds the full detail (commands, hashes,
 * every failure). Add an entry here whenever one is added there. Newest first.
 * Checks list only what was actually run, with the real result.
 */

export interface WorkCheck {
  name: string;
  result: string;
}

export interface WorkLogEntry {
  /** ISO date (YYYY-MM-DD) the session started. */
  date: string;
  title: string;
  milestone: string;
  done: string[];
  checks: WorkCheck[];
  /** What went wrong or was corrected. Kept visible on purpose. */
  problems: string[];
  next: string;
}

export const WORK_LOG: readonly WorkLogEntry[] = [
  {
    date: "2026-10-28",
    title: "Session 4: a checkable calculator, this work log, and the project’s goal",
    milestone: "v0.1 Foundation",
    done: [
      "Added the budget calculator: unit conversion, share of a total, change, a month from year-to-date totals, and a check that printed parts add up to the printed total. It uses exact decimal arithmetic and shows its formula and working.",
      "Put the work log on the site, so the dates and results of every session are public.",
      "Wrote down the project’s goal, what success looks like, and the road ahead.",
      "Added automated unit tests for the calculator (the first in the project).",
    ],
    checks: [
      { name: "Calculator unit tests", result: "17 of 17 pass" },
      { name: "Lint, type-check, tests and production build (npm run check)", result: "Passed" },
      { name: "Accessibility scan (axe-core), phone and desktop, light and dark", result: "No violations" },
    ],
    problems: [
      "One expected value in the first draft of the tests was wrong (12,345 thousand is 1.2345 crore, not 0.12345). The test caught it; the test was corrected, not the code.",
    ],
    next: "Decide whether to finish v0.1’s remaining source checks or start v0.2, the first verified report.",
  },
  {
    date: "2026-10-21",
    title: "Session 3: reviewing an unofficial research file; the CAG’s audit reports",
    milestone: "v0.1 Foundation",
    done: [
      "Read an AI-generated research file in full and used it for leads only.",
      "Found and inspected the CAG’s State Finances Audit Reports, which cover every year up to 2024-25.",
      "Added the audit reports as a third official source on the site.",
    ],
    checks: [
      { name: "Numbers in the file checked against the CAG chapters it cites", result: "46 of 58 printed as claimed; the rest narrower, from another year, computed by the file, or not found" },
      { name: "2024-25 cross-check: budget actuals, monthly closing report and audit report", result: "Four main rows agree within one crore" },
      { name: "npm run check", result: "Passed" },
      { name: "Scan of the page for money-like numbers", result: "None found" },
      { name: "Accessibility scan, four set-ups", result: "No violations" },
    ],
    problems: [
      "A first mapping of report links was shifted by one place; corrected from each report’s own page.",
      "The first cross-check used too tight a rounding allowance and flagged a false difference; the allowance was set to one crore and the check re-run.",
    ],
    next: "Finish v0.1’s source checks, or start v0.2.",
  },
  {
    date: "2026-10-20",
    title: "Session 2: Python, and the budget documents and annual accounts",
    milestone: "v0.1 Foundation",
    done: [
      "Python 3.15 installed by the owner; the data tools installed and import-tested.",
      "Inspected the 2020-21 Finance Accounts and Accounts at a Glance, and 8 of the 29 budget documents for 2026-27.",
      "Added the accounting status “not stated” for actuals whose status the document does not give.",
    ],
    checks: [
      { name: "Budget actuals vs the monthly closing report, 2024-25", result: "Main rows match; the totals differ by exactly the loans items, as their definitions predict" },
      { name: "npm run check", result: "Passed" },
      { name: "Accessibility scan, four set-ups", result: "No violations" },
    ],
    problems: [
      "The comparison script first read the wrong table and reported a huge difference; the parser was fixed.",
      "A unit scan produced a false year label; it was recognised and discarded.",
    ],
    next: "Finish the source inspection, or start v0.2.",
  },
  {
    date: "2026-10-20",
    title: "Session 1: the foundation",
    milestone: "v0.1 Foundation",
    done: [
      "Inspected the workspace and tools; created the project rules and documentation.",
      "Built this website with empty values and no sample figures.",
      "Inspected the official listing pages and the Monthly Key Indicators reports.",
    ],
    checks: [
      { name: "Lint, type-check and build", result: "Passed" },
      { name: "Colour contrast of every colour pair", result: "All pass WCAG AA in light and dark" },
      { name: "Accessibility scan, four set-ups", result: "One moderate issue, fixed; then no violations" },
    ],
    problems: [
      "Python was not installed yet, so the data pipeline had to wait.",
      "The first “light mode” screenshots came out dark because the test browser followed the system theme.",
    ],
    next: "Record the document inspection, then start v0.2.",
  },
];

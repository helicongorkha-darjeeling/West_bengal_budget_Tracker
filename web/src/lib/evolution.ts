/**
 * The project's public evolution record: what we knew then, what we know now,
 * and what comes next. Mirrors docs/ROADMAP.md and docs/EVOLUTION.md — update
 * all three together when a milestone changes.
 */

export type MilestoneState = "done" | "current" | "next" | "planned";

export interface Milestone {
  version: string;
  title: string;
  state: MilestoneState;
  summary: string;
}

export const MILESTONES: readonly Milestone[] = [
  {
    version: "0.1",
    title: "Foundation",
    state: "current",
    summary:
      "Project rules and documentation, a first evidence-backed inspection of the official sources, and this deliberately empty dashboard.",
  },
  {
    version: "0.2",
    title: "First verified report",
    state: "next",
    summary:
      "Extract one official monthly report with a repeatable script, reconcile its totals, and publish its state-level figures with source, page, unit and status.",
  },
  {
    version: "0.3",
    title: "Monthly history in a database",
    state: "planned",
    summary:
      "Store every imported report so spending can be followed month by month, with a chart and a matching data table.",
  },
  {
    version: "0.4",
    title: "Audited annual accounts",
    state: "planned",
    summary:
      "Add audited full-year figures and show how much the provisional monthly numbers changed after audit.",
  },
  {
    version: "0.5",
    title: "Department explorer",
    state: "planned",
    summary: "Department-wise spending compared with the budget, from official grant-wise documents.",
  },
  {
    version: "1.0",
    title: "Public launch",
    state: "planned",
    summary: "Bengali language, an accessibility audit, a public corrections log, and deployment.",
  },
];

export interface Learning {
  then: string;
  now: string;
}

/** What changed in our understanding during the current milestone. Evidence lives in docs/research/. */
export const CURRENT_LEARNINGS: readonly Learning[] = [
  {
    then: "We did not know whether official monthly spending figures were published, or in what form.",
    now: "The Principal Accountant General (A&E), West Bengal has published Monthly Key Indicators since April 2008: year-to-date figures in ₹ crore, printed as “unaudited provisional figures”.",
  },
  {
    then: "We assumed a “total expenditure” figure meant all spending.",
    now: "In the monthly report it means revenue plus capital expenditure; loans and advances are reported separately. Every total must say what it includes.",
  },
  {
    then: "We expected to extract every figure from PDF files.",
    now: "Recent monthly reports are also published as downloadable spreadsheets with the same figures. Because a live spreadsheet can change, we will keep a fingerprinted copy and check it against the PDF.",
  },
  {
    then: "We expected one report per month.",
    now: "March is reported twice — an early “March(P)” and a later “March(Sy)” that closes the year — so the two must never be added together.",
  },
];

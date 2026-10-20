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
    now: "In the monthly report it means revenue plus capital expenditure; in the annual Accounts at a Glance it also includes loans and advances; in the budget documents it also includes the repayment of loans. Every total must say what it includes.",
  },
  {
    then: "We expected audited yearly accounts to be available for recent years.",
    now: "The latest audited annual accounts listed by the Accountant General are for 2020-21. For later years we can show provisional monthly figures only, and we will say so.",
  },
  {
    then: "We expected every number to be printed in the same unit.",
    now: "Official documents use whole rupees, thousands, lakh and crore, sometimes inside a single document, so the same amount can look a hundred or even a thousand times different. We record each table’s unit and convert only with tested code.",
  },
  {
    then: "We did not know whether different official documents would agree with each other.",
    now: "For 2024-25, the budget documents’ “actual” figures match the monthly reports’ closing figures for the main state-level rows once the definitions are lined up. That gives us an automatic cross-check.",
  },
  {
    then: "We assumed budget documents say whether their “actual” figures are audited.",
    now: "They do not say. We label them “not stated” rather than guess.",
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

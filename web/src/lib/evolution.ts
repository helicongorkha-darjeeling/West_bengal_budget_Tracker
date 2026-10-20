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

/** What changed in our understanding during the current milestone. Evidence lives in docs/. */
export const CURRENT_LEARNINGS: readonly Learning[] = [];

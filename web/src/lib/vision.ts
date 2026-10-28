/**
 * The project's goal and long-term direction, as shown on the site. The
 * reasoning, and the other drafts considered, are in docs/VISION.md. The
 * horizons must agree with docs/ROADMAP.md. No financial figures here.
 */

export const GOAL =
  "Anyone in West Bengal should be able to find out what the state government actually spent, on what, and how final that number is — and check it against the government’s own page in one click.";

export const GOAL_EXPLAINED =
  "Not trusted because we say so, but trusted because anyone can check. That is the difference between this tracker and a summary: every figure carries its source, page, unit and status, and every sum shows its working.";

export interface SuccessMeasure {
  title: string;
  body: string;
}

/** How we will know the goal is being met. Each one can be tested. */
export const SUCCESS_MEASURES: readonly SuccessMeasure[] = [
  {
    title: "One click to the source",
    body: "Every published figure links to the exact official document and page it came from.",
  },
  {
    title: "Every sum reproducible",
    body: "Every derived number shows its inputs and formula, and gives the same answer by hand or in a spreadsheet.",
  },
  {
    title: "Mistakes stay visible",
    body: "Corrections show the old value, the new value, the reason and the date. Nothing is changed silently.",
  },
  {
    title: "Readable by everyone",
    body: "Plain words in Bengali and English, on a basic phone and a slow connection, with keyboard and screen-reader support.",
  },
];

export interface Horizon {
  when: string;
  title: string;
  body: string;
  /** What this stage makes possible for readers. */
  implication: string;
}

export const HORIZONS: readonly Horizon[] = [
  {
    when: "Now · v0.1",
    title: "An honest foundation",
    body: "The official sources are mapped and their quirks recorded. The calculator and this work log make our method checkable before any figure is published.",
    implication: "Readers can see how we work before they are asked to trust what we publish.",
  },
  {
    when: "Next · v0.2–v0.3",
    title: "Verified spending, month by month",
    body: "The first official monthly report, extracted by a repeatable script and checked by a person; then every month of the current and previous year.",
    implication: "For the first time, a resident can follow the state’s reported spending through the year, with the source one click away.",
  },
  {
    when: "Then · v0.4–v0.5",
    title: "How much numbers move after audit, and where money goes",
    body: "Provisional monthly figures side by side with audited full-year accounts, and spending by department against the budget.",
    implication: "Readers learn how far early figures can be relied on, and journalists and students get department figures they can cite.",
  },
  {
    when: "Launch · v1.0",
    title: "Open to everyone",
    body: "Bengali interface, an accessibility audit, a public corrections log and a permanent address.",
    implication: "A public reference that stays correct over time, not a one-off report.",
  },
  {
    when: "Beyond",
    title: "Open questions, tested against our principles first",
    body: "Downloadable verified datasets for researchers; a notice when a new official report appears; district-level spending if official sources publish it; a method other states could reuse, since the code is open.",
    implication: "Each idea is built only if it can meet the same standard of evidence.",
  },
];

/** What the tracker will not become, whatever is added later. */
export const NOT_GOALS: readonly string[] = [
  "A scorecard for any party, government or politician.",
  "A forecast or opinion about what the government should spend.",
  "A place for figures that cannot be traced to an official publication.",
  "A tool that logs in to, or scrapes, the government’s own systems.",
];

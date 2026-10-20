/**
 * Shared vocabulary for every figure the site will show.
 *
 * These definitions mirror docs/DATA_DICTIONARY.md. Change both together.
 * Nothing in this file is a financial figure.
 */

export interface Term {
  label: string;
  description: string;
}

/** What kind of number a figure is. Decides which figures may be compared. */
export type FigureKind =
  | "budget_estimate"
  | "revised_estimate"
  | "monthly_actual"
  | "year_to_date_actual"
  | "annual_actual";

export const FIGURE_KINDS: Record<FigureKind, Term> = {
  budget_estimate: {
    label: "Budget estimate (BE)",
    description:
      "What the government plans to spend in a financial year, as presented in the State budget. A plan, not money spent.",
  },
  revised_estimate: {
    label: "Revised estimate (RE)",
    description:
      "An updated estimate for the current financial year, presented alongside the next year’s budget. Still a plan, not money spent.",
  },
  monthly_actual: {
    label: "Monthly actual",
    description:
      "Spending recorded for a single month. If a source reports only year-to-date totals, a monthly figure is the difference between two consecutive months and is labelled as derived.",
  },
  year_to_date_actual: {
    label: "Year-to-date actual",
    description:
      "Spending recorded from 1 April up to the end of the reporting month (also called cumulative or progressive).",
  },
  annual_actual: {
    label: "Annual actual",
    description:
      "Spending for a complete financial year. Final figures come from the annual Finance Accounts and Appropriation Accounts, audited by the Comptroller and Auditor General of India.",
  },
};

export const FIGURE_KIND_ORDER: readonly FigureKind[] = [
  "budget_estimate",
  "revised_estimate",
  "monthly_actual",
  "year_to_date_actual",
  "annual_actual",
];

/** How final a figure is, as stated by the government document itself. Never inferred by us. */
export type AccountingStatus = "estimate" | "provisional" | "audited" | "not_stated";

export const ACCOUNTING_STATUSES: Record<AccountingStatus, Term> = {
  estimate: {
    label: "Estimate",
    description: "A plan or forecast from budget documents — not money actually spent.",
  },
  provisional: {
    label: "Provisional",
    description: "Actual spending from monthly accounts that have not been audited yet and may be revised.",
  },
  audited: {
    label: "Audited",
    description: "Final full-year accounts certified by the Comptroller and Auditor General of India.",
  },
  not_stated: {
    label: "Not stated",
    description:
      "The document does not say how final its actual figures are, as with the “Actual” columns in budget documents. We show them as “not stated” and never call them provisional or audited.",
  },
};

export const ACCOUNTING_STATUS_ORDER: readonly AccountingStatus[] = ["estimate", "provisional", "audited", "not_stated"];

/** Our own check of a figure against its official source. Separate from AccountingStatus. */
export type VerificationStatus = "verified" | "unverified" | "needs_review" | "corrected";

export const VERIFICATION_STATUSES: Record<VerificationStatus, Term> = {
  verified: {
    label: "Verified",
    description:
      "Matches the official document: its totals reconcile automatically and a person has checked it against the original page.",
  },
  unverified: {
    label: "Not yet verified",
    description: "Taken from an official document but not checked yet. Never presented as verified.",
  },
  needs_review: {
    label: "Needs review",
    description: "A check failed or the source is unclear. Held back until the problem is resolved.",
  },
  corrected: {
    label: "Corrected",
    description:
      "A published figure was fixed. The original value, the correction and the reason stay visible in the change log.",
  },
};

export const VERIFICATION_STATUS_ORDER: readonly VerificationStatus[] = [
  "verified",
  "unverified",
  "needs_review",
  "corrected",
];

/** Months of the Indian financial year, which runs from 1 April to 31 March. */
export const FINANCIAL_YEAR_MONTHS = [
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
] as const;

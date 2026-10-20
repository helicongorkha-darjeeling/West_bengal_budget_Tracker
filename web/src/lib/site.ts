/**
 * Facts about the project itself — mission, principles, official sources.
 *
 * This file must never contain financial figures. Figures will come only from
 * verified, source-linked data produced by the ingestion pipeline.
 */

export const SITE = {
  name: "West Bengal Budget Tracker",
  tagline: "Public money. Verifiable facts. Clear answers.",
  version: "0.1",
  phase: "Foundation",
  /** ISO date when the project-status facts on the page were last reviewed by hand. */
  statusAsOf: "2026-10-20",
} as const;

export const PRINCIPLES = [
  "Truth before appearance.",
  "Evidence before conclusions.",
  "Transparency about uncertainty.",
  "Political neutrality.",
  "Reproducible calculations.",
  "Corrections without hiding mistakes.",
  "Simplicity for citizens, with sufficient detail for researchers.",
  "Working software before ambitious features.",
] as const;

/** How far we have examined a source. "inspected" means we opened and recorded its documents. */
export type SourceInspection = "inspected" | "identified";

export interface OfficialSource {
  id: string;
  publisher: string;
  name: string;
  url: string;
  /** Plain-English summary of what the source publishes that matters to this project. */
  provides: string;
  inspection: SourceInspection;
  /** ISO date of our most recent inspection, if any. */
  inspectedOn?: string;
}

export const OFFICIAL_SOURCES: readonly OfficialSource[] = [
  {
    id: "wb-finance-budget-publications",
    publisher: "Finance Department, Government of West Bengal",
    name: "Budget Speech & Publications",
    url: "https://finance.wb.gov.in/Fin_New/Pages/Budget_Publication.aspx",
    provides:
      "Annual budget documents: Budget Estimates, Revised Estimates and actuals for two years earlier (their status is not stated), plus department-wise Demands for Grants, in several different units.",
    inspection: "inspected",
    inspectedOn: "2026-10-20",
  },
  {
    id: "pag-ae-wb-state-accounts",
    publisher:
      "Office of the Principal Accountant General (A&E), West Bengal — Indian Audit & Accounts Department (CAG of India)",
    name: "State Accounts Report",
    url: "https://cag.gov.in/ae/west-bengal/en/state-accounts-report",
    provides:
      "Monthly Key Indicators — unaudited, provisional monthly accounts in ₹ crore, published since April 2008 — and audited annual accounts (the latest Finance Accounts listed on 20 October 2026 are for 2020-21).",
    inspection: "inspected",
    inspectedOn: "2026-10-20",
  },
];

/** Formats an ISO date (YYYY-MM-DD) as e.g. "20 October 2026", independent of server time zone. */
export function formatIsoDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

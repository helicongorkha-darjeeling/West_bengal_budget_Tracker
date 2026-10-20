import { FIGURE_KINDS, FIGURE_KIND_ORDER } from "@/lib/domain";
import { Section } from "./section";
import { EmptyValue } from "./status";

const PERIOD_FIELDS = [
  "Financial year",
  "Period covered",
  "Type of figure",
  "Accounting status",
  "Source document",
  "Last checked",
] as const;

export function ReportingPeriod() {
  return (
    <Section
      id="reporting-period"
      eyebrow="Context first"
      title="Reporting period"
      description="Every figure belongs to a specific period and has a specific level of finality. Before any number appears, this panel will state exactly what it covers."
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="rounded-lg border border-line bg-surface p-5">
          <h3 className="text-base font-semibold text-ink">Currently selected</h3>
          <p className="mt-1 text-sm text-ink-2">No reporting period is available until verified data is imported.</p>
          <dl className="mt-4 divide-y divide-line">
            {PERIOD_FIELDS.map((field) => (
              <div key={field} className="flex items-baseline justify-between gap-4 py-2.5 text-sm">
                <dt className="text-ink-2">{field}</dt>
                <dd className="font-medium text-ink">
                  <EmptyValue />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-lg border border-line bg-surface p-5">
          <h3 className="text-base font-semibold text-ink">How periods and figures work</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">
            The Indian financial year runs from 1 April to 31 March. For example, “2026-27” means
            1 April 2026 to 31 March 2027. Official documents publish several kinds of figures,
            and they must never be mixed up:
          </p>
          <dl className="mt-4 space-y-3">
            {FIGURE_KIND_ORDER.map((kind) => (
              <div key={kind} className="text-sm">
                <dt className="font-semibold text-ink">{FIGURE_KINDS[kind].label}</dt>
                <dd className="mt-0.5 leading-relaxed text-ink-2">{FIGURE_KINDS[kind].description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

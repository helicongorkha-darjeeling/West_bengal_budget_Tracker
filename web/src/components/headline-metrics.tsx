import { AwaitingDataBadge, EmptyValue } from "./status";

interface MeasureDefinition {
  label: string;
  description: string;
  unit: string;
}

/** Definitions only. Values will come from verified data files — never typed in here. */
const HEADLINE_MEASURES: readonly MeasureDefinition[] = [
  {
    label: "Total expenditure",
    description: "All spending recorded for the reporting period, as totalled in the source document.",
    unit: "₹ crore",
  },
  {
    label: "Revenue expenditure",
    description:
      "Day-to-day spending that does not create assets, such as salaries, pensions, interest and subsidies.",
    unit: "₹ crore",
  },
  {
    label: "Capital expenditure",
    description: "Spending that creates lasting assets, such as roads, buildings and irrigation works.",
    unit: "₹ crore",
  },
  {
    label: "Share of budget estimate spent",
    description: "Spending so far as a percentage of the year’s Budget Estimate.",
    unit: "%",
  },
];

export function HeadlineMetrics() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {HEADLINE_MEASURES.map((measure) => (
        <li key={measure.label} className="flex flex-col rounded-lg border border-line bg-surface p-5">
          <h3 className="text-sm font-medium text-ink-2">{measure.label}</h3>
          <p className="mt-3 text-4xl font-semibold text-ink-2">
            <EmptyValue />
          </p>
          <div className="mt-3">
            <AwaitingDataBadge />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-2">{measure.description}</p>
          <div className="mt-auto pt-4">
            <p className="border-t border-line pt-3 text-xs text-ink-2">
              Unit: {measure.unit} · source and page cited with each figure
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

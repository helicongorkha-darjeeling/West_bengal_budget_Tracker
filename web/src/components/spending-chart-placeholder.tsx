import { FINANCIAL_YEAR_MONTHS } from "@/lib/domain";
import { PendingIcon } from "./icons";

const GRIDLINES = 4;

/**
 * The frame of the future cumulative-spending chart. It deliberately draws no
 * bars or lines: an empty grid and the month axis only, so nothing resembles data.
 */
export function SpendingChartPlaceholder() {
  return (
    <figure aria-labelledby="spending-chart-title" className="mt-6 rounded-lg border border-line bg-surface p-5">
      <figcaption>
        <h3 id="spending-chart-title" className="text-base font-semibold text-ink">
          Spending through the financial year
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-2">
          Will show year-to-date actual spending, month by month from April, against the year’s
          Budget Estimate — with an accessible data table alongside.
        </p>
      </figcaption>

      <div className="relative mt-6">
        <div aria-hidden="true">
          <div className="flex h-56 flex-col justify-between border-b border-baseline sm:h-64">
            {Array.from({ length: GRIDLINES }, (_, i) => (
              <div key={i} className="border-t border-grid" />
            ))}
          </div>
          <div className="mt-2 grid grid-cols-12 text-center text-[0.6875rem] text-ink-2 sm:text-xs">
            {FINANCIAL_YEAR_MONTHS.map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 top-0 flex h-56 items-center justify-center p-4 sm:h-64">
          <div className="max-w-sm rounded-md border border-line bg-surface px-4 py-3 text-center">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
              <PendingIcon className="size-4 text-ink-2" />
              No verified monthly figures yet
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-2">
              The chart appears after the first official monthly report has been imported and
              checked.
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}

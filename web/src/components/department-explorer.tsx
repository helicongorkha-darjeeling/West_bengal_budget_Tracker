import { PendingIcon, SearchIcon } from "./icons";
import { Section } from "./section";

const COLUMNS = [
  { label: "Department", align: "text-left", mobile: true },
  { label: "Grant no.", align: "text-left", mobile: false },
  { label: "Budget estimate", align: "text-right", mobile: true },
  { label: "Spent so far", align: "text-right", mobile: true },
  { label: "Share spent", align: "text-right", mobile: false },
  { label: "Status", align: "text-left", mobile: false },
] as const;

export function DepartmentExplorer() {
  return (
    <Section
      id="departments"
      eyebrow="Department explorer"
      title="Spending by department"
      description="You will be able to find any department, see what it was budgeted and what it has spent, and open the official page each number comes from."
    >
      <div className="rounded-lg border border-line bg-surface">
        <div className="flex flex-col gap-4 border-b border-line p-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="department-search" className="block text-sm font-medium text-ink">
              Search departments
            </label>
            <div className="relative mt-1.5">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-2" />
              <input
                id="department-search"
                type="search"
                disabled
                placeholder="Available after data import"
                aria-describedby="department-explorer-note"
                className="w-full cursor-not-allowed rounded-md border border-line-strong bg-surface-2 py-2 pr-3 pl-9 text-sm text-ink placeholder:text-ink-2"
              />
            </div>
          </div>
          <div className="sm:w-56">
            <label htmlFor="department-year" className="block text-sm font-medium text-ink">
              Financial year
            </label>
            <select
              id="department-year"
              disabled
              aria-describedby="department-explorer-note"
              className="mt-1.5 w-full cursor-not-allowed rounded-md border border-line-strong bg-surface-2 px-3 py-2 text-sm text-ink-2"
            >
              <option>Not available yet</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">Department-wise spending. No data has been imported yet.</caption>
            <thead className="bg-surface-2 text-ink-2">
              <tr>
                {COLUMNS.map((column) => (
                  <th
                    key={column.label}
                    scope="col"
                    className={`px-4 py-2.5 font-medium ${column.align} ${column.mobile ? "" : "hidden sm:table-cell"}`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-12 text-center">
                  <p className="inline-flex items-center gap-2 font-semibold text-ink">
                    <PendingIcon className="size-4 text-ink-2" />
                    No departments loaded
                  </p>
                  <p id="department-explorer-note" className="mx-auto mt-1.5 max-w-lg leading-relaxed text-ink-2">
                    Department-wise figures will be added from official grant-wise documents once
                    they are verified. Departments will not be listed until their figures can be
                    shown with sources.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

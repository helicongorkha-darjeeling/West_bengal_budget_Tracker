import { SITE } from "@/lib/site";
import { LogoMark } from "./icons";

const NAV_ITEMS = [
  { href: "#reporting-period", label: "Reporting period" },
  { href: "#spending", label: "Spending" },
  { href: "#departments", label: "Departments" },
  { href: "#methodology", label: "Methodology" },
  { href: "#evolution", label: "Evolution" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="bg-accent-soft">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 text-sm sm:px-6 lg:px-8">
          <strong className="rounded bg-accent px-2 py-0.5 text-xs font-bold tracking-wide text-on-accent uppercase">
            {SITE.phase}
          </strong>
          <p className="text-ink">
            This is a new site. No figures have been published yet.{" "}
            <a href="#methodology" className="font-medium text-accent underline underline-offset-4 hover:text-accent-strong">
              How we will verify data
            </a>
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#overview" className="inline-flex items-center gap-2.5 text-base font-semibold text-ink">
          <LogoMark className="size-7 text-accent" />
          {SITE.name}
        </a>
        <nav aria-label="Page sections">
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-ink-2 underline-offset-4 hover:text-ink hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

import { SITE, formatIsoDate } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-ink-2 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <p className="font-semibold text-ink">{SITE.name}</p>
          <p className="mt-1">{SITE.tagline}</p>
          <p className="mt-4 leading-relaxed">
            Not an official website of the Government of West Bengal or the Comptroller and
            Auditor General of India. Figures, when published, will link to the official
            publication they come from.
          </p>
        </div>
        <div className="md:text-right">
          <p>
            Version {SITE.version} · {SITE.phase}
          </p>
          <p className="mt-1">
            Status as of <time dateTime={SITE.statusAsOf}>{formatIsoDate(SITE.statusAsOf)}</time>
          </p>
        </div>
      </div>
    </footer>
  );
}

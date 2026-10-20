import { OFFICIAL_SOURCES, SITE, formatIsoDate } from "@/lib/site";
import { InfoIcon } from "./icons";

export function Overview() {
  const projectStatus = [
    { term: "Verified figures published", detail: "None yet" },
    { term: "Official publishers identified", detail: String(OFFICIAL_SOURCES.length) },
    { term: "Site version", detail: `${SITE.version} · ${SITE.phase}` },
    {
      term: "Status as of",
      detail: <time dateTime={SITE.statusAsOf}>{formatIsoDate(SITE.statusAsOf)}</time>,
    },
  ];

  return (
    <section id="overview" aria-labelledby="overview-title" className="bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8">
        <div>
          <p className="text-sm font-semibold text-accent">Public spending in West Bengal, India</p>
          <h1
            id="overview-title"
            className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl"
          >
            {SITE.name}
          </h1>
          <p className="mt-3 text-xl font-medium text-ink-2 sm:text-2xl">{SITE.tagline}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink">
            Our mission is to make public expenditure understandable to ordinary citizens. We will
            report what the Government of West Bengal has actually spent, using only official
            government publications — and show exactly where every figure comes from and how final
            it is.
          </p>

          <div
            id="data-status"
            className="mt-8 flex max-w-2xl gap-4 rounded-lg border border-accent/30 bg-accent-soft p-5"
          >
            <InfoIcon className="mt-0.5 size-6 shrink-0 text-accent" />
            <div>
              <h2 className="text-base font-semibold text-ink">
                No verified data has been imported yet
              </h2>
              <p className="mt-2 leading-relaxed text-ink-2">
                The site is in its foundation phase. The sections below show where figures will
                appear once they have been taken from official documents and checked. Until then,
                every value is shown as “—”. We do not display estimates, samples or placeholder
                numbers.
              </p>
              <p className="mt-3">
                <a
                  href="#methodology"
                  className="font-medium text-accent underline underline-offset-4 hover:text-accent-strong"
                >
                  Read how figures will be verified
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="self-start rounded-lg border border-line bg-page p-5">
          <h2 className="text-sm font-semibold text-ink">Project status</h2>
          <dl className="mt-4 divide-y divide-line">
            {projectStatus.map((row) => (
              <div key={row.term} className="flex items-baseline justify-between gap-4 py-2.5 text-sm">
                <dt className="text-ink-2">{row.term}</dt>
                <dd className="text-right font-medium text-ink">{row.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

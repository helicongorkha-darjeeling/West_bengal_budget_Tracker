import {
  ACCOUNTING_STATUSES,
  ACCOUNTING_STATUS_ORDER,
  VERIFICATION_STATUSES,
  VERIFICATION_STATUS_ORDER,
} from "@/lib/domain";
import { OFFICIAL_SOURCES, PRINCIPLES, formatIsoDate, type OfficialSource } from "@/lib/site";
import { ExternalLinkIcon } from "./icons";
import { Section } from "./section";
import { AccountingBadge, VerificationBadge } from "./status";

const PIPELINE_STEPS = [
  {
    title: "Collect",
    body: "Download the official publication and record where it came from, when, and a digital fingerprint (SHA-256) of the exact file.",
  },
  {
    title: "Extract",
    body: "Read the tables with a repeatable script, keeping the unit, period and page of every number.",
  },
  {
    title: "Check",
    body: "Totals must add up and match the document’s own totals. A person then compares the figures with the original page.",
  },
  {
    title: "Publish",
    body: "Show each figure with its source link, page, unit, period, accounting status and verification status.",
  },
  {
    title: "Correct openly",
    body: "If we get something wrong, we fix it in public and keep a record of what changed and why.",
  },
] as const;

function SourceCard({ source }: { source: OfficialSource }) {
  return (
    <li className="flex flex-col rounded-lg border border-line bg-surface p-5">
      <p className="text-sm text-ink-2">{source.publisher}</p>
      <h4 className="mt-1 text-base font-semibold text-ink">{source.name}</h4>
      <p className="mt-2 text-sm leading-relaxed text-ink-2">{source.provides}</p>
      <p className="mt-3 text-sm text-ink">
        {source.inspection === "inspected" && source.inspectedOn ? (
          <>
            First inspected on{" "}
            <time dateTime={source.inspectedOn}>{formatIsoDate(source.inspectedOn)}</time>. No
            figures imported yet.
          </>
        ) : (
          "Identified as an official source. Detailed inspection in progress."
        )}
      </p>
      <p className="mt-auto pt-4">
        <a
          href={source.url}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline underline-offset-4 hover:text-accent-strong"
          rel="noopener noreferrer"
          target="_blank"
        >
          Open the official page
          <ExternalLinkIcon className="size-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </p>
    </li>
  );
}

export function Methodology() {
  return (
    <Section
      id="methodology"
      eyebrow="Methodology and sources"
      title="How a number earns its place here"
      description="Every figure will be traceable to an official document, and you will always be able to check it yourself."
    >
      <div>
        <h3 className="text-lg font-semibold text-ink">From official document to published figure</h3>
        <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PIPELINE_STEPS.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-line bg-surface p-4">
              <p className="text-sm font-semibold text-accent">Step {index + 1}</p>
              <h4 className="mt-1 font-semibold text-ink">{step.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-semibold text-ink">Two labels on every figure</h3>
        <p className="mt-2 max-w-3xl text-ink-2">
          How final a figure is (set by the government’s own documents) is a different question
          from whether we have checked it. We show both, separately.
        </p>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-line bg-surface p-5">
            <h4 className="font-semibold text-ink">Accounting status — from the source</h4>
            <ul className="mt-4 space-y-4">
              {ACCOUNTING_STATUS_ORDER.map((status) => (
                <li key={status}>
                  <AccountingBadge status={status} />
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                    {ACCOUNTING_STATUSES[status].description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-surface p-5">
            <h4 className="font-semibold text-ink">Verification status — our check</h4>
            <ul className="mt-4 space-y-4">
              {VERIFICATION_STATUS_ORDER.map((status) => (
                <li key={status}>
                  <VerificationBadge status={status} />
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                    {VERIFICATION_STATUSES[status].description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-semibold text-ink">Official sources</h3>
        <p className="mt-2 max-w-3xl text-ink-2">
          We use official government publications only. Our source inventory records what we
          have inspected and what still needs investigation.
        </p>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {OFFICIAL_SOURCES.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </ul>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-surface p-5">
          <h3 className="text-lg font-semibold text-ink">Our principles</h3>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink-2 marker:text-ink-2">
            {PRINCIPLES.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ol>
        </div>
        <div className="rounded-lg border border-line bg-surface p-5">
          <h3 className="text-lg font-semibold text-ink">Neutrality and corrections</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-2">
            We report what official documents say, apply the same rules to every year and every
            government, and do not comment on parties or politicians.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-2">
            If we cannot verify a figure, we do not publish it as verified. Mistakes are corrected
            in public: the original value, the correction and the reason stay visible.
          </p>
        </div>
      </div>
    </Section>
  );
}

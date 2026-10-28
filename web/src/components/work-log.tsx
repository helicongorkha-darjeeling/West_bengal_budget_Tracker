import { formatIsoDate } from "@/lib/site";
import { WORK_LOG } from "@/lib/work-log";
import { Section } from "./section";

export function WorkLog() {
  return (
    <Section
      id="work-log"
      eyebrow="Work log"
      title="What was done, and when"
      description="A dated record of every working session: what changed, which checks were run and their real results, and what went wrong. The full technical log, with every command, is in the project’s repository."
    >
      <ol className="space-y-6">
        {WORK_LOG.map((entry) => (
          <li key={`${entry.date}-${entry.title}`} className="rounded-lg border border-line bg-surface p-5">
            <p className="text-sm text-ink-2">
              <time dateTime={entry.date} className="font-semibold text-ink">
                {formatIsoDate(entry.date)}
              </time>{" "}
              · {entry.milestone}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-ink">{entry.title}</h3>

            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-ink">Done</h4>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-2">
                  {entry.done.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {entry.problems.length > 0 ? (
                  <>
                    <h4 className="mt-4 text-sm font-semibold text-ink">Problems and corrections</h4>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-2">
                      {entry.problems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">Checks run</h4>
                <table className="mt-2 w-full text-left text-sm">
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Check</th>
                      <th scope="col">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {entry.checks.map((check) => (
                      <tr key={check.name} className="align-top">
                        <td className="py-2 pr-4 text-ink-2">{check.name}</td>
                        <td className="py-2 font-medium text-ink">{check.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 text-sm text-ink">
                  <span className="font-semibold">Next: </span>
                  {entry.next}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

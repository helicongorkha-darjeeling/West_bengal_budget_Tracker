import { CURRENT_LEARNINGS, MILESTONES, type MilestoneState } from "@/lib/evolution";
import { Section } from "./section";

const STATE_LABEL: Record<MilestoneState, string> = {
  done: "Done",
  current: "Now",
  next: "Next",
  planned: "Planned",
};

const STATE_MARKER: Record<MilestoneState, string> = {
  done: "border-accent bg-accent",
  current: "border-accent bg-accent ring-4 ring-accent/20",
  next: "border-accent bg-surface",
  planned: "border-baseline bg-surface",
};

export function Evolution() {
  return (
    <Section
      id="evolution"
      eyebrow="Research and development"
      title="How this tracker is evolving"
      description="We keep a public record of what we knew then, what we know now, and what comes next — including what we got wrong along the way."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <ol className="relative space-y-6 border-l border-line pl-6" aria-label="Milestones">
          {MILESTONES.map((milestone) => (
            <li key={milestone.version} className="relative">
              <span
                aria-hidden="true"
                className={`absolute top-1.5 -left-[1.95rem] size-3.5 rounded-full border-2 ${STATE_MARKER[milestone.state]}`}
              />
              <p className="text-sm text-ink-2">
                <span className="font-semibold text-ink">v{milestone.version}</span> ·{" "}
                {STATE_LABEL[milestone.state]}
              </p>
              <h3 className="mt-0.5 font-semibold text-ink">{milestone.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{milestone.summary}</p>
            </li>
          ))}
        </ol>

        <div className="self-start rounded-lg border border-line bg-surface p-5">
          <h3 className="font-semibold text-ink">Then and now — what this milestone taught us</h3>
          {CURRENT_LEARNINGS.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {CURRENT_LEARNINGS.map((learning) => (
                <li key={learning.then} className="text-sm leading-relaxed">
                  <p className="text-ink-2">
                    <span className="font-semibold text-ink">Then: </span>
                    {learning.then}
                  </p>
                  <p className="mt-1 text-ink-2">
                    <span className="font-semibold text-ink">Now: </span>
                    {learning.now}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              Lessons from the current milestone will be recorded here once its research is
              complete.
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}

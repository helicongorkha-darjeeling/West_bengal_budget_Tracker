import { GOAL, GOAL_EXPLAINED, HORIZONS, NOT_GOALS, SUCCESS_MEASURES } from "@/lib/vision";
import { Section } from "./section";

export function Vision() {
  return (
    <Section
      id="goal"
      eyebrow="Why this exists"
      title="Our goal and the road ahead"
      description="What we are building towards, how we will know it is working, and what each stage makes possible."
    >
      <div className="rounded-lg border border-accent/30 bg-accent-soft p-6">
        <p className="text-sm font-semibold text-accent">The goal</p>
        <p className="mt-2 text-xl font-semibold leading-snug text-ink sm:text-2xl">{GOAL}</p>
        <p className="mt-3 max-w-3xl leading-relaxed text-ink-2">{GOAL_EXPLAINED}</p>
      </div>

      <h3 className="mt-10 text-lg font-semibold text-ink">How we will know it is working</h3>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SUCCESS_MEASURES.map((measure) => (
          <li key={measure.title} className="rounded-lg border border-line bg-surface p-5">
            <h4 className="font-semibold text-ink">{measure.title}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{measure.body}</p>
          </li>
        ))}
      </ul>

      <h3 className="mt-10 text-lg font-semibold text-ink">The road ahead, and what it changes</h3>
      <ol className="mt-4 space-y-4">
        {HORIZONS.map((horizon) => (
          <li
            key={horizon.when}
            className="grid gap-2 rounded-lg border border-line bg-surface p-5 md:grid-cols-[10rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-6"
          >
            <p className="text-sm font-semibold text-accent">{horizon.when}</p>
            <div>
              <h4 className="font-semibold text-ink">{horizon.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{horizon.body}</p>
            </div>
            <p className="text-sm leading-relaxed text-ink">
              <span className="font-semibold">What it means: </span>
              {horizon.implication}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-lg border border-line bg-surface p-5">
        <h3 className="font-semibold text-ink">What this tracker will never become</h3>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-2">
          {NOT_GOALS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

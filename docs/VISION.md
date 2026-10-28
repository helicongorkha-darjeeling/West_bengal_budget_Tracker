# Vision — the goal, and where the tracker is going

The website's "Our goal and the road ahead" section (`web/src/lib/vision.ts`) is the public version of this file. The
horizons must agree with `ROADMAP.md`.

## The goal

> Anyone in West Bengal should be able to find out what the state government actually spent, on what, and how final that
> number is — and check it against the government's own page in one click.

**Not trusted because we say so, but trusted because anyone can check.**

## How the goal was chosen (2026-10-28)

The owner asked for the project's goal and future implications, choosing the strongest answer. Five drafts were written
and compared against four tests: does it name a real person's question, can it be measured, does it follow the eight
principles, and does it stay politically neutral?

| Draft | Strength | Weakness | Verdict |
| --- | --- | --- | --- |
| 1. "Make public expenditure understandable to ordinary citizens." (the brief's mission) | Clear, neutral | Not measurable; "understandable" has no test | Kept as the mission, not the goal |
| 2. "The most transparent state-budget website in India." | Ambitious | A comparison we cannot verify; competitive rather than useful | Rejected (principle 2: evidence before conclusions) |
| 3. "Hold the government accountable for how it spends." | Motivating | Implies a judgement on the government; breaks neutrality (principle 4) | Rejected |
| 4. "Become the reference journalists, students and officials cite because it can be checked." | Names who benefits and why | Speaks to specialists, not every resident | Folded into the explanation |
| 5. "Anyone can find what was spent, on what, how final it is — and check it in one click." | A citizen's actual question; three testable parts (what, on what, how final) plus a measurable bar (one click to the source) | Long | **Chosen** |

Draft 5 wins because each phrase maps to something we can test: "actually spent" (actuals, never estimates presented as
spending), "on what" (the department explorer), "how final" (the accounting status on every figure), "one click" (the
provenance link on every figure).

## How we will know it is working

1. **One click to the source:** every published figure links to the exact official document and page.
2. **Every sum reproducible:** every derived number shows its inputs and formula (the calculator is the first instance).
3. **Mistakes stay visible:** corrections show old value, new value, reason and date.
4. **Readable by everyone:** Bengali and English, a basic phone, a slow connection, keyboard and screen readers.

## Horizons, and what each makes possible

| When | What | What it means for readers |
| --- | --- | --- |
| Now · v0.1 | Sources mapped; calculator and public work log | Readers can see how we work before they are asked to trust what we publish. |
| Next · v0.2–v0.3 | First verified monthly report, then every month of two years | A resident can follow reported spending through the year, source one click away. |
| Then · v0.4–v0.5 | Provisional vs audited; departments vs budget | Readers learn how far early figures can be relied on; citable department figures. |
| Launch · v1.0 | Bengali, accessibility audit, corrections log, permanent address | A public reference that stays correct over time. |
| Beyond | Datasets for researchers; new-report notices; district level if officially published; a method other states can reuse | Each idea built only if it meets the same standard of evidence (see the roadmap backlog). |

## What the tracker will never become

- A scorecard for any party, government or politician.
- A forecast or opinion about what the government should spend.
- A place for figures that cannot be traced to an official publication.
- A tool that logs in to, or scrapes, the government's own systems (D-022).

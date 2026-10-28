"use client";

import { useId, useState } from "react";
import {
  CALCULATOR_VERSION,
  UNITS,
  UNIT_ORDER,
  changeBetween,
  convertUnits,
  monthFromYearToDate,
  parseDecimal,
  reconcile,
  runSelfChecks,
  shareOf,
  toPlainText,
  type Calculation,
  type Decimal,
  type Unit,
} from "@/lib/calc";

type Mode = "convert" | "share" | "change" | "month" | "reconcile";

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: "convert", label: "Convert units", hint: "Rupees, thousand, lakh and crore." },
  { id: "share", label: "Share of a total", hint: "For example, spending so far as a % of the budget estimate." },
  { id: "change", label: "Change", hint: "Difference and % change between two figures of the same kind." },
  { id: "month", label: "Month from year-to-date", hint: "One month’s figure from two consecutive year-to-date totals." },
  { id: "reconcile", label: "Check a total", hint: "Do printed parts add up to the printed total, within rounding?" },
];

const inputClass =
  "mt-1 block w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-base text-ink tabular-nums placeholder:text-ink-2";
const labelClass = "block text-sm font-medium text-ink";

type Outcome = { calc: Calculation } | { error: string } | null;

function NumberField({
  label,
  value,
  onChange,
  invalid,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        inputMode="decimal"
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid || undefined}
        className={inputClass}
      />
    </div>
  );
}

function UnitField({ label, value, onChange }: { label: string; value: Unit; onChange: (unit: Unit) => void }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as Unit)} className={inputClass}>
        {UNIT_ORDER.map((unit) => (
          <option key={unit} value={unit}>
            {UNITS[unit].label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Parses every field; returns the first problem in plain words, or the numbers. */
function readAll(fields: [string, string][]): Decimal[] | string {
  const values: Decimal[] = [];
  for (const [label, text] of fields) {
    if (text.trim() === "") return "";
    const value = parseDecimal(text);
    if (!value) return `“${label}” is not a plain number. Use digits, an optional minus sign and one decimal point.`;
    values.push(value);
  }
  return values;
}

function evaluate(run: () => Calculation): Outcome {
  try {
    return { calc: run() };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "This calculation could not be done." };
  }
}

export function Calculator() {
  const [mode, setMode] = useState<Mode>("convert");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [fromUnit, setFromUnit] = useState<Unit>("lakh");
  const [toUnit, setToUnit] = useState<Unit>("crore");
  const [parts, setParts] = useState("");
  const [places, setPlaces] = useState("2");
  const [copied, setCopied] = useState(false);

  const labels: Record<Exclude<Mode, "reconcile">, [string, string]> = {
    convert: ["Amount", ""],
    share: ["Part", "Whole"],
    change: ["Earlier figure", "Later figure"],
    month: ["Year-to-date, this month", "Year-to-date, previous month"],
  };

  let outcome: Outcome = null;
  if (mode === "reconcile") {
    const lines = parts.split(/\n/).map((line) => line.trim()).filter(Boolean);
    const read = readAll([...lines.map((line, i): [string, string] => [`Component ${i + 1}`, line]), ["Printed total", b]]);
    const placesValue = /^\d$/.test(places.trim()) ? Number(places.trim()) : null;
    if (typeof read === "string") outcome = read ? { error: read } : null;
    else if (placesValue === null) outcome = { error: "“Decimal places printed” must be a single digit, 0 to 9." };
    else {
      const total = read.pop() as Decimal;
      outcome = evaluate(() => reconcile(read, total, placesValue));
    }
  } else {
    const [labelA, labelB] = labels[mode];
    const read = readAll(mode === "convert" ? [[labelA, a]] : [[labelA, a], [labelB, b]]);
    if (typeof read === "string") outcome = read ? { error: read } : null;
    else {
      const [x, y] = read as [Decimal, Decimal];
      outcome = evaluate(() => {
        switch (mode) {
          case "convert":
            return convertUnits(x, fromUnit, toUnit);
          case "share":
            return shareOf(x, y);
          case "change":
            return changeBetween(x, y);
          case "month":
            return monthFromYearToDate(x, y);
        }
      });
    }
  }

  const calc = outcome && "calc" in outcome ? outcome.calc : null;

  async function copyRecord() {
    if (!calc) return;
    try {
      await navigator.clipboard.writeText(toPlainText(calc));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  const partsId = useId();
  const current = MODES.find((m) => m.id === mode);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="rounded-lg border border-line bg-surface p-5">
        <fieldset>
          <legend className="text-sm font-semibold text-ink">What do you want to work out?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {MODES.map((m) => (
              <label
                key={m.id}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus ${
                  mode === m.id ? "border-accent bg-accent text-on-accent" : "border-line-strong bg-surface text-ink"
                }`}
              >
                <input
                  type="radio"
                  name="calculator-mode"
                  value={m.id}
                  checked={mode === m.id}
                  onChange={() => {
                    setMode(m.id);
                    setCopied(false);
                  }}
                  className="sr-only"
                />
                {m.label}
              </label>
            ))}
          </div>
          {current ? <p className="mt-3 text-sm text-ink-2">{current.hint}</p> : null}
        </fieldset>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {mode === "reconcile" ? (
            <>
              <div className="sm:col-span-2">
                <label htmlFor={partsId} className={labelClass}>
                  Components, one per line
                </label>
                <textarea
                  id={partsId}
                  rows={4}
                  spellCheck={false}
                  value={parts}
                  onChange={(e) => setParts(e.target.value)}
                  className={inputClass}
                />
              </div>
              <NumberField label="Printed total" value={b} onChange={setB} invalid={false} />
              <NumberField label="Decimal places printed" value={places} onChange={setPlaces} invalid={false} />
            </>
          ) : (
            <>
              <NumberField label={labels[mode][0]} value={a} onChange={setA} invalid={false} />
              {mode === "convert" ? (
                <>
                  <UnitField label="From" value={fromUnit} onChange={setFromUnit} />
                  <UnitField label="To" value={toUnit} onChange={setToUnit} />
                </>
              ) : (
                <NumberField label={labels[mode][1]} value={b} onChange={setB} invalid={false} />
              )}
            </>
          )}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-2">
          Type numbers as printed: commas and spaces are ignored. Nothing you type leaves your browser.
        </p>
      </div>

      <div className="rounded-lg border border-line bg-page p-5" aria-live="polite">
        <h3 className="text-sm font-semibold text-ink">Result and working</h3>
        {outcome === null ? (
          <p className="mt-3 text-sm leading-relaxed text-ink-2">
            Enter the figures to see the result, the formula and every step, so you can check it
            yourself.
          </p>
        ) : "error" in outcome ? (
          <p className="mt-3 text-sm leading-relaxed text-ink">{outcome.error}</p>
        ) : calc ? (
          <div className="mt-3 space-y-4 text-sm">
            <p className="text-2xl font-semibold tracking-tight text-ink tabular-nums">{calc.result}</p>
            <div>
              <h4 className="font-semibold text-ink">Formula</h4>
              <p className="mt-1 text-ink-2">{calc.formula}</p>
            </div>
            <div>
              <h4 className="font-semibold text-ink">Working</h4>
              <ol className="mt-1 space-y-1">
                {calc.steps.map((step) => (
                  <li key={step.label} className="text-ink-2">
                    <span className="text-ink">{step.label}:</span>{" "}
                    <span className="tabular-nums break-all">
                      {step.working} = <strong className="font-semibold text-ink">{step.value}</strong>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-ink">Check it in a spreadsheet</h4>
              <p className="mt-1 text-ink-2">
                Put the inputs in cells A1, A2, … in order, then type{" "}
                <code className="rounded bg-surface-2 px-1.5 py-0.5 text-ink break-all">{calc.spreadsheet}</code>
              </p>
            </div>
            <ul className="space-y-1 text-xs leading-relaxed text-ink-2">
              {calc.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={copyRecord}
                className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-on-accent hover:bg-accent-strong"
              >
                Copy the full working
              </button>
              <span className="text-xs text-ink-2" role="status">
                {copied ? "Copied as plain text." : ""}
              </span>
            </div>
          </div>
        ) : null}
        <p className="mt-5 border-t border-line pt-3 text-xs text-ink-2">
          Calculator v{CALCULATOR_VERSION} · exact decimal arithmetic, no floating point · rounded
          half away from zero, for display only
        </p>
      </div>
    </div>
  );
}

/** The calculator's built-in arithmetic checks, re-run in the reader's own browser. */
export function SelfChecks() {
  const checks = runSelfChecks();
  const passed = checks.filter((c) => c.passed).length;
  return (
    <details className="mt-6 rounded-lg border border-line bg-surface p-5">
      <summary className="cursor-pointer text-sm font-semibold text-ink">
        Built-in checks: {passed} of {checks.length} pass
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-ink-2">
        These arithmetic identities run every time the page loads, in your browser. They are not
        budget figures. The same checks, and more, run as automated tests before every release.
      </p>
      <ul className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
        {checks.map((check) => (
          <li key={check.description} className="flex gap-2 text-ink">
            <span className="font-semibold">{check.passed ? "Pass" : "Fail"}</span>
            <span className="text-ink-2">{check.description}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}

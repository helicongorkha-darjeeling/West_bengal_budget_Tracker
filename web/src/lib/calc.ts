/**
 * The calculator's arithmetic: exact decimals, unit conversion and the five
 * calculations the site offers. Every function returns its inputs, formula and
 * steps along with the result, so anyone can redo the sum by hand.
 *
 * No floating point: numbers are held as an integer count of 10^-scale, so
 * 0.1 + 0.2 is exactly 0.3. Rounding happens once, for display, half away from
 * zero. This file holds no financial figures and imports nothing, so it runs
 * under `node --test` as well as in the browser.
 */

export const CALCULATOR_VERSION = "1.0";

/** An exact decimal: `units / 10^scale`. */
export interface Decimal {
  units: bigint;
  scale: number;
}

const TEN = BigInt(10);
const ZERO = BigInt(0);
const ONE = BigInt(1);
const TWO = BigInt(2);

function pow10(n: number): bigint {
  return TEN ** BigInt(n);
}

/**
 * Reads a number as typed or as printed in an official table. Commas and spaces
 * are dropped, so both Indian (1,23,456) and two-digit (12,34,56) groupings read
 * as the same digits. Returns null for anything that is not a plain number.
 */
export function parseDecimal(text: string): Decimal | null {
  const cleaned = text.replace(/[,\s ]/g, "");
  const match = /^([+-]?)(\d*)(?:\.(\d*))?$/.exec(cleaned);
  if (!match) return null;
  const [, sign = "", whole = "", fraction = ""] = match;
  if (whole === "" && fraction === "") return null;
  const units = BigInt(`${whole || "0"}${fraction}`);
  return { units: sign === "-" ? -units : units, scale: fraction.length };
}

function withScale(d: Decimal, scale: number): bigint {
  return d.units * pow10(scale - d.scale);
}

export function add(a: Decimal, b: Decimal): Decimal {
  const scale = Math.max(a.scale, b.scale);
  return { units: withScale(a, scale) + withScale(b, scale), scale };
}

export function subtract(a: Decimal, b: Decimal): Decimal {
  return add(a, { units: -b.units, scale: b.scale });
}

export function abs(d: Decimal): Decimal {
  return { units: d.units < ZERO ? -d.units : d.units, scale: d.scale };
}

export function compare(a: Decimal, b: Decimal): -1 | 0 | 1 {
  const scale = Math.max(a.scale, b.scale);
  const x = withScale(a, scale);
  const y = withScale(b, scale);
  return x === y ? 0 : x < y ? -1 : 1;
}

export function isZero(d: Decimal): boolean {
  return d.units === ZERO;
}

/** Multiplies by 10^n exactly (n may be negative). */
export function shift(d: Decimal, n: number): Decimal {
  if (n >= 0) {
    const drop = Math.min(n, d.scale);
    return { units: d.units * pow10(n - drop), scale: d.scale - drop };
  }
  return { units: d.units, scale: d.scale - n };
}

/** Integer division of p by q (q > 0), rounded half away from zero. */
function roundedQuotient(p: bigint, q: bigint): bigint {
  const negative = p < ZERO;
  const magnitude = negative ? -p : p;
  let quotient = magnitude / q;
  if ((magnitude % q) * TWO >= q) quotient += ONE;
  return negative ? -quotient : quotient;
}

/** Rounds to `places` decimal places, half away from zero. */
export function round(d: Decimal, places: number): Decimal {
  if (d.scale <= places) return { units: withScale(d, places), scale: places };
  return { units: roundedQuotient(d.units, pow10(d.scale - places)), scale: places };
}

/** a ÷ b, rounded half away from zero to `places` decimal places. */
export function divide(a: Decimal, b: Decimal, places: number): Decimal {
  if (isZero(b)) throw new RangeError("Division by zero");
  let p = a.units * pow10(b.scale + places);
  let q = b.units * pow10(a.scale);
  if (q < ZERO) {
    p = -p;
    q = -q;
  }
  return { units: roundedQuotient(p, q), scale: places };
}

/** The exact value, with no rounding and no grouping: "-1234.5". */
export function toPlain(d: Decimal): string {
  const negative = d.units < ZERO;
  const digits = (negative ? -d.units : d.units).toString().padStart(d.scale + 1, "0");
  const whole = digits.slice(0, digits.length - d.scale);
  const fraction = d.scale > 0 ? `.${digits.slice(digits.length - d.scale)}` : "";
  return `${negative ? "-" : ""}${whole}${fraction}`;
}

/** Rounded for display with Indian digit grouping: 1,23,45,678.90. */
export function formatIndian(d: Decimal, places: number): string {
  const plain = toPlain(round(d, places));
  const negative = plain.startsWith("-");
  const [whole = "0", fraction] = (negative ? plain.slice(1) : plain).split(".");
  const lastThree = whole.slice(-3);
  const rest = whole.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  const grouped = rest ? `${rest},${lastThree}` : lastThree;
  const sign = negative && /[1-9]/.test(plain) ? "-" : "";
  return `${sign}${grouped}${fraction ? `.${fraction}` : ""}`;
}

// ---------------------------------------------------------------------------
// Units

export type Unit = "rupees" | "thousand" | "lakh" | "crore";

/** Each unit as a power of ten rupees. 1 crore = 100 lakh = 10,000,000 rupees. */
export const UNITS: Record<Unit, { label: string; exponent: number }> = {
  rupees: { label: "₹ (whole rupees)", exponent: 0 },
  thousand: { label: "₹ thousand", exponent: 3 },
  lakh: { label: "₹ lakh", exponent: 5 },
  crore: { label: "₹ crore", exponent: 7 },
};

export const UNIT_ORDER: readonly Unit[] = ["crore", "lakh", "thousand", "rupees"];

export function convert(value: Decimal, from: Unit, to: Unit): Decimal {
  return shift(value, UNITS[from].exponent - UNITS[to].exponent);
}

// ---------------------------------------------------------------------------
// Calculations

export interface CalcInput {
  label: string;
  value: string;
}

export interface CalcStep {
  label: string;
  /** The working, with the actual numbers substituted. */
  working: string;
  /** The exact result of this step. */
  value: string;
}

export interface Calculation {
  title: string;
  inputs: CalcInput[];
  /** The formula in words and symbols. */
  formula: string;
  /** The same formula for a spreadsheet, with inputs in A1, A2, … */
  spreadsheet: string;
  steps: CalcStep[];
  /** Rounded result for display. */
  result: string;
  /** Unrounded (or computed to stated precision) result. */
  exact: string;
  notes: string[];
  /** Set only by reconciliation. */
  passed?: boolean;
}

const PERCENT_PLACES = 6;
const DISPLAY_PLACES = 2;

const SAME_KIND_NOTE =
  "Derived figure. It is meaningful only if both inputs are in the same unit and of the same kind (budget estimate, revised estimate or actual) and accounting status.";

export function convertUnits(amount: Decimal, from: Unit, to: Unit): Calculation {
  const exponent = UNITS[from].exponent - UNITS[to].exponent;
  const factor = toPlain(shift({ units: ONE, scale: 0 }, exponent));
  const result = convert(amount, from, to);
  return {
    title: "Unit conversion",
    inputs: [
      { label: "Amount", value: `${toPlain(amount)} ${UNITS[from].label}` },
      { label: "Convert to", value: UNITS[to].label },
    ],
    formula: `amount × 10^(${UNITS[from].exponent} − ${UNITS[to].exponent}) = amount × ${factor}`,
    spreadsheet: `=A1*${factor}`,
    steps: [
      {
        label: "Multiply by the factor",
        working: `${toPlain(amount)} × ${factor}`,
        value: toPlain(result),
      },
    ],
    result: `${toPlain(result)} ${UNITS[to].label}`,
    exact: toPlain(result),
    notes: [
      "Exact: converting between these units only moves the decimal point, so nothing is rounded.",
    ],
  };
}

export function shareOf(part: Decimal, whole: Decimal): Calculation {
  if (isZero(whole)) throw new RangeError("The whole cannot be zero");
  const percent = divide(shift(part, 2), whole, PERCENT_PLACES);
  return {
    title: "Share of a total",
    inputs: [
      { label: "Part", value: toPlain(part) },
      { label: "Whole", value: toPlain(whole) },
    ],
    formula: "share (%) = part ÷ whole × 100",
    spreadsheet: "=A1/A2*100",
    steps: [
      {
        label: "Divide and multiply by 100",
        working: `${toPlain(part)} ÷ ${toPlain(whole)} × 100`,
        value: toPlain(percent),
      },
    ],
    result: `${formatIndian(percent, DISPLAY_PLACES)} %`,
    exact: toPlain(percent),
    notes: [
      `Computed to ${PERCENT_PLACES} decimal places, then rounded to ${DISPLAY_PLACES} for display (half away from zero).`,
      SAME_KIND_NOTE,
    ],
  };
}

export function changeBetween(earlier: Decimal, later: Decimal): Calculation {
  const difference = subtract(later, earlier);
  const steps: CalcStep[] = [
    {
      label: "Difference",
      working: `${toPlain(later)} − ${toPlain(earlier)}`,
      value: toPlain(difference),
    },
  ];
  const notes = [SAME_KIND_NOTE];
  let result = formatIndian(difference, DISPLAY_PLACES);
  let exact = toPlain(difference);
  if (isZero(earlier)) {
    notes.unshift("No percentage change: the earlier value is zero.");
  } else {
    const percent = divide(shift(difference, 2), abs(earlier), PERCENT_PLACES);
    steps.push({
      label: "Percentage change",
      working: `${toPlain(difference)} ÷ |${toPlain(earlier)}| × 100`,
      value: toPlain(percent),
    });
    const sign = percent.units > ZERO ? "+" : "";
    result = `${result} (${sign}${formatIndian(percent, DISPLAY_PLACES)} %)`;
    exact = `${exact} (${toPlain(percent)} %)`;
  }
  return {
    title: "Change between two figures",
    inputs: [
      { label: "Earlier", value: toPlain(earlier) },
      { label: "Later", value: toPlain(later) },
    ],
    formula: "difference = later − earlier;  change (%) = difference ÷ |earlier| × 100",
    spreadsheet: "=A2-A1  and  =(A2-A1)/ABS(A1)*100",
    steps,
    result,
    exact,
    notes,
  };
}

export function monthFromYearToDate(currentYtd: Decimal, previousYtd: Decimal): Calculation {
  const month = subtract(currentYtd, previousYtd);
  return {
    title: "One month from two year-to-date totals",
    inputs: [
      { label: "Year-to-date, this month", value: toPlain(currentYtd) },
      { label: "Year-to-date, previous month", value: toPlain(previousYtd) },
    ],
    formula: "month = year-to-date this month − year-to-date previous month",
    spreadsheet: "=A1-A2",
    steps: [
      {
        label: "Subtract",
        working: `${toPlain(currentYtd)} − ${toPlain(previousYtd)}`,
        value: toPlain(month),
      },
    ],
    result: formatIndian(month, DISPLAY_PLACES),
    exact: toPlain(month),
    notes: [
      "Derived monthly figure, labelled as such. For April, the year-to-date figure is already the month.",
      "Both totals must come from the same series and the same financial year. Never use the March(P) and March(Sy) editions as two consecutive months.",
      ...(month.units < ZERO
        ? ["The result is negative: the later total is smaller. This can happen after a correction or reclassification, and should be checked against the source."]
        : []),
    ],
  };
}

/**
 * Checks that printed components add up to a printed total. Each printed number
 * may be off by half a unit in its last printed place, so the allowance is that
 * half-unit times the number of components (the rule in docs/PROJECT_LOG.md).
 */
export function reconcile(components: Decimal[], printedTotal: Decimal, printedPlaces: number): Calculation {
  if (components.length === 0) throw new RangeError("Enter at least one component");
  const sum = components.reduce(add, { units: ZERO, scale: 0 });
  const difference = subtract(sum, printedTotal);
  const halfUnit = shift({ units: BigInt(5), scale: 0 }, -(printedPlaces + 1));
  const allowance: Decimal = { units: halfUnit.units * BigInt(components.length), scale: halfUnit.scale };
  const passed = compare(abs(difference), allowance) <= 0;
  return {
    title: "Do the parts add up to the printed total?",
    inputs: [
      ...components.map((c, i) => ({ label: `Component ${i + 1}`, value: toPlain(c) })),
      { label: "Printed total", value: toPlain(printedTotal) },
      { label: "Decimal places printed", value: String(printedPlaces) },
    ],
    formula: "pass if |sum of components − printed total| ≤ components × ½ unit of the last printed place",
    spreadsheet: `=ABS(SUM(A1:A${components.length})-A${components.length + 1})<=${components.length}*${toPlain(halfUnit)}`,
    steps: [
      { label: "Sum of components", working: components.map(toPlain).join(" + "), value: toPlain(sum) },
      { label: "Difference from printed total", working: `${toPlain(sum)} − ${toPlain(printedTotal)}`, value: toPlain(difference) },
      { label: "Rounding allowance", working: `${components.length} × ${toPlain(halfUnit)}`, value: toPlain(allowance) },
    ],
    result: passed ? "Pass: the parts add up within rounding" : "Does not add up: difference is larger than rounding allows",
    exact: toPlain(difference),
    notes: [
      "A failure is reported, never hidden. It can mean a typing error, a missing component, or a real discrepancy in the document.",
    ],
    passed,
  };
}

/** A plain-text record of a calculation, for copying into notes or a verification log. */
export function toPlainText(calc: Calculation): string {
  const lines = [
    `${calc.title} — West Bengal Budget Tracker calculator v${CALCULATOR_VERSION}`,
    "",
    "Inputs:",
    ...calc.inputs.map((i) => `  ${i.label}: ${i.value}`),
    "",
    `Formula: ${calc.formula}`,
    `Spreadsheet check: ${calc.spreadsheet}`,
    "",
    "Working:",
    ...calc.steps.map((s) => `  ${s.label}: ${s.working} = ${s.value}`),
    "",
    `Result: ${calc.result}`,
    `Exact: ${calc.exact}`,
    "",
    ...calc.notes.map((n) => `Note: ${n}`),
    "Method: exact decimal arithmetic (no floating point); rounding half away from zero, for display only.",
  ];
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Self-checks shown on the site. SYNTHETIC arithmetic identities, not budget figures.

export interface SelfCheck {
  description: string;
  passed: boolean;
}

function d(text: string): Decimal {
  const value = parseDecimal(text);
  if (!value) throw new Error(`Bad self-check literal: ${text}`);
  return value;
}

export function runSelfChecks(): SelfCheck[] {
  const checks: [string, () => boolean][] = [
    ["1 crore = 100 lakh", () => toPlain(convert(d("1"), "crore", "lakh")) === "100"],
    ["1 crore = 1,00,00,000 rupees", () => toPlain(convert(d("1"), "crore", "rupees")) === "10000000"],
    ["1 lakh = 100 thousand", () => toPlain(convert(d("1"), "lakh", "thousand")) === "100"],
    ["12,345 thousand = 1.2345 crore, exactly", () => toPlain(convert(d("12,345"), "thousand", "crore")) === "1.2345"],
    ["0.1 + 0.2 = 0.3 exactly (no floating-point error)", () => toPlain(add(d("0.1"), d("0.2"))) === "0.3"],
    ["2 ÷ 3 × 100 rounds to 66.67", () => formatIndian(divide(d("200"), d("3"), 6), 2) === "66.67"],
    ["0.125 rounds to 0.13 (half away from zero)", () => toPlain(round(d("0.125"), 2)) === "0.13"],
    ["−0.125 rounds to −0.13", () => toPlain(round(d("-0.125"), 2)) === "-0.13"],
    ["Indian grouping: 1,23,45,678.90", () => formatIndian(d("12345678.9"), 2) === "1,23,45,678.90"],
    ["Two-digit printed grouping 12,34,56 reads as 123456", () => toPlain(d("12,34,56")) === "123456"],
    ["Parts within rounding pass: 1.23 + 4.56 vs 5.80", () => reconcile([d("1.23"), d("4.56")], d("5.80"), 2).passed === true],
    ["Parts outside rounding fail: 1.23 + 4.56 vs 5.81", () => reconcile([d("1.23"), d("4.56")], d("5.81"), 2).passed === false],
  ];
  return checks.map(([description, run]) => {
    try {
      return { description, passed: run() };
    } catch {
      return { description, passed: false };
    }
  });
}

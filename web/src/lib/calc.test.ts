// Unit tests for the calculator. SYNTHETIC numbers only. Run with `npm test`.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  add,
  changeBetween,
  convert,
  convertUnits,
  divide,
  formatIndian,
  monthFromYearToDate,
  parseDecimal,
  reconcile,
  round,
  runSelfChecks,
  shareOf,
  shift,
  subtract,
  toPlain,
  toPlainText,
  type Decimal,
} from "./calc.ts";

function d(text: string): Decimal {
  const value = parseDecimal(text);
  assert.ok(value, `could not parse ${text}`);
  return value;
}

describe("parseDecimal", () => {
  it("reads plain, signed and fractional numbers", () => {
    assert.equal(toPlain(d("42")), "42");
    assert.equal(toPlain(d("-3.50")), "-3.50");
    assert.equal(toPlain(d(".5")), "0.5");
    assert.equal(toPlain(d("+7.")), "7");
  });
  it("drops Indian, Western and two-digit comma grouping", () => {
    assert.equal(toPlain(d("1,23,456.78")), "123456.78");
    assert.equal(toPlain(d("123,456.78")), "123456.78");
    assert.equal(toPlain(d("12,34,56")), "123456");
    assert.equal(toPlain(d(" 1 000 ")), "1000");
  });
  it("rejects anything that is not a plain number", () => {
    for (const bad of ["", ".", "-", "1.2.3", "1e5", "₹10", "abc", "10%"]) {
      assert.equal(parseDecimal(bad), null, bad);
    }
  });
});

describe("exact arithmetic", () => {
  it("adds without floating-point error", () => {
    assert.equal(toPlain(add(d("0.1"), d("0.2"))), "0.3");
    assert.equal(toPlain(subtract(d("1"), d("0.9"))), "0.1");
  });
  it("shifts the decimal point exactly", () => {
    assert.equal(toPlain(shift(d("1.5"), 2)), "150");
    assert.equal(toPlain(shift(d("150"), -4)), "0.0150");
  });
  it("rounds half away from zero", () => {
    assert.equal(toPlain(round(d("2.345"), 2)), "2.35");
    assert.equal(toPlain(round(d("-2.345"), 2)), "-2.35");
    assert.equal(toPlain(round(d("2.344"), 2)), "2.34");
    assert.equal(toPlain(round(d("7"), 2)), "7.00");
  });
  it("divides to a stated precision", () => {
    assert.equal(toPlain(divide(d("1"), d("3"), 4)), "0.3333");
    assert.equal(toPlain(divide(d("2"), d("3"), 4)), "0.6667");
    assert.equal(toPlain(divide(d("-1"), d("8"), 2)), "-0.13");
    assert.equal(toPlain(divide(d("1"), d("-8"), 3)), "-0.125");
    assert.throws(() => divide(d("1"), d("0"), 2), RangeError);
  });
});

describe("formatIndian", () => {
  it("groups by thousand, then by hundreds", () => {
    assert.equal(formatIndian(d("12345678.9"), 2), "1,23,45,678.90");
    assert.equal(formatIndian(d("999"), 0), "999");
    assert.equal(formatIndian(d("1000"), 0), "1,000");
    assert.equal(formatIndian(d("100000"), 0), "1,00,000");
    assert.equal(formatIndian(d("-1234567"), 1), "-12,34,567.0");
  });
  it("does not print minus zero", () => {
    assert.equal(formatIndian(d("-0.001"), 2), "0.00");
  });
});

describe("units", () => {
  it("converts between rupees, thousand, lakh and crore exactly", () => {
    assert.equal(toPlain(convert(d("1"), "crore", "lakh")), "100");
    assert.equal(toPlain(convert(d("1"), "crore", "rupees")), "10000000");
    assert.equal(toPlain(convert(d("250"), "lakh", "crore")), "2.50");
    assert.equal(toPlain(convert(d("12345"), "thousand", "crore")), "1.2345");
    assert.equal(toPlain(convert(d("3.7"), "crore", "crore")), "3.7");
  });
  it("records the factor in the formula", () => {
    const calc = convertUnits(d("2"), "crore", "lakh");
    assert.equal(calc.exact, "200");
    assert.equal(calc.spreadsheet, "=A1*100");
  });
});

describe("calculations", () => {
  it("share of a total", () => {
    const calc = shareOf(d("50"), d("200"));
    assert.equal(calc.exact, "25.000000");
    assert.equal(calc.result, "25.00 %");
    assert.throws(() => shareOf(d("1"), d("0")), RangeError);
  });
  it("change between two figures", () => {
    assert.equal(changeBetween(d("100"), d("110")).result, "10.00 (+10.00 %)");
    assert.equal(changeBetween(d("200"), d("150")).result, "-50.00 (-25.00 %)");
    assert.equal(changeBetween(d("-100"), d("-50")).result, "50.00 (+50.00 %)");
    const fromZero = changeBetween(d("0"), d("5"));
    assert.equal(fromZero.steps.length, 1);
    assert.match(fromZero.notes[0] ?? "", /earlier value is zero/);
  });
  it("one month from two year-to-date totals", () => {
    const calc = monthFromYearToDate(d("300.25"), d("120.10"));
    assert.equal(calc.exact, "180.15");
    assert.ok(monthFromYearToDate(d("100"), d("120")).notes.some((n) => n.includes("negative")));
  });
  it("reconciliation allows half a unit per component, no more", () => {
    assert.equal(reconcile([d("1.23"), d("4.56")], d("5.79"), 2).passed, true);
    assert.equal(reconcile([d("1.23"), d("4.56")], d("5.80"), 2).passed, true);
    assert.equal(reconcile([d("1.23"), d("4.56")], d("5.81"), 2).passed, false);
    assert.equal(reconcile([d("10"), d("20"), d("30")], d("61"), 0).passed, true);
    assert.equal(reconcile([d("10"), d("20"), d("30")], d("62"), 0).passed, false);
    assert.throws(() => reconcile([], d("0"), 2), RangeError);
  });
  it("plain-text record carries inputs, formula, working and result", () => {
    const text = toPlainText(shareOf(d("1"), d("4")));
    for (const part of ["Inputs:", "Part: 1", "Whole: 4", "Formula:", "=A1/A2*100", "Working:", "Result: 25.00 %"]) {
      assert.ok(text.includes(part), part);
    }
  });
});

describe("self-checks shown on the site", () => {
  it("all pass", () => {
    const failed = runSelfChecks().filter((c) => !c.passed);
    assert.deepEqual(failed, []);
  });
});

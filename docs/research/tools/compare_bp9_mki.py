"""Compare state-level 2024-25 actuals in Budget Publication No. 9 (Budget at a Glance) with the monthly
Key Indicators "March(Sy) 2025" edition (the closing provisional position for 2024-25).

Optionally also compares both with Appendix 1.1 (time series, labelled "Source: Finance Accounts") of the
CAG's State Finances Audit Report for 2024-25 (Report No. 2 of 2026). That appendix prints whole crore and
its totals can be sums of rounded parts, so those comparisons allow 1 crore.

Prints only match verdicts and relative differences, never the figures themselves.

Usage (isolated mode):
    python -I compare_bp9_mki.py <bp9.pdf> <mki_march_sy_2025.pdf> <pdftotext_exe> [<sfar_2024_25.pdf>]
"""

import re
import subprocess
import sys

import pypdfium2 as pdfium

NUM = re.compile(r"-?\d[\d,]*(?:\.\d+)?")


def numbers(line: str) -> list[float]:
    return [float(token.replace(",", "")) for token in NUM.findall(line)]


def bp9_rows(path: str) -> dict[str, float]:
    """First number (2024-25 Actuals) of the labelled rows on the receipts and expenditure pages."""
    pdf = pdfium.PdfDocument(path)
    rows: dict[str, float] = {}
    for page_index in (4, 6):  # PDF pages 5 (receipts) and 7 (expenditure)
        lines = [" ".join(l.split()) for l in pdf[page_index].get_textpage().get_text_range().splitlines() if l.strip()]
        in_capital = False
        capital_seen: list[str] = []
        for line in lines:
            if line.startswith("CAPITAL EXPENDITURE"):
                in_capital = True
                continue
            match = re.match(r"^([A-Za-z&/\.\- ]+?)\s+(-?\d[\d,]*\.?\d*)\s+-?\d", line)
            if not match:
                continue
            label, first = match.group(1).strip(), float(match.group(2).replace(",", ""))
            if label in ("Total-Revenue Receipt", "Total-Revenue Expenditure", "Total-Receipts", "Total Expenditure"):
                rows.setdefault(label, first)
            if in_capital and label in ("General Services", "Social Services", "Economic Services", "Loans and Advances", "Repayment of Loans to Central Govt. and Others"):
                rows.setdefault(f"CAP {label}", first)
                capital_seen.append(label)
            if label == "Total Capital Expenditure":
                in_capital = False  # later tables on the page reuse the same sector labels
    return rows


def mki_rows(path: str, pdftotext: str) -> dict[str, float]:
    text = subprocess.run([pdftotext, "-f", "1", "-l", "1", "-table", "-enc", "UTF-8", path, "-"], capture_output=True, text=True, check=True).stdout
    rows: dict[str, float] = {}
    wanted = {
        "Revenue Receipts": r"^\s*1\s+Revenue Receipts\s",
        "Revenue Expenditure": r"^\s*4\s+Revenue Expenditure",
        "Capital Expenditure": r"^\s*5\s+Capital Expenditure",
        "Total Expenditure": r"^\s*7\s+Total Expenditure",
        "Loans and Advances": r"^\s*8\s+Loans and Advances Disbursed",
    }
    for line in text.splitlines():
        for key, pattern in wanted.items():
            if re.search(pattern, line):
                values = numbers(re.sub(r"\([^)]*\)", "", line.split(key.split()[0], 1)[-1]))
                # values: [label digits are stripped] -> BE, Actual, %cur, %prev
                values = [v for v in numbers(line)][-4:]
                if len(values) == 4:
                    rows[key] = values[1]  # Actuals
    return rows


# The audit report prints whole crore and its totals can be sums of separately rounded parts (for example
# administrative + programme), so a printed total may sit up to 1 crore from the true value.
SFAR_TOLERANCE = 1.0 + 0.005

SFAR_ROWS = {
    "Revenue Receipts": r"^1\s+Revenue Receipts\s",
    "Revenue Expenditure": r"^10\s+Revenue Expenditure\s",
    "Capital Expenditure": r"^11\s+Capital Expenditure\s",
    "Loans and Advances": r"^12\s+Disbursement of Loans (?:&|and) Advances\s",
}


def sfar_rows(path: str) -> dict[str, float]:
    """2024-25 column (the last number on each row) of Appendix 1.1, 'Time Series Data on the State Government
    Finances'. The appendix runs over three pages, starting at the page that carries its heading."""
    pdf = pdfium.PdfDocument(path)
    pages = [
        [" ".join(l.split()) for l in pdf[i].get_textpage().get_text_range().splitlines() if l.strip()]
        for i in range(len(pdf))
    ]
    start = next(
        (i for i, lines in enumerate(pages) if any(l == "APPENDIX 1.1" for l in lines) and any("Time Series Data" in l for l in lines)),
        None,
    )
    rows: dict[str, float] = {}
    if start is None:
        return rows
    for lines in pages[start : start + 3]:
        for line in lines:
            for key, pattern in SFAR_ROWS.items():
                if re.search(pattern, line) and key not in rows:
                    values = numbers(re.sub(r"^\d+\s+", "", line))
                    if len(values) >= 5:
                        rows[key] = values[-1]  # columns run 2020-21 ... 2024-25
    return rows


def compare(label: str, a: float, b: float, parts: int = 1, unit_error: float = 0.005) -> None:
    # Each printed value is rounded (two decimals by default), so a sum of N parts may differ by up to N x error.
    tolerance = unit_error * parts + 1e-9
    equal = abs(a - b) <= tolerance
    rel = abs(a - b) / abs(b) * 100 if b else float("nan")
    verdict = (
        f"MATCH within printed precision (difference {abs(a - b):.2f} crore, allowed {tolerance:.3f})"
        if equal
        else f"DIFFERENT (difference {abs(a - b):.2f} crore = {rel:.4f} %, allowed {tolerance:.3f})"
    )
    print(f"  {label:<62} {verdict}")


def main(argv: list[str]) -> int:
    bp9 = bp9_rows(argv[1])
    mki = mki_rows(argv[2], argv[3])
    print("BP-9 rows parsed:", sorted(bp9))
    print("MKI rows parsed :", sorted(mki))
    print("\nBudget Publication 9 'Actuals 2024-25'  versus  Monthly Key Indicators 'March(Sy) 2025' actuals:")
    if "Total-Revenue Receipt" in bp9 and "Revenue Receipts" in mki:
        compare("Revenue receipts", bp9["Total-Revenue Receipt"], mki["Revenue Receipts"])
    if "Total-Revenue Expenditure" in bp9 and "Revenue Expenditure" in mki:
        compare("Revenue expenditure", bp9["Total-Revenue Expenditure"], mki["Revenue Expenditure"])
    cap = [bp9.get(f"CAP {n}") for n in ("General Services", "Social Services", "Economic Services")]
    if all(v is not None for v in cap) and "Capital Expenditure" in mki:
        compare("Capital expenditure (BP-9 general+social+economic services)", sum(cap), mki["Capital Expenditure"], parts=3)
    if "CAP Loans and Advances" in bp9 and "Loans and Advances" in mki:
        compare("Loans and advances", bp9["CAP Loans and Advances"], mki["Loans and Advances"])
    if "Total Expenditure" in bp9 and "Total Expenditure" in mki:
        compare("'Total expenditure' as each document defines it", bp9["Total Expenditure"], mki["Total Expenditure"])
    needed = ("Total Expenditure", "CAP Loans and Advances", "CAP Repayment of Loans to Central Govt. and Others")
    if all(k in bp9 for k in needed) and "Total Expenditure" in mki:
        gap = bp9["Total Expenditure"] - mki["Total Expenditure"]
        explained = bp9["CAP Loans and Advances"] + bp9["CAP Repayment of Loans to Central Govt. and Others"]
        compare("BP-9 minus MKI total  vs  loans and advances + repayment of loans", gap, explained, parts=4)

    if len(argv) > 4:
        sfar = sfar_rows(argv[4])
        print("\nSFAR 2024-25 Appendix 1.1 rows parsed:", sorted(sfar))
        print("State Finances Audit Report (Finance Accounts basis, whole crore)  versus  the two documents above:")
        pairs = (
            ("Revenue receipts", "Revenue Receipts", "Total-Revenue Receipt"),
            ("Revenue expenditure", "Revenue Expenditure", "Total-Revenue Expenditure"),
            ("Loans and advances", "Loans and Advances", "CAP Loans and Advances"),
        )
        for label, key, bp9_key in pairs:
            if key in sfar and key in mki:
                compare(f"{label}: SFAR vs MKI March(Sy) 2025", sfar[key], mki[key], unit_error=SFAR_TOLERANCE)
            if key in sfar and bp9_key in bp9:
                compare(f"{label}: SFAR vs BP-9 actuals 2024-25", sfar[key], bp9[bp9_key], unit_error=SFAR_TOLERANCE)
        if "Capital Expenditure" in sfar and "Capital Expenditure" in mki:
            compare("Capital expenditure: SFAR vs MKI March(Sy) 2025", sfar["Capital Expenditure"], mki["Capital Expenditure"], unit_error=SFAR_TOLERANCE)
        if "Capital Expenditure" in sfar and all(v is not None for v in cap):
            compare("Capital expenditure: SFAR vs BP-9 (general+social+economic)", sfar["Capital Expenditure"], sum(cap), unit_error=SFAR_TOLERANCE)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))

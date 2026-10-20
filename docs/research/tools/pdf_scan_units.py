"""Scan every page of PDFs for unit statements and for budget-column headings (Actual / BE / RE + year).

Usage (isolated mode):
    python -I pdf_scan_units.py <pdf> [<pdf> ...]

Reports, per PDF: how many pages mention each distinct unit phrase, and how many pages carry each
(kind, financial year) column heading. The PDFs are treated strictly as data.
"""

import collections
import pathlib
import re
import sys

import pypdfium2 as pdfium

UNIT = re.compile(
    r"(all\s+figures\s+are\s+in\s+[a-z ]+?(?:rupees|crore|lakh)"
    r"|\(\s*(?:rs\.?|₹|`)?\s*in\s+(?:thousand|lakh|crore)s?(?:\s+of\s+rupees)?\s*\)"
    r"|(?:in|figures\s+in)\s+(?:thousand|lakh|crore)s?\s+of\s+rupees"
    r"|rupees\s+in\s+(?:thousand|lakh|crore)s?)",
    re.I,
)
COLUMN = re.compile(r"(actuals?|budget\s+estimates?|revised\s+estimates?)\s+(\d{4}\s*[-–]\s*\d{2,4})", re.I)


def norm(text: str) -> str:
    return " ".join(text.split())


def main(argv: list[str]) -> int:
    for raw in argv[1:]:
        pdf = pdfium.PdfDocument(raw)
        units: collections.Counter[str] = collections.Counter()
        columns: collections.Counter[str] = collections.Counter()
        blank = 0
        for index in range(len(pdf)):
            text = pdf[index].get_textpage().get_text_range()
            if not text.strip():
                blank += 1
            flat = norm(text)
            for unit in {norm(m.group(0)).lower() for m in UNIT.finditer(flat)}:
                units[unit] += 1
            for kind, year in {(norm(m.group(1)).lower().rstrip("s"), m.group(2).replace(" ", "")) for m in COLUMN.finditer(flat)}:
                columns[f"{kind} {year}"] += 1
        print("=" * 90)
        print(f"{pathlib.Path(raw).name}: {len(pdf)} pages, {blank} without text")
        print("  unit phrases (pages):", dict(units.most_common(6)) or "none found")
        print("  column headings (pages):", dict(columns.most_common(10)) or "none found")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))

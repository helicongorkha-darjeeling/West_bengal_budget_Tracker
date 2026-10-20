"""Search PDFs page by page for a regular expression and print matching lines with a little context.

Usage (isolated mode):
    python -I pdf_grep.py <regex> <context_lines> <max_hits_per_pdf> <pdf> [<pdf> ...]

Digits in long numbers are masked as <n> so that figures are not echoed into notes by accident.
The PDFs are treated strictly as data.
"""

import pathlib
import re
import sys

import pypdfium2 as pdfium

NUMBER = re.compile(r"\d{1,3}(?:,\d{2,3})+(?:\.\d+)?|\d+\.\d{2,}")


def main(argv: list[str]) -> int:
    pattern = re.compile(argv[1], re.I)
    context, limit = int(argv[2]), int(argv[3])
    for raw in argv[4:]:
        pdf = pdfium.PdfDocument(raw)
        hits = 0
        print("=" * 90)
        print(pathlib.Path(raw).name, f"({len(pdf)} pages) pattern: {argv[1]}")
        for index in range(len(pdf)):
            lines = [" ".join(line.split()) for line in pdf[index].get_textpage().get_text_range().splitlines()]
            lines = [line for line in lines if line]
            for pos, line in enumerate(lines):
                if pattern.search(line):
                    hits += 1
                    if hits > limit:
                        break
                    print(f"-- PDF page {index + 1}, line {pos + 1}")
                    for ctx in lines[max(0, pos - context) : pos + context + 1]:
                        print("    ", NUMBER.sub("<n>", ctx)[:160])
            if hits > limit:
                print(f"   (more hits omitted; limit {limit})")
                break
        if hits == 0:
            print("   no matches")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))

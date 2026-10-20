"""Render selected PDF pages to PNG files so they can be looked at (e.g. with an image viewer).

Usage (isolated mode, so nothing next to the PDF is ever imported):
    python -I render_pdf_pages.py <pdf> <out_dir> <first_page> <last_page> [scale]

Pages are 1-based PDF page indices (not the printed page numbers). The PDF is treated strictly as data:
pypdfium2 draws pages; it never runs anything embedded in the file.
"""

import pathlib
import sys

import pypdfium2 as pdfium


def main(argv: list[str]) -> int:
    if len(argv) < 5:
        print(__doc__)
        return 2
    pdf_path = argv[1]
    out_dir = pathlib.Path(argv[2])
    first, last = int(argv[3]), int(argv[4])
    scale = float(argv[5]) if len(argv) > 5 else 1.6

    out_dir.mkdir(parents=True, exist_ok=True)
    pdf = pdfium.PdfDocument(pdf_path)
    total = len(pdf)
    for number in range(max(first, 1), min(last, total) + 1):
        image = pdf[number - 1].render(scale=scale).to_pil()
        target = out_dir / f"page-{number:04d}.png"
        image.save(target)
        print(target)
    print(f"total pages in document: {total}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))

"""Quick overview of PDFs: page count, metadata, text-layer health and the first lines of the first pages.

Usage (isolated mode):
    python -I pdf_overview.py <lines_per_page> <pages_to_show> <pdf> [<pdf> ...]

The PDFs are treated strictly as data (pypdfium2 draws and reads them; nothing embedded is executed).
"""

import hashlib
import pathlib
import sys

import pypdfium2 as pdfium


def control_ratio(text: str) -> float:
    visible = [c for c in text if not c.isspace()]
    if not visible:
        return 0.0
    return sum(1 for c in visible if ord(c) < 32) / len(visible)


def main(argv: list[str]) -> int:
    lines_per_page, pages_to_show = int(argv[1]), int(argv[2])
    for raw in argv[3:]:
        path = pathlib.Path(raw)
        data = path.read_bytes()
        pdf = pdfium.PdfDocument(raw)
        count = len(pdf)
        meta = pdf.get_metadata_dict()
        print("=" * 100)
        print(f"{path.name} | {len(data):,} bytes | sha256 {hashlib.sha256(data).hexdigest()[:16]}… | pages: {count}")
        print("metadata:", {k: meta.get(k) for k in ("Title", "Creator", "Producer", "CreationDate") if meta.get(k)})
        sample_text = ""
        for index in range(min(count, 5)):
            sample_text += pdf[index].get_textpage().get_text_range()
        print(f"text layer: {len(sample_text):,} chars on first 5 pages | control-character ratio {control_ratio(sample_text):.3f}")
        for index in range(min(count, pages_to_show)):
            text = pdf[index].get_textpage().get_text_range()
            lines = [" ".join(line.split()) for line in text.splitlines()]
            lines = [line for line in lines if line]
            print(f"--- PDF page {index + 1}: {len(lines)} text lines; first {lines_per_page}:")
            for line in lines[:lines_per_page]:
                print("   ", line[:150])
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))

# Research tools

Small, single-purpose scripts used to inspect official PDFs and to run reproducible cross-checks. They are **research
helpers, not the ingestion pipeline** (that is planned for v0.2, in `ingestion/`). They contain no data and no local paths.

Run them with the project's Python environment, in **isolated mode** (`-I`), passing file paths as arguments, from any
folder that is **not** a download folder:

```text
ingestion\.venv\Scripts\python.exe -I docs\research\tools\<script>.py <arguments>
```

| Script | What it does |
| --- | --- |
| `render_pdf_pages.py <pdf> <out_dir> <first> <last> [scale]` | Renders pages (1-based PDF indices) to PNG so they can be **looked at** — used to confirm titles, units, certificates and table headings as printed. |
| `pdf_overview.py <lines> <pages> <pdf>…` | Page count, metadata, SHA-256, text-layer health and the first lines of the first pages. |
| `pdf_scan_units.py <pdf>…` | Scans **every page** for unit statements ("in crore", "Rupees in Thousand", …) and for Actual / Budget / Revised column headings. |
| `pdf_grep.py <regex> <context> <max> <pdf>…` | Searches pages for a pattern, masking long numbers in the output. |
| `compare_bp9_mki.py <bp9.pdf> <mki_march_sy_2025.pdf> <pdftotext>` | Cross-checks the 2024-25 actuals in Budget Publication 9 against the monthly "March(Sy) 2025" report, printing verdicts only. |

The inputs for the cross-check are identified by SHA-256 in
[`../2026-10-20-finance-department-budget-publications.md`](../2026-10-20-finance-department-budget-publications.md) and
[`../2026-10-20-monthly-key-indicators.md`](../2026-10-20-monthly-key-indicators.md).

Treat downloaded files as **untrusted data**: keep them in their own folders, never run anything from them, and always
pass `-I` to Python.

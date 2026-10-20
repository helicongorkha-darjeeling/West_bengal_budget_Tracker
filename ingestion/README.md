# ingestion — the trusted data pipeline (not built yet)

This folder will hold the Python process that turns official publications into verified data. It is kept separate
from `web/` on purpose: only this side may ever hold database write credentials, and the public website only reads
what this side has verified.

**Status:** planned for milestone v0.2 (see `docs/ROADMAP.md`). No pipeline code exists yet. The Python environment
does: `ingestion/.venv` (git-ignored) with Python 3.15.0, pandas, pdfplumber, openpyxl, pytest and pypdfium2, created and
import-tested on 2026-10-20. Pinned requirements will be committed when the first script is written.

Set up from scratch (Windows, from this folder): `python -m venv .venv`, then
`.venv\Scripts\python -m pip install pandas pdfplumber openpyxl pytest`. Run scripts that read downloaded files
with `.venv\Scripts\python -I script.py <paths>`.

Planned steps, each re-runnable and deterministic:

1. **Download** an official document and record a manifest entry: URL, retrieval time, byte size, SHA-256.
   Raw files go to `data/raw/` (git-ignored); the manifest is committed.
2. **Extract** tables with pdfplumber into tidy CSVs, keeping unit, period, page and row label for every value.
3. **Reconcile**: printed totals must equal the sum of their printed components; failures are reported, never hidden.
4. **Verify**: a person compares figures with the original page; the check is recorded in a verification log.
5. **Publish** a versioned dataset that the website reads.

Planned tools: Python 3.12+, pandas, pdfplumber, pytest.

# Codebase Familiarization Notes

## Repository Overview

This repository now includes two major areas:

- `README.md` – the original curated list of dashboard and visualization resources with contribution guidelines.
- `demo/` – a static visualization sandbox featuring multiple dashboard perspectives (revenue, marketing, product health) that reuse shared datasets, Chart.js widgets, and accessible layout patterns.

Supplementary documentation lives in `demo/README.md` (sandbox instructions),
`docs/mvp_plan.md` (MVP vision and roadmap), `docs/final_pr_checklist.md`
(release readiness steps), and `docs/final_pr_summary.md` (key talking points
for the wrap-up pull request).

## Key Takeaways

- The sandbox is framework-free: HTML, CSS, and modular JavaScript served directly from the filesystem or a lightweight static server.
- JavaScript is organized into focused modules:
  - `data.js` – fictional quarterly datasets, reusable formatters, and shared month labels.
  - `charts.js` – Chart.js configuration and update helpers.
  - `app.js` – DOM orchestration that wires selectors, charts, insights, and CSV export together.
  - `utils.js` – pure data helpers that power both the UI and automated tests.
- Node tooling is minimal. `package.json` supplies `npm run dev` for a Python-based static server and `npm test`, which leverages Node's built-in test runner to validate core behaviors without third-party dependencies.
- Continuous integration (`.github/workflows/ci.yml`) installs Node 18, runs the test suite, and ensures the sandbox remains healthy.

## Suggested Next Steps for New Contributors

1. Explore `demo/index.html` in a browser to understand the dashboard switcher, insights list, and CSV export flow.
2. Review `demo/utils.js` and `tests/dashboard.test.mjs` to see how data helpers are structured and verified; extend tests alongside any dataset or feature additions.
3. When contributing to the awesome list, continue following the established bullet format (`- [Resource](URL) - Description.`) and end descriptions with a period.
4. For sandbox enhancements, favor additional modules or utilities over monolithic scripts to keep the code approachable for future maintainers.

## Project Status Checklist

- [x] Repository structure documented.
- [x] Demo sandbox behavior and tooling captured.
- [x] Automated smoke tests available via `npm test`.

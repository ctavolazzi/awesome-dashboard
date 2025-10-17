# Awesome Dashboard Demo

This self-contained sandbox uses a shared set of fictional quarterly datasets to
power several dashboard configurations. It is intended as a quick way to see the
kinds of widgets you might build with the projects listed in this repository and
to experience a clean, comprehensible dashboard UX without needing a build
system.

## Getting started

1. Open `index.html` directly in your browser **or** start a lightweight static
   server (for example, `python -m http.server --directory demo`). Prefer
   `npm run dev` if you have Node 18+ installed—the command uses Python under the
   hood and matches the automated test harness. When a network connection is
   unavailable the charts gracefully downgrade to inline data tables so you can
   still review the underlying numbers. If JavaScript is disabled you will see a
   banner explaining that the interactive widgets require scripts.
2. Pick a dashboard from the **Dashboard** dropdown to load its widgets,
   metadata, and underlying dataset.
3. Use the **Quarter** selector to toggle the charts and summary table between
   four pre-seeded time periods. The sandbox remembers your last selection so it
   re-opens exactly where you left it.
4. Capture a quick export with **Download this view as CSV** to pull the
   current chart, segment mix, summary metrics, and narrative insights into your
   own tooling.

## Testing

The MVP ships with a zero-dependency smoke test that uses Node's built-in test
runner. From the repository root, execute:

```bash
npm test
```

The checks confirm that the default dashboard loads with the expected quarter,
summary rows surface metric/value pairs, CSV exports include their key sections,
and dataset snapshots remain chart-ready.

## Project structure

The sandbox is intentionally modular so you can remix individual parts:

- `data.js` exposes the shared `dashboards` configuration, the month labels, and
  lightweight number formatters.
- `charts.js` centralizes Chart.js setup (palette, options, tooltips) and
  exports helpers for initialization, updates, and an offline-friendly fallback
  renderer if Chart.js cannot be loaded.
- `utils.js` provides pure helpers for dashboard metadata, summary rows, CSV
  generation, and persisted selection handling.
- `app.js` wires the DOM controls to the data and chart helpers, keeps view
  updates declarative, persists the last dashboard/quarter selection, and
  exposes a CSV export for sharing snapshots.
- `styles.css` layers a calm, card-based UI with a prominent orientation panel
  for clarity, a skip link for keyboard users, visible focus styles, and
  `prefers-reduced-motion` adjustments.

## Included widgets

Every dashboard re-uses the same widgets with dataset-specific text labels:

- **Primary vs. Target**: grouped bar chart with formatters that adapt to the
  active dataset (currency, counts, or percentages).
- **Momentum Trend**: line chart with a soft confidence fill to reinforce
  directionality.
- **Segment Mix**: doughnut chart and explanatory note that describe the channel
  or cohort contribution.
- **KPI Summary**: tabular overview of supporting metrics for quick handoffs,
  with a clear empty state when metrics haven't been populated yet.
- **Highlights & Next Steps**: curated insights that change with each
  dashboard/quarter and a CSV download button for instant exports.

## Layout at a glance

The hero banner frames the sandbox and explains what you can do. A sticky
configuration panel on the left keeps the dropdowns, dashboard description, and
"reading guide" anchored while the right column focuses on the widgets. The
cards share consistent spacing, typography, and annotations so the interface
reads like a tidy, comprehensible dashboard template. For a single-source
handover that captures MVP goals, architecture, testing expectations, and PR
talking points, review [`docs/dashboard_mvp_handover.md`](../docs/dashboard_mvp_handover.md).

Feel free to remix the data or use this as a starting point for prototyping a
new dashboard idea.

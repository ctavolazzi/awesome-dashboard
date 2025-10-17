# Dashboard Sandbox MVP Plan

## Vision
Deliver a shareable, no-backend dashboard sandbox that lets contributors explore curated sample data, switch between scenarios, and export insights without build tooling.

## Target audience
- Repository maintainers who want a polished example to accompany the awesome dashboard list.
- Contributors evaluating dashboard patterns before adopting heavier frameworks.
- Stakeholders reviewing prospective dashboard layouts and copy.

## MVP goals
1. **Launchable in minutes**: open `demo/index.html` or run a single static-server command.
2. **Scenario switching**: toggle between at least three business contexts (e.g., revenue, marketing, product health) while reusing a shared widget set.
3. **Understandable at a glance**: guided orientation, accessible labels, and consistent styling so first-time viewers grasp what they are seeing.
4. **Actionable outputs**: export the currently selected view (charts, summary metrics, narrative notes) for offline sharing.
5. **Confidence in behavior**: automated smoke test that verifies the switcher, data binding, and export flow.

## Technical requirements
- **Static assets only**: HTML, CSS, and JavaScript that run in modern evergreen browsers without bundling.
- **Module organization**: separate files for data definitions, chart helpers, and UI orchestration; no inline script tags.
- **Charting**: Chart.js v4 loaded from CDN, instantiated through reusable helper functions.
- **State management**: in-memory state with optional persistence via `localStorage`, resilient to failures (privacy mode, quota).
- **Accessibility**: descriptive `aria-label`s for all interactive elements, focus-visible styles, semantic table markup, and high-contrast palette meeting WCAG AA.
- **CSV export**: client-side generation that packages chart series, summary metrics, and narrative insights for the active dashboard + quarter.
- **Testing harness**: Node test suite invoked via `npm test` that validates default selections, summary data, CSV output, and chart-ready datasets without requiring external browsers.
- **Documentation**: root README links to demo, `demo/README.md` explains structure, setup, and testing instructions; changelog or release notes optional.

## Simplifications and guardrails
- **Synthetic data only**: keep datasets fictional to avoid privacy/security concerns.
- **Single-page scope**: defer multi-page navigation, authentication, or server-side APIs until after MVP.
- **Shared widgets**: reuse the same chart components across dashboards; postpone bespoke visualizations per scenario.
- **Lightweight styling**: vanilla CSS with custom properties instead of adopting Tailwind/Bulma/etc.
- **Manual responsiveness**: ensure layouts work on mobile/tablet via CSS grid/flexbox; no need for full component library.

## Risks and mitigations
- **Chart.js bundle size**: load via CDN with SRI hash; document offline fallback.
- **Browser storage limitations**: wrap persistence in try/catch; degrade gracefully when storage is unavailable.
- **Test drift**: exercise pure data utilities with deterministic fixtures to avoid browser flakiness.

## Roadmap from current prototype to MVP
1. **Introduce tooling**
   - Add `package.json` with Node-based scripts (`dev`, `test`).
   - Configure `.nvmrc` or engines to communicate Node expectations.
2. **Automated verification**
   - Write Node smoke tests for dashboard switching logic, dataset integrity, insights rendering, and CSV trigger helpers.
   - Integrate GitHub Actions workflow to run tests on push/PR.
3. **Accessibility sweep**
   - Audit focus order, keyboard navigation, and aria attributes; add skip link and focus outlines.
   - Provide reduced-motion preference checks for chart animations.
4. **Data + insight refinement**
   - Normalize datasets (consistent keys, units) and annotate insights with severity/owner tags.
   - Document data schema in `data.js` header comments.
5. **Export enhancements**
   - Include metadata (generated timestamp, filters) in CSV header.
   - Explore JSON export once CSV path is stable (post-MVP).
6. **UX polish**
   - Add inline legends, tooltips, and responsive tweaks based on feedback.
   - Provide printable stylesheet or PDF guidance for sharing offline.

## Expert recommendations
- Ship the automated test harness before expanding data volume; it will catch regressions as we iterate.
- Keep data modular by splitting each dashboard into its own module (`dashboards/revenue.js`, etc.) once tests land, but avoid premature abstraction until we validate the MVP.
- Use semantic HTML and progressive enhancement so the demo remains usable even if scripts fail; this reduces support overhead for newcomers cloning the repo.
- After MVP, consider packaging the sandbox as a GitHub Pages deployment for zero-setup viewing, but defer until automated tests ensure stability.


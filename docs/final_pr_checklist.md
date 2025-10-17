# Final PR Readiness Checklist

Use this list before opening the final pull request so reviewers can pull the
branch, explore the sandbox locally, and trust the automated coverage. Tick
off each step as you verify it.

## Local environment

- [ ] Install Node.js 18.17+ (matches `.nvmrc`).
- [ ] Run `npm install` if dependencies change in the future (the current MVP
      does not require additional packages, but this keeps the workflow
      predictable).
- [ ] Start the sandbox with `npm run dev` and confirm http://localhost:4173
      serves the demo without console errors.

## Functional smoke checks

- [ ] Cycle through **Dashboard** and **Quarter** dropdowns to ensure cards,
      tables, insights, and CSV export stay in sync.
- [ ] Toggle reduced-motion in your OS/browser settings to confirm animations
      gracefully minimize.
- [ ] Temporarily disable JavaScript (or use the browser dev tools command) to
      verify the `<noscript>` banner explains the degraded experience.
- [ ] Block third-party scripts (or simulate offline mode) to confirm charts
      fall back to the inline table/list presentation while metrics remain
      accurate.

## Automated tests

- [ ] Execute `npm test` and confirm all Node built-in smoke tests pass.
- [ ] Review the GitHub Actions run (workflow: `CI`) to make sure the branch
      stays green in the shared environment.

## Documentation & assets

- [ ] Update `demo/README.md` if usage flows change (controls, datasets,
      exports, fallbacks).
- [ ] Refresh screenshots in the pull request description when UI changes are
      visible; capture the image at 1440×900 for consistency.
- [ ] Mention accessibility or resilience improvements (skip links, fallbacks,
      reduced motion) so reviewers know what to validate.

## Ready to merge

- [ ] Squash commits or write a clear history that mirrors the checklist
      completions above.
- [ ] Double-check the pull request summary calls out how to run the sandbox
      (`npm run dev`) and how to execute automated checks (`npm test`).

Documenting these steps keeps the MVP stable and makes the final PR easy to
review, even for contributors who are joining the project for the first time.

import test from "node:test";
import assert from "node:assert/strict";
import {
  buildCsv,
  defaultSelection,
  getDashboardOptions,
  getInsights,
  getQuarterOptions,
  getQuarterSnapshot,
  getSummaryRows,
  normalizeSelection,
} from "../demo/utils.js";

const CSV_SECTION_SEPARATOR = "\n\n";

function extractCsvSections(csv) {
  return csv.split(CSV_SECTION_SEPARATOR).filter(Boolean);
}

test("default selection surfaces the first dashboard and quarter", () => {
  const selection = defaultSelection();
  assert.ok(selection, "expected a default selection to be returned");
  assert.strictEqual(selection.dashboard, getDashboardOptions()[0].key);
  assert.strictEqual(selection.quarter, getQuarterOptions(selection.dashboard)[0]);
});

test("normalize selection repairs incomplete stored values", () => {
  const options = getDashboardOptions();
  const marketing = options.find((option) => option.key === "marketing");
  assert.ok(marketing, "marketing dashboard should exist");

  const repaired = normalizeSelection({ dashboard: marketing.key });
  assert.strictEqual(repaired.dashboard, marketing.key);
  assert.strictEqual(repaired.quarter, getQuarterOptions(marketing.key)[0]);

  const fallback = normalizeSelection({ dashboard: "unknown", quarter: "Q9" });
  assert.deepEqual(fallback, defaultSelection());
});

test("summary rows provide metric/value pairs", () => {
  const selection = defaultSelection();
  const rows = getSummaryRows(selection.dashboard, selection.quarter);
  assert.ok(rows.length > 0, "summary rows should not be empty");
  rows.forEach((row) => {
    assert.ok(row.metric.length > 0);
    assert.ok(row.value.length > 0);
  });
});

test("insights hydrate per dashboard and quarter", () => {
  const selection = defaultSelection();
  const insights = getInsights(selection.dashboard, selection.quarter);
  assert.ok(Array.isArray(insights));
});

test("CSV export includes key sections", () => {
  const selection = defaultSelection();
  const csv = buildCsv(selection.dashboard, selection.quarter);
  assert.ok(csv.includes("Dashboard"));
  const sections = extractCsvSections(csv);
  assert.ok(sections.length >= 3, "expected dashboard, segments, and summary sections");

  const [metadataSection, chartSection] = sections;
  assert.ok(metadataSection.includes(`Dashboard,`), "metadata should describe the view");
  assert.ok(chartSection.includes("Month"), "chart section should list months");
});

test("quarter snapshot exposes chart-ready data", () => {
  const selection = defaultSelection();
  const snapshot = getQuarterSnapshot(selection.dashboard, selection.quarter);
  assert.ok(snapshot, "snapshot should exist for default selection");
  assert.ok(Array.isArray(snapshot.primary));
  assert.ok(Array.isArray(snapshot.comparison));
});

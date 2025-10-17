import { dashboards } from "./data.js";
import { initializeCharts, updateCharts } from "./charts.js";
import {
  buildCsv,
  defaultSelection,
  getCardCopy,
  getDashboardCopy,
  getDashboardOptions,
  getInsights,
  getQuarterOptions,
  getSummaryRows,
  normalizeSelection,
} from "./utils.js";

const dashboardSelect = document.getElementById("dashboard");
const quarterSelect = document.getElementById("quarter");
const badge = document.getElementById("dashboardBadge");
const description = document.getElementById("dashboardDescription");
const summaryTable = document.getElementById("summaryTable");
const barTitle = document.getElementById("barTitle");
const lineTitle = document.getElementById("lineTitle");
const doughnutTitle = document.getElementById("doughnutTitle");
const summaryTitle = document.getElementById("summaryTitle");
const insightsTitle = document.getElementById("insightsTitle");
const insightsList = document.getElementById("insightsList");
const downloadButton = document.getElementById("downloadCsv");
let canvases;

let charts;

const STORAGE_KEY = "awesome-dashboard-selection-v1";

function populateDashboardOptions() {
  getDashboardOptions().forEach((optionConfig) => {
    const option = document.createElement("option");
    option.value = optionConfig.key;
    option.textContent = optionConfig.label;
    dashboardSelect.appendChild(option);
  });
}

function populateQuarterOptions(dashboardKey) {
  quarterSelect.innerHTML = "";
  const quarterKeys = getQuarterOptions(dashboardKey);
  quarterKeys.forEach((quarter) => {
    const option = document.createElement("option");
    option.value = quarter;
    option.textContent = quarter;
    quarterSelect.appendChild(option);
  });
  return quarterKeys[0];
}

function updateMeta(dashboardKey) {
  const { label, description: dashboardDescription } =
    getDashboardCopy(dashboardKey);
  badge.textContent = label;
  description.textContent = dashboardDescription;
}

function updateCardHeadings(dashboardKey) {
  const cards = getCardCopy(dashboardKey);
  barTitle.textContent = cards.bar.title;
  lineTitle.textContent = cards.line.title;
  doughnutTitle.textContent = cards.doughnut.title;
  summaryTitle.textContent = cards.summary.title;
  insightsTitle.textContent = cards.insights.title;
  canvases.bar.setAttribute("aria-label", cards.bar.ariaLabel);
  canvases.line.setAttribute("aria-label", cards.line.ariaLabel);
  canvases.doughnut.setAttribute("aria-label", cards.doughnut.ariaLabel);
}

function renderSummary(dashboardKey, quarterKey) {
  const rows = getSummaryRows(dashboardKey, quarterKey);
  summaryTable.innerHTML = "";

  if (!rows.length) {
    const row = document.createElement("tr");

    const cell = document.createElement("td");
    cell.colSpan = 2;
    cell.className = "table__empty";
    cell.textContent = "Summary metrics will appear here once defined.";

    row.appendChild(cell);
    summaryTable.appendChild(row);
    return;
  }

  rows.forEach(({ metric, value }) => {
    const row = document.createElement("tr");

    const metricCell = document.createElement("th");
    metricCell.scope = "row";
    metricCell.textContent = metric;

    const valueCell = document.createElement("td");
    valueCell.textContent = value;

    row.append(metricCell, valueCell);
    summaryTable.appendChild(row);
  });
}

function renderInsights(dashboardKey, quarterKey) {
  const insights = getInsights(dashboardKey, quarterKey);
  insightsList.innerHTML = "";

  if (!insights.length) {
    const item = document.createElement("li");
    item.textContent = "No narrative notes provided for this view yet.";
    insightsList.appendChild(item);
    return;
  }

  insights.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = entry;
    insightsList.appendChild(item);
  });
}

function persistSelection(dashboardKey, quarterKey) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ dashboard: dashboardKey, quarter: quarterKey })
    );
  } catch (error) {
    // Ignore storage errors (e.g., privacy mode)
  }
}

function readStoredSelection() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (error) {
    return null;
  }
}

function downloadCurrentView() {
  const dashboardKey = dashboardSelect.value;
  const quarterKey = quarterSelect.value;
  const csvContent = buildCsv(dashboardKey, quarterKey);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${dashboardKey}-${quarterKey}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function syncDashboardState() {
  const dashboardKey = dashboardSelect.value;
  const quarterKey = quarterSelect.value;
  const dashboard = dashboards[dashboardKey];

  updateCardHeadings(dashboardKey);
  updateMeta(dashboardKey);
  updateCharts(charts, dashboard, quarterKey);
  renderSummary(dashboardKey, quarterKey);
  renderInsights(dashboardKey, quarterKey);
  persistSelection(dashboardKey, quarterKey);
}

function handleDashboardChange() {
  const dashboardKey = dashboardSelect.value;
  const firstQuarter = populateQuarterOptions(dashboardKey);
  quarterSelect.value = firstQuarter;
  syncDashboardState();
}

function handleQuarterChange() {
  syncDashboardState();
}

function initialize() {
  canvases = {
    bar: document.getElementById("barChart"),
    line: document.getElementById("lineChart"),
    doughnut: document.getElementById("doughnutChart"),
  };

  charts = initializeCharts({
    bar: canvases.bar,
    line: canvases.line,
    doughnut: canvases.doughnut,
  });

  populateDashboardOptions();
  const storedSelection = normalizeSelection(readStoredSelection());
  const fallbackSelection = defaultSelection();
  const activeSelection = storedSelection ?? fallbackSelection;

  const initialDashboard = activeSelection?.dashboard ?? fallbackSelection.dashboard;
  dashboardSelect.value = initialDashboard;

  const firstQuarter = populateQuarterOptions(initialDashboard);
  const initialQuarter = activeSelection?.quarter ?? firstQuarter;
  quarterSelect.value = getQuarterOptions(initialDashboard).includes(initialQuarter)
    ? initialQuarter
    : firstQuarter;
  syncDashboardState();

  dashboardSelect.addEventListener("change", handleDashboardChange);
  quarterSelect.addEventListener("change", handleQuarterChange);
  downloadButton.addEventListener("click", downloadCurrentView);
}

document.addEventListener("DOMContentLoaded", initialize);

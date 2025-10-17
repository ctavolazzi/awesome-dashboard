import { dashboards, formatters, months } from "./data.js";

export function listDashboards() {
  return Object.keys(dashboards);
}

export function getDashboardOptions() {
  return listDashboards().map((key) => ({
    key,
    label: dashboards[key].label,
  }));
}

export function getQuarterOptions(dashboardKey) {
  return Object.keys(dashboards[dashboardKey]?.quarters ?? {});
}

export function getDashboardCopy(dashboardKey) {
  const config = dashboards[dashboardKey];
  if (!config) {
    return { label: "", description: "" };
  }
  return { label: config.label, description: config.description };
}

export function getCardCopy(dashboardKey) {
  const cards = dashboards[dashboardKey]?.cards;
  if (!cards) {
    return {
      bar: { title: "", ariaLabel: "" },
      line: { title: "", ariaLabel: "" },
      doughnut: { title: "", ariaLabel: "" },
      summary: { title: "" },
      insights: { title: "" },
    };
  }
  return {
    bar: { ...cards.bar },
    line: { ...cards.line },
    doughnut: { ...cards.doughnut },
    summary: { ...cards.summary },
    insights: { ...cards.insights },
  };
}

export function getSummaryRows(dashboardKey, quarterKey) {
  const summary =
    dashboards[dashboardKey]?.quarters?.[quarterKey]?.summary ?? {};
  return Object.entries(summary).map(([metric, value]) => ({
    metric,
    value,
  }));
}

export function getInsights(dashboardKey, quarterKey) {
  return (
    dashboards[dashboardKey]?.quarters?.[quarterKey]?.insights ?? []
  ).slice();
}

export function getQuarterSnapshot(dashboardKey, quarterKey) {
  return dashboards[dashboardKey]?.quarters?.[quarterKey] ?? null;
}

export function escapeCsv(value) {
  if (value === null || value === undefined) {
    return "";
  }
  const stringValue = String(value);
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

export function buildCsv(dashboardKey, quarterKey) {
  const dashboard = dashboards[dashboardKey];
  const quarter = dashboard?.quarters?.[quarterKey];
  if (!dashboard || !quarter) {
    return "";
  }

  const formatter = formatters[dashboard.formatter] ?? formatters.text;
  const lines = [];

  lines.push(["Dashboard", dashboard.label].map(escapeCsv).join(","));
  lines.push(["Quarter", quarterKey].map(escapeCsv).join(","));
  lines.push("");

  lines.push(
    ["Month", dashboard.cards.bar.primaryLabel, dashboard.cards.bar.comparisonLabel]
      .map(escapeCsv)
      .join(",")
  );

  months.forEach((month, index) => {
    const row = [
      month,
      formatter(quarter.primary[index]),
      quarter.comparison?.length
        ? formatter(quarter.comparison[index])
        : "",
    ];
    lines.push(row.map(escapeCsv).join(","));
  });

  lines.push("");
  lines.push(["Segment", dashboard.cards.doughnut.legendTitle].map(escapeCsv).join(","));
  Object.entries(quarter.segments).forEach(([segment, value]) => {
    const percent = new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(value);
    lines.push([segment, percent].map(escapeCsv).join(","));
  });

  lines.push("");
  lines.push([dashboard.cards.summary.title, ""].map(escapeCsv).join(","));
  Object.entries(quarter.summary).forEach(([metric, value]) => {
    lines.push([metric, value].map(escapeCsv).join(","));
  });

  if (quarter.insights?.length) {
    lines.push("");
    lines.push([dashboard.cards.insights.title, ""].map(escapeCsv).join(","));
    quarter.insights.forEach((insight) => {
      lines.push(["-", insight].map(escapeCsv).join(","));
    });
  }

  return lines.join("\n");
}

export function defaultSelection() {
  const dashboardsOrder = listDashboards();
  const dashboard = dashboardsOrder[0] ?? null;
  const quarter = dashboard ? getQuarterOptions(dashboard)[0] ?? null : null;
  return dashboard && quarter ? { dashboard, quarter } : null;
}

export function normalizeSelection(selection) {
  const fallback = defaultSelection();
  if (!fallback) {
    return null;
  }

  if (!selection || typeof selection !== "object") {
    return fallback;
  }

  const { dashboard, quarter } = selection;
  if (!dashboard || !dashboards[dashboard]) {
    return fallback;
  }

  const validQuarters = getQuarterOptions(dashboard);
  if (!validQuarters.length) {
    return fallback;
  }

  if (!quarter || !validQuarters.includes(quarter)) {
    return { dashboard, quarter: validQuarters[0] };
  }

  return { dashboard, quarter };
}

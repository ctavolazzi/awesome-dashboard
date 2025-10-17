import { formatters, months } from "./data.js";

const motionQuery =
  typeof window !== "undefined" && "matchMedia" in window
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

const animationSetting = () =>
  motionQuery?.matches
    ? false
    : {
        duration: 600,
        easing: "easeOutQuart",
      };

const palette = {
  primary: "#6366F1",
  primaryLight: "rgba(99, 102, 241, 0.1)",
  comparison: "#CBD5F5",
  doughnut: ["#6366F1", "#0EA5E9", "#22C55E", "#F59E0B"],
};

const defaultOptions = {
  maintainAspectRatio: false,
  responsive: true,
  animation: animationSetting(),
  interaction: {
    intersect: false,
    mode: "index",
  },
  plugins: {
    legend: {
      labels: {
        font: {
          family: "Inter, 'Segoe UI', system-ui, sans-serif",
        },
        color: "#334155",
      },
    },
    tooltip: {
      backgroundColor: "#0f172a",
      titleFont: { weight: 600 },
      bodyFont: { weight: 500 },
      padding: 12,
      callbacks: {},
    },
  },
  scales: {
    x: {
      ticks: { color: "#475569" },
      grid: { color: "rgba(148, 163, 184, 0.2)" },
    },
    y: {
      ticks: { color: "#475569" },
      grid: { color: "rgba(148, 163, 184, 0.2)" },
    },
  },
};

const hasChartJs =
  typeof window !== "undefined" && typeof window.Chart !== "undefined";

export function initializeCharts(canvasElements) {
  if (!hasChartJs) {
    return createFallbackCharts(canvasElements);
  }

  const bar = new Chart(canvasElements.bar, {
    type: "bar",
    data: {
      labels: months,
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: palette.primary,
          borderRadius: 10,
          maxBarThickness: 48,
        },
        {
          label: "",
          data: [],
          backgroundColor: palette.comparison,
          borderRadius: 10,
          maxBarThickness: 48,
        },
      ],
    },
    options: {
      ...defaultOptions,
      plugins: {
        ...defaultOptions.plugins,
        legend: { display: false },
      },
    },
  });

  const line = new Chart(canvasElements.line, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "",
          data: [],
          borderColor: palette.primary,
          backgroundColor: palette.primaryLight,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 2,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      ...defaultOptions,
      plugins: {
        ...defaultOptions.plugins,
        legend: { display: false },
      },
    },
  });

  const doughnut = new Chart(canvasElements.doughnut, {
    type: "doughnut",
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: palette.doughnut,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      ...defaultOptions,
      plugins: {
        ...defaultOptions.plugins,
        legend: {
          position: "right",
          labels: {
            boxWidth: 16,
            boxHeight: 16,
            color: "#334155",
          },
          title: {
            display: true,
            text: "",
            color: "#1e293b",
            font: { weight: 600 },
          },
        },
        tooltip: {
          ...defaultOptions.plugins.tooltip,
          callbacks: {
            label: (context) => {
              const label = context.label || "";
              const value = percentFormatter(context.parsed);
              return `${label}: ${value}`;
            },
          },
        },
      },
      cutout: "62%",
    },
  });

  const charts = { bar, line, doughnut, mode: "chartjs" };

  if (motionQuery) {
    const listener = (event) => {
      const animation = event.matches ? false : animationSetting();
      [bar, line, doughnut].forEach((chart) => {
        chart.options.animation = animation;
        chart.update("none");
      });
    };

    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", listener);
    } else if (typeof motionQuery.addListener === "function") {
      motionQuery.addListener(listener);
    }
  }

  return charts;
}

const percentFormatter = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);

export function updateCharts(charts, dashboard, quarterKey) {
  if (!charts) return;

  if (charts.mode === "fallback") {
    updateFallbackCharts(charts, dashboard, quarterKey);
    return;
  }

  const { formatter } = dashboard;
  const formatterFn = formatters[formatter] ?? formatters.text;
  const { primary, comparison, segments } = dashboard.quarters[quarterKey];
  const tickFormatter = (value) => formatterFn(value);
  const updateMode = motionQuery?.matches ? "none" : undefined;

  charts.bar.data.datasets[0].label = dashboard.cards.bar.primaryLabel;
  charts.bar.data.datasets[0].data = primary;
  charts.bar.data.datasets[1].label = dashboard.cards.bar.comparisonLabel;
  charts.bar.data.datasets[1].data = comparison;
  charts.bar.options.plugins.tooltip.callbacks.label = (context) => {
    const datasetLabel = context.dataset.label || "";
    const value = context.parsed.y ?? context.parsed;
    return `${datasetLabel}: ${formatterFn(value)}`;
  };
  charts.bar.options.scales.y.ticks.callback = tickFormatter;
  charts.bar.update(updateMode);

  charts.line.data.datasets[0].label = dashboard.cards.line.primaryLabel;
  charts.line.data.datasets[0].data = primary;
  charts.line.options.plugins.tooltip.callbacks.label = (context) => {
    const value = context.parsed.y ?? context.parsed;
    return `${context.dataset.label}: ${formatterFn(value)}`;
  };
  charts.line.options.scales.y.ticks.callback = tickFormatter;
  charts.line.update(updateMode);

  const segmentLabels = Object.keys(segments);
  const segmentValues = Object.values(segments);

  charts.doughnut.data.labels = segmentLabels;
  charts.doughnut.data.datasets[0].data = segmentValues;
  charts.doughnut.options.plugins.legend.title.text =
    dashboard.cards.doughnut.legendTitle;
  charts.doughnut.options.plugins.tooltip.callbacks.label = (context) => {
    const label = context.label || "";
    return `${label}: ${percentFormatter(context.parsed)}`;
  };
  charts.doughnut.update(updateMode);
}

function createFallbackCharts(canvasElements) {
  const bar = createFallbackTable(canvasElements.bar, {
    columns: ["Month", "Actual", "Target"],
    emptyLabel: "No data available for this dashboard.",
  });

  const line = createFallbackTable(canvasElements.line, {
    columns: ["Month", "Value"],
    emptyLabel: "No trend data available for this dashboard.",
  });

  const doughnut = createFallbackList(canvasElements.doughnut, {
    emptyLabel: "No segment data available for this dashboard.",
  });

  return { bar, line, doughnut, mode: "fallback" };
}

function hideCanvas(canvas) {
  canvas.setAttribute("data-chart-hidden", "true");
  canvas.style.display = "none";
}

function createFallbackTable(canvas, { columns, emptyLabel }) {
  hideCanvas(canvas);

  const wrapper = document.createElement("div");
  wrapper.className = "chart-fallback";

  const table = document.createElement("table");
  table.className = "chart-fallback__table";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  columns.forEach((column) => {
    const cell = document.createElement("th");
    cell.scope = "col";
    cell.textContent = column;
    headerRow.appendChild(cell);
  });
  thead.appendChild(headerRow);

  const tbody = document.createElement("tbody");

  table.append(thead, tbody);
  wrapper.appendChild(table);
  canvas.after(wrapper);

  return { type: "table", wrapper, table, tbody, columns, emptyLabel };
}

function createFallbackList(canvas, { emptyLabel }) {
  hideCanvas(canvas);

  const wrapper = document.createElement("div");
  wrapper.className = "chart-fallback";

  const list = document.createElement("dl");
  list.className = "chart-fallback__list";
  wrapper.appendChild(list);
  canvas.after(wrapper);

  return { type: "list", wrapper, list, emptyLabel };
}

function updateFallbackCharts(charts, dashboard, quarterKey) {
  const formatterFn = formatters[dashboard?.formatter] ?? formatters.text;
  const quarter = dashboard?.quarters?.[quarterKey];

  if (!quarter) {
    clearFallbackTable(charts.bar);
    clearFallbackTable(charts.line);
    clearFallbackList(charts.doughnut);
    return;
  }

  updateFallbackTable(charts.bar, (tbody) => {
    months.forEach((month, index) => {
      const row = document.createElement("tr");

      const monthCell = document.createElement("th");
      monthCell.scope = "row";
      monthCell.textContent = month;

      const primaryCell = document.createElement("td");
      primaryCell.textContent = formatterFn(quarter.primary[index]);

      const comparisonCell = document.createElement("td");
      const comparisonValue = quarter.comparison?.[index];
      comparisonCell.textContent =
        typeof comparisonValue === "number"
          ? formatterFn(comparisonValue)
          : "—";

      row.append(monthCell, primaryCell, comparisonCell);
      tbody.appendChild(row);
    });
  });

  updateFallbackTable(charts.line, (tbody) => {
    months.forEach((month, index) => {
      const row = document.createElement("tr");

      const monthCell = document.createElement("th");
      monthCell.scope = "row";
      monthCell.textContent = month;

      const valueCell = document.createElement("td");
      valueCell.textContent = formatterFn(quarter.primary[index]);

      row.append(monthCell, valueCell);
      tbody.appendChild(row);
    });
  });

  updateFallbackList(charts.doughnut, quarter.segments);
}

function clearFallbackTable(chart) {
  if (!chart || chart.type !== "table") return;
  chart.tbody.innerHTML = "";
  appendEmptyStateRow(chart);
}

function clearFallbackList(chart) {
  if (!chart || chart.type !== "list") return;
  chart.list.innerHTML = "";
  appendEmptyStateList(chart);
}

function updateFallbackTable(chart, buildRows) {
  if (!chart || chart.type !== "table") return;
  chart.tbody.innerHTML = "";
  if (typeof buildRows === "function") {
    buildRows(chart.tbody);
  }
  if (!chart.tbody.children.length) {
    appendEmptyStateRow(chart);
  }
}

function appendEmptyStateRow(chart) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = chart.columns.length;
  cell.textContent = chart.emptyLabel;
  row.appendChild(cell);
  chart.tbody.appendChild(row);
}

function updateFallbackList(chart, segments) {
  if (!chart || chart.type !== "list") return;
  chart.list.innerHTML = "";
  const entries = Object.entries(segments ?? {});
  if (!entries.length) {
    appendEmptyStateList(chart);
    return;
  }

  entries.forEach(([label, value]) => {
    const term = document.createElement("dt");
    term.textContent = label;

    const definition = document.createElement("dd");
    definition.textContent = percentFormatter(value);

    chart.list.append(term, definition);
  });
}

function appendEmptyStateList(chart) {
  const term = document.createElement("dt");
  term.textContent = "Unavailable";
  const definition = document.createElement("dd");
  definition.textContent = chart.emptyLabel;
  chart.list.append(term, definition);
}

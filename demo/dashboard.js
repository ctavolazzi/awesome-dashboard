const months = ["Jan", "Feb", "Mar", "Apr"]; 

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const formatters = {
  currency: (value) => currencyFormatter.format(value),
  number: (value) => numberFormatter.format(value),
};

const dashboards = {
  revenue: {
    label: "Revenue Performance",
    description:
      "Track bookings against plan and highlight the go-to-market channels that fuel quarterly growth.",
    formatter: "currency",
    cards: {
      bar: {
        title: "Revenue vs Target",
        primaryLabel: "Revenue",
        comparisonLabel: "Target",
        ariaLabel: "Bar chart comparing revenue to target by month",
      },
      line: {
        title: "Revenue Trend",
        primaryLabel: "Revenue",
        ariaLabel: "Line chart showing revenue trajectory",
      },
      doughnut: {
        title: "Channel Breakdown",
        legendTitle: "Revenue share by channel",
        ariaLabel: "Doughnut chart showing revenue share by channel",
      },
      summary: {
        title: "Quarterly Summary",
      },
    },
    quarters: {
      Q1: {
        primary: [120000, 135000, 128000, 142000],
        comparison: [115000, 130000, 125000, 140000],
        segments: {
          Direct: 0.45,
          Partners: 0.25,
          "Self-serve": 0.2,
          Enterprise: 0.1,
        },
        summary: {
          Revenue: "$525K",
          Target: "$510K",
          "YoY Growth": "12.4%",
          NPS: "48",
        },
      },
      Q2: {
        primary: [145000, 151000, 160500, 168000],
        comparison: [140000, 148000, 155000, 165000],
        segments: {
          Direct: 0.4,
          Partners: 0.3,
          "Self-serve": 0.18,
          Enterprise: 0.12,
        },
        summary: {
          Revenue: "$624K",
          Target: "$608K",
          "YoY Growth": "14.8%",
          NPS: "52",
        },
      },
      Q3: {
        primary: [158000, 164000, 170000, 176000],
        comparison: [150000, 158000, 165000, 172000],
        segments: {
          Direct: 0.42,
          Partners: 0.28,
          "Self-serve": 0.2,
          Enterprise: 0.1,
        },
        summary: {
          Revenue: "$668K",
          Target: "$645K",
          "YoY Growth": "15.9%",
          NPS: "55",
        },
      },
      Q4: {
        primary: [172000, 182000, 191000, 205000],
        comparison: [165000, 175000, 184000, 198000],
        segments: {
          Direct: 0.38,
          Partners: 0.32,
          "Self-serve": 0.22,
          Enterprise: 0.08,
        },
        summary: {
          Revenue: "$750K",
          Target: "$722K",
          "YoY Growth": "18.3%",
          NPS: "58",
        },
      },
    },
  },
  marketing: {
    label: "Pipeline Acceleration",
    description:
      "Visualize how demand generation programs perform against goal and which initiatives are producing sales-ready pipeline.",
    formatter: "number",
    cards: {
      bar: {
        title: "Qualified Leads vs Goal",
        primaryLabel: "Qualified Leads",
        comparisonLabel: "Goal",
        ariaLabel: "Bar chart comparing qualified leads with goal by month",
      },
      line: {
        title: "Lead Momentum",
        primaryLabel: "Qualified Leads",
        ariaLabel: "Line chart showing qualified lead trajectory",
      },
      doughnut: {
        title: "Campaign Mix",
        legendTitle: "Leads by campaign source",
        ariaLabel: "Doughnut chart showing contribution by marketing channel",
      },
      summary: {
        title: "Pipeline Summary",
      },
    },
    quarters: {
      Q1: {
        primary: [410, 430, 460, 495],
        comparison: [400, 420, 450, 480],
        segments: {
          "Content Marketing": 0.33,
          "Paid Media": 0.27,
          Webinars: 0.21,
          "Lifecycle Email": 0.19,
        },
        summary: {
          "Qualified Leads": "1,795",
          "Opportunities Created": "286",
          "Pipeline Influenced": "$1.6M",
          "Top Campaign": "Product Launch Webinars",
        },
      },
      Q2: {
        primary: [520, 540, 580, 610],
        comparison: [500, 520, 560, 590],
        segments: {
          "Content Marketing": 0.31,
          "Paid Media": 0.29,
          Webinars: 0.22,
          "Lifecycle Email": 0.18,
        },
        summary: {
          "Qualified Leads": "2,250",
          "Opportunities Created": "344",
          "Pipeline Influenced": "$2.1M",
          "Top Campaign": "Customer Story Series",
        },
      },
      Q3: {
        primary: [580, 610, 640, 670],
        comparison: [560, 590, 620, 650],
        segments: {
          "Content Marketing": 0.3,
          "Paid Media": 0.28,
          Webinars: 0.23,
          "Lifecycle Email": 0.19,
        },
        summary: {
          "Qualified Leads": "2,500",
          "Opportunities Created": "372",
          "Pipeline Influenced": "$2.4M",
          "Top Campaign": "Lifecycle Nurture Refresh",
        },
      },
      Q4: {
        primary: [620, 660, 690, 730],
        comparison: [600, 640, 670, 710],
        segments: {
          "Content Marketing": 0.28,
          "Paid Media": 0.3,
          Webinars: 0.24,
          "Lifecycle Email": 0.18,
        },
        summary: {
          "Qualified Leads": "2,700",
          "Opportunities Created": "398",
          "Pipeline Influenced": "$2.7M",
          "Top Campaign": "Year-end Upgrade Push",
        },
      },
    },
  },
  product: {
    label: "Product Health",
    description:
      "Monitor active usage, adoption goals, and the customer mix powering product engagement.",
    formatter: "number",
    cards: {
      bar: {
        title: "Active Users vs Goal",
        primaryLabel: "Active Users",
        comparisonLabel: "Adoption Goal",
        ariaLabel: "Bar chart comparing active users with goal by month",
      },
      line: {
        title: "Usage Trend",
        primaryLabel: "Active Users",
        ariaLabel: "Line chart showing active user momentum",
      },
      doughnut: {
        title: "Customer Mix",
        legendTitle: "Active users by plan",
        ariaLabel: "Doughnut chart showing share of users by plan tier",
      },
      summary: {
        title: "Product Health Snapshot",
      },
    },
    quarters: {
      Q1: {
        primary: [4800, 5050, 5300, 5600],
        comparison: [4700, 4950, 5200, 5500],
        segments: {
          "Free Plan": 0.46,
          "Team Plan": 0.32,
          "Business Plan": 0.18,
          "Enterprise Plan": 0.04,
        },
        summary: {
          "Monthly Active Users": "5,600",
          "Daily Active Users": "2,480",
          "Feature Adoption": "64%",
          "Support CSAT": "4.6 / 5",
        },
      },
      Q2: {
        primary: [5800, 6100, 6400, 6700],
        comparison: [5600, 5900, 6200, 6500],
        segments: {
          "Free Plan": 0.44,
          "Team Plan": 0.33,
          "Business Plan": 0.19,
          "Enterprise Plan": 0.04,
        },
        summary: {
          "Monthly Active Users": "6,700",
          "Daily Active Users": "3,020",
          "Feature Adoption": "68%",
          "Support CSAT": "4.7 / 5",
        },
      },
      Q3: {
        primary: [6400, 6750, 7100, 7400],
        comparison: [6200, 6550, 6900, 7200],
        segments: {
          "Free Plan": 0.42,
          "Team Plan": 0.34,
          "Business Plan": 0.2,
          "Enterprise Plan": 0.04,
        },
        summary: {
          "Monthly Active Users": "7,400",
          "Daily Active Users": "3,420",
          "Feature Adoption": "71%",
          "Support CSAT": "4.7 / 5",
        },
      },
      Q4: {
        primary: [6900, 7300, 7700, 8100],
        comparison: [6700, 7100, 7500, 7900],
        segments: {
          "Free Plan": 0.4,
          "Team Plan": 0.35,
          "Business Plan": 0.21,
          "Enterprise Plan": 0.04,
        },
        summary: {
          "Monthly Active Users": "8,100",
          "Daily Active Users": "3,760",
          "Feature Adoption": "74%",
          "Support CSAT": "4.8 / 5",
        },
      },
    },
  },
};

const dashboardSelect = document.getElementById("dashboard");
const quarterSelect = document.getElementById("quarter");
const dashboardDescription = document.getElementById("dashboardDescription");
const dashboardBadge = document.getElementById("dashboardBadge");
const summaryTable = document.getElementById("summaryTable");
const barTitle = document.getElementById("barTitle");
const lineTitle = document.getElementById("lineTitle");
const doughnutTitle = document.getElementById("doughnutTitle");
const summaryTitle = document.getElementById("summaryTitle");

const barChart = new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: months,
    datasets: [
      {
        label: "",
        backgroundColor: "#38bdf8",
        borderRadius: 6,
        data: [],
      },
      {
        label: "",
        backgroundColor: "#1d4ed8",
        borderRadius: 6,
        data: [],
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: (value) => value,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
    },
  },
});

const lineChart = new Chart(document.getElementById("lineChart"), {
  type: "line",
  data: {
    labels: months,
    datasets: [
      {
        label: "",
        data: [],
        borderColor: "#f97316",
        backgroundColor: "rgba(249, 115, 22, 0.25)",
        tension: 0.35,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: (value) => value,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
    },
  },
});

const doughnutChart = new Chart(document.getElementById("doughnutChart"), {
  type: "doughnut",
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#a855f7", "#22d3ee", "#facc15", "#f87171"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "",
      },
    },
  },
});

let activeDashboardKey = "";

function applyDashboardConfiguration(dashboardKey) {
  const dashboard = dashboards[dashboardKey];
  if (!dashboard) {
    return;
  }

  activeDashboardKey = dashboardKey;

  const valueFormatter = formatters[dashboard.formatter] || formatters.number;

  barTitle.textContent = dashboard.cards.bar.title;
  lineTitle.textContent = dashboard.cards.line.title;
  doughnutTitle.textContent = dashboard.cards.doughnut.title;
  summaryTitle.textContent = dashboard.cards.summary.title;
  dashboardDescription.textContent = dashboard.description;
  if (dashboardBadge) {
    dashboardBadge.textContent = dashboard.label;
  }

  barChart.canvas.setAttribute(
    "aria-label",
    dashboard.cards.bar.ariaLabel || "Bar chart comparing primary metric to target"
  );
  lineChart.canvas.setAttribute(
    "aria-label",
    dashboard.cards.line.ariaLabel || "Line chart showing primary metric trend"
  );
  doughnutChart.canvas.setAttribute(
    "aria-label",
    dashboard.cards.doughnut.ariaLabel || "Doughnut chart showing segment contribution"
  );

  barChart.data.datasets[0].label = dashboard.cards.bar.primaryLabel;
  barChart.data.datasets[1].label = dashboard.cards.bar.comparisonLabel;
  lineChart.data.datasets[0].label = dashboard.cards.line.primaryLabel;

  barChart.options.scales.y.ticks.callback = valueFormatter;
  lineChart.options.scales.y.ticks.callback = valueFormatter;

  if (dashboard.cards.doughnut.legendTitle) {
    doughnutChart.options.plugins.title.display = true;
    doughnutChart.options.plugins.title.text = dashboard.cards.doughnut.legendTitle;
  } else {
    doughnutChart.options.plugins.title.display = false;
  }

  barChart.update();
  lineChart.update();
  doughnutChart.update();

  syncQuarterOptions(dashboard);
}

function syncQuarterOptions(dashboard) {
  const previousQuarter = quarterSelect.value;
  const quarterKeys = Object.keys(dashboard.quarters);

  quarterSelect.innerHTML = "";
  quarterKeys.forEach((quarterKey) => {
    const option = document.createElement("option");
    option.value = quarterKey;
    option.textContent = quarterKey;
    quarterSelect.appendChild(option);
  });

  const selectedQuarter = dashboard.quarters[previousQuarter]
    ? previousQuarter
    : quarterKeys[0];

  quarterSelect.value = selectedQuarter;
  updateDashboard(selectedQuarter);
}

function updateDashboard(quarterKey) {
  const dashboard = dashboards[activeDashboardKey];
  if (!dashboard) {
    return;
  }

  const quarter = dashboard.quarters[quarterKey];
  if (!quarter) {
    return;
  }

  barChart.data.labels = months;
  barChart.data.datasets[0].data = quarter.primary;
  barChart.data.datasets[1].data = quarter.comparison;
  barChart.update();

  lineChart.data.labels = months;
  lineChart.data.datasets[0].data = quarter.primary;
  lineChart.update();

  doughnutChart.data.labels = Object.keys(quarter.segments);
  doughnutChart.data.datasets[0].data = Object.values(quarter.segments).map((value) =>
    Math.round(value * 100)
  );
  doughnutChart.update();

  summaryTable.innerHTML = "";
  Object.entries(quarter.summary).forEach(([metric, value]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${metric}</th>
      <td>${value}</td>
    `;
    summaryTable.appendChild(row);
  });
}

Object.entries(dashboards).forEach(([key, config], index) => {
  const option = document.createElement("option");
  option.value = key;
  option.textContent = config.label;
  if (index === 0) {
    option.selected = true;
    activeDashboardKey = key;
  }
  dashboardSelect.appendChild(option);
});

applyDashboardConfiguration(activeDashboardKey || Object.keys(dashboards)[0]);

dashboardSelect.addEventListener("change", (event) => {
  applyDashboardConfiguration(event.target.value);
});

quarterSelect.addEventListener("change", (event) => {
  updateDashboard(event.target.value);
});

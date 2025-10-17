export const months = ["Jan", "Feb", "Mar", "Apr"];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const formatters = {
  currency: (value) => currencyFormatter.format(value),
  number: (value) => numberFormatter.format(value),
  percent: (value) => percentFormatter.format(value),
  text: (value) => value,
};

export const dashboards = {
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
      insights: {
        title: "Revenue Highlights & Next Steps",
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
        insights: [
          "Closed the quarter $15K ahead of plan with March providing the biggest lift.",
          "Direct and partner channels combined for 70% of bookings—keep enablement funding intact.",
          "Enterprise mix trails at 10%; align with marketing on large-deal pipeline coverage.",
        ],
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
        insights: [
          "Stayed $16.5K above target as conversion efficiency improved mid-quarter.",
          "Partner contribution climbed to 30%; expand the co-selling incentive pilot.",
          "Self-serve momentum dipped slightly—ship activation experiments before Q3.",
        ],
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
        insights: [
          "Outperformed plan by $23K with steady month-over-month gains.",
          "Direct revenue share held at 42%; preserve the spend-efficiency guardrails in place.",
          "Enterprise mix is stuck at 10%—refresh late-stage playbooks with sales ops support.",
        ],
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
        insights: [
          "Ended the year $28K ahead of plan with December bookings spiking 7%.",
          "Partners now represent 32% of mix—confirm capacity for joint marketing heading into Q1.",
          "Self-serve growth at 22% signals pricing-page tweaks are resonating; keep iterating.",
        ],
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
      insights: {
        title: "Growth Highlights & Plays",
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
        insights: [
          "Beat the qualified-lead goal by 45 with the March webinar spike providing the lift.",
          "\"Product Launch Webinars\" remain the top source—tighten SDR follow-up scripts to capture momentum.",
          "Lifecycle email now drives 19% of volume; queue nurture experiments targeting expansion cohorts.",
        ],
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
        insights: [
          "Qualified leads outpaced plan by 80 as the customer story series launched.",
          "Paid media share climbed to 29%; monitor CAC before unlocking more spend.",
          "Opportunities at 344 confirm SDR capacity is healthy—plan incremental headcount in Q4.",
        ],
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
        insights: [
          "Maintained an 80-lead surplus on goal with steady month-to-month growth.",
          "Lifecycle email contributions rose to 19%; keep iterating on personalization tests.",
          "\"Lifecycle Nurture Refresh\" continues to convert—codify it into an evergreen playbook.",
        ],
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
        insights: [
          "Closed the year 80 leads above goal while sustaining a 24% webinar mix.",
          "Paid media now leads at 30%; validate multi-touch attribution before expanding buys.",
          "\"Year-end Upgrade Push\" is converting well—prep retention follow-ups to protect gains.",
        ],
      },
    },
  },
  product: {
    label: "Product Health",
    description:
      "Monitor activation, engagement, and retention signals to keep product experience investments aligned with customer outcomes.",
    formatter: "percent",
    cards: {
      bar: {
        title: "Activation vs Target",
        primaryLabel: "Activation Rate",
        comparisonLabel: "Target",
        ariaLabel: "Bar chart comparing activation rate to target by month",
      },
      line: {
        title: "Engagement Trend",
        primaryLabel: "DAU/MAU",
        ariaLabel: "Line chart showing engagement trend",
      },
      doughnut: {
        title: "Retention Cohorts",
        legendTitle: "Retention rate by cohort",
        ariaLabel: "Doughnut chart showing retention by cohort",
      },
      summary: {
        title: "Product Pulse",
      },
      insights: {
        title: "Product Signals & Experiments",
      },
    },
    quarters: {
      Q1: {
        primary: [0.52, 0.55, 0.57, 0.59],
        comparison: [0.5, 0.52, 0.54, 0.56],
        segments: {
          "New Customers": 0.36,
          "Expansion": 0.27,
          Enterprise: 0.2,
          SMB: 0.17,
        },
        summary: {
          "Activation Rate": "59%",
          "DAU/MAU": "31%",
          "Churn": "3.2%",
          "Top Insight": "Expansion cohort adoption beat plan by 8 pts",
        },
        insights: [
          "Activation stayed roughly three points above plan with consistent month-over-month gains.",
          "Expansion users account for 27% of retained activity—lean into upsell nudges and in-product prompts.",
          "Churn at 3.2% highlights enterprise onboarding friction; partner with CX on time-to-value workshops.",
        ],
      },
      Q2: {
        primary: [0.55, 0.58, 0.6, 0.63],
        comparison: [0.53, 0.55, 0.57, 0.59],
        segments: {
          "New Customers": 0.34,
          "Expansion": 0.29,
          Enterprise: 0.21,
          SMB: 0.16,
        },
        summary: {
          "Activation Rate": "63%",
          "DAU/MAU": "34%",
          "Churn": "2.9%",
          "Top Insight": "Enterprise stickiness grew for third straight month",
        },
        insights: [
          "Activation kept a four-point lead on target as the checklist refresh rolled out.",
          "Enterprise cohort share rose to 21%; prioritize roadmap items that reinforce admin workflows.",
          "Churn dipped to 2.9%—capture qualitative feedback to institutionalize the wins.",
        ],
      },
      Q3: {
        primary: [0.58, 0.61, 0.64, 0.67],
        comparison: [0.56, 0.58, 0.61, 0.63],
        segments: {
          "New Customers": 0.32,
          "Expansion": 0.3,
          Enterprise: 0.23,
          SMB: 0.15,
        },
        summary: {
          "Activation Rate": "67%",
          "DAU/MAU": "36%",
          "Churn": "2.6%",
          "Top Insight": "Expansion users now outpace new users for logins",
        },
        insights: [
          "Activation remains four points above plan while engagement pushes DAU/MAU to 36%.",
          "Expansion logins now exceed new-user activity—double down on workflow education.",
          "Retention cohorts show enterprise at 23%; explore premium feature packaging before Q4.",
        ],
      },
      Q4: {
        primary: [0.61, 0.64, 0.66, 0.69],
        comparison: [0.59, 0.62, 0.64, 0.66],
        segments: {
          "New Customers": 0.31,
          "Expansion": 0.31,
          Enterprise: 0.24,
          SMB: 0.14,
        },
        summary: {
          "Activation Rate": "69%",
          "DAU/MAU": "38%",
          "Churn": "2.4%",
          "Top Insight": "Retention cohorts maintain 90-day streak highs",
        },
        insights: [
          "Activation closed the year three points above plan and trending upward.",
          "Expansion and new customers are now evenly split at 31%; design experiments to protect balance.",
          "Churn at 2.4% keeps us ahead of benchmarks—share tactics with support for onboarding playbooks.",
        ],
      },
    },
  },
};

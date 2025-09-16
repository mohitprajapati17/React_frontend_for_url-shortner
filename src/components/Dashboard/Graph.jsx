import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ graphData }) => {
  const labels = graphData?.map((item, i) => `${item.clickDate}`);
  const userPerDaya = graphData?.map((item) => item.count);

  const data = {
    labels:
     (graphData  && graphData.length > 0)
        ? labels
        : ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Total Clicks",
        data:
         (graphData && graphData.length > 0)
            ? userPerDaya
            : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
        backgroundColor: (context) => {
          const { chart } = context;
          const { ctx, chartArea } = chart || {};
          if (!chartArea) return "rgba(250, 204, 21, 0.6)";
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(250, 204, 21, 0.95)");
          gradient.addColorStop(1, "rgba(250, 204, 21, 0.35)");
          return gradient;
        },
        borderColor: "#facc15",
        borderWidth: 1,
        borderRadius: 0,
        borderSkipped: false,
        fill: true,
        // slightly wider bars
        barThickness: undefined,
        maxBarThickness: 36,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: { color: "#e5e7eb" }
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.9)",
        titleColor: "#facc15",
        bodyColor: "#e5e7eb",
        borderColor: "rgba(250,204,21,0.3)",
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (ctx) => `Clicks: ${ctx.parsed.y}`,
        },
      },
    },
    layout: { padding: 8 },
    animation: { duration: 800, easing: "easeOutQuart" },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // stepSize: 1,
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value.toString();
            }
            return "";
          },
          color: "#9ca3af",
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          font: { family: "Inter, Arial", size: 14, weight: "600" },
          color: "#facc15",
        },
        grid: { color: "rgba(148, 163, 184, 0.12)", drawBorder: false },
      },
      x: {
        beginAtZero: true,
        // ticks: {
        //   stepSize: 1,
        // },
        title: {
          display: true,
          text: "Date",
          font: { family: "Inter, Arial", size: 14, weight: "600" },
          color: "#facc15",
        },
        ticks: { color: "#9ca3af", autoSkip: false, maxRotation: 0 },
        offset: true,
        grid: { color: "rgba(148, 163, 184, 0.08)", drawBorder: false },
      },
    },
  };

  return <Bar className="w-full h-full" data={data} options={options} redraw></Bar>;
};

export default Graph;
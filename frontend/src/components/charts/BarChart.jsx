import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const shadowPlugin = {
  id: "shadowPlugin",
  beforeDatasetsDraw: (chart) => {
    const { ctx } = chart;
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = 6;
  },
  afterDatasetsDraw: (chart) => {
    chart.ctx.restore();
  },
};

function BarChart() {
  const data = {
    labels: ["Groceries", "Rent", "Transport", "Entertainment", "Other"],
    datasets: [
      {
        label: "Spending ($)",
        data: [120, 800, 150, 90, 60],

        backgroundColor: (context) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;

          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "#fb7185"); 
          gradient.addColorStop(1, "#f43f5e");
          return gradient;
        },

        borderRadius: 12,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="flex-1 bg-white font-manrope rounded-2xl shadow-xl p-4">
      <h3 className="text-center font-bold text-sm opacity-80 mb-2">
        Categories
      </h3>

      <Bar data={data} options={options} plugins={[shadowPlugin]} />
    </div>
  );
}

export default BarChart;

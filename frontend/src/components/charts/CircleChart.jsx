import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";


ChartJS.register(ArcElement, Tooltip, Legend);

const shadowPlugin = {
  id: "shadowPlugin",
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = 6;
  },
  afterDraw: (chart) => {
    chart.ctx.restore();
  },
};

function CircleChart({dataToRenderIncome, dataToRenderExpense}) {
  const data = {
    labels: ["Income", "Usage"],
    datasets: [
      {
        data: [dataToRenderIncome.total_income,dataToRenderExpense.total_expense],
        backgroundColor: [
          "#34d399", // emerald-400
          "#fb7185", // rose-400
          "#94a3b8", // slate-400
        ],
        hoverOffset: 8,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
      },
    },
  };

  return (
    <div className="flex-1 bg-white font-manrope rounded-2xl shadow-xl p-4">
      <h3 className="text-center font-bold text-sm opacity-80 mb-2">
        Income vs expense
      </h3>

      <div className="w-64 mx-auto">
        {dataToRenderIncome!==null && dataToRenderExpense!==null ? (<Doughnut data={data} options={options} plugins={[shadowPlugin]} />) 
        : (
          <div className="text-rose-500 text-center mt-8"> There is no data to show </div>
        )}
        
      </div>
    </div>
  );
}

export default CircleChart;

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function InExLineChart() {
    const data = [
  { date: "2025-01-01", income: 500, expense: 200 },
  { date: "2025-01-02", income: 0,   expense: 150 },
  { date: "2025-01-03", income: 300, expense: 100 },
  { date: "2025-01-04", income: 700, expense: 400 },
  { date: "2025-01-05", income: 150, expense: 400 },
  { date: "2025-01-06", income: 800, expense: 0 },
  { date: "2025-01-07", income: 100, expense: 200 },
];

  return (
    <div className="w-1/2 h-80 bg-white rounded-xl shadow p-4">
      <h2 className="text-lg text-center font-semibold mb-3">
        Income vs Expense
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#22c55e" // green
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444" // red
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

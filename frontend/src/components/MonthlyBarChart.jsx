import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function MonthlyBarChart({
  title,
  data,
  dataKey,
  color,
  unit,
}) {
  const chartData = data.map(item => ({
    ...item,
    monthLabel: MONTHS[item.month - 1],
  }));

  return (
    <div className="bg-white rounded-xl border p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">
        {title}
      </h2>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis
              dataKey="monthLabel"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [`${value} ${unit}`, title]}
            />
            <Bar
              dataKey={dataKey}
              fill={color}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

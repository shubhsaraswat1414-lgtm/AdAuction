import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Technology", value: 35, color: "#9333ea" },
  { name: "Sports", value: 25, color: "#6366f1" },
  { name: "Shopping", value: 20, color: "#10b981" },
  { name: "Gaming", value: 10, color: "#f59e0b" },
  { name: "Others", value: 10, color: "#94a3b8" },
];

/* ── Custom tooltip ───────────────────────────────────── */
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value, payload: p } = payload[0];

  return (
    <div className="rounded-xl border border-gray-100 bg-white px-4 py-2.5 shadow-lg">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: p.color }}
        />
        <span className="text-[12px] font-medium text-gray-700">{name}</span>
        <span className="ml-2 text-[13px] font-bold text-gray-900">
          {value}%
        </span>
      </div>
    </div>
  );
}

export default function DistributionChart() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
      {/* ── Header ────────────────────────────────── */}
      <div className="mb-4">
        <h3 className="text-[14px] font-semibold text-gray-900 sm:text-[15px]">
          Ad Distribution
        </h3>
        <p className="mt-0.5 text-[11px] text-gray-400 sm:text-[12px]">
          Impressions by category
        </p>
      </div>

      {/* ── Donut chart ───────────────────────────── */}
      <div className="relative mx-auto mb-4 h-[160px] w-[160px] sm:h-[200px] sm:w-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categories}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={72}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
              cornerRadius={4}
            >
              {categories.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.color}
                  className="outline-none transition-opacity duration-200 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[18px] font-extrabold tracking-tight text-gray-900 sm:text-[22px]">
            15.6M
          </span>
          <span className="text-[10px] font-medium text-gray-400 sm:text-[11px]">
            Impressions
          </span>
        </div>
      </div>

      {/* ── Legend ─────────────────────────────────── */}
      <div className="mb-4 flex flex-col gap-2 sm:gap-2.5">
        {categories.map((cat) => (
          <div key={cat.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span
                className="h-2.5 w-2.5 rounded sm:h-3 sm:w-3"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-[11.5px] text-gray-600 sm:text-[12.5px]">{cat.name}</span>
            </div>

            {/* Percentage bar + value */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-1.5 w-14 overflow-hidden rounded-full bg-gray-100 sm:w-20">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${cat.value}%`,
                    backgroundColor: cat.color,
                  }}
                />
              </div>
              <span className="w-7 text-right text-[11.5px] font-semibold text-gray-900 sm:w-8 sm:text-[12.5px]">
                {cat.value}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer button ─────────────────────────── */}
      <div className="mt-auto pt-2">
        <button
          onClick={() => navigate("/ad-inventory")}
          className="group flex w-full items-center justify-center gap-2 rounded-xl
            border border-gray-200 py-2 text-[12px] font-semibold
            text-gray-600 transition-all duration-200
            hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600
            sm:py-2.5 sm:text-[12.5px]"
        >
          View Full Report
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

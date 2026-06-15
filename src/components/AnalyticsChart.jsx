import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { date: "May 21", revenue: 4200, clicks: 1800, impressions: 32000 },
  { date: "May 22", revenue: 5500, clicks: 2500, impressions: 41000 },
  { date: "May 23", revenue: 4800, clicks: 2200, impressions: 38000 },
  { date: "May 24", revenue: 7200, clicks: 3800, impressions: 56000 },
  { date: "May 25", revenue: 6500, clicks: 3000, impressions: 49000 },
  { date: "May 26", revenue: 8000, clicks: 4500, impressions: 64000 },
  { date: "May 27", revenue: 7600, clicks: 4000, impressions: 58000 },
];

const tabs = ["Today", "7D", "30D", "1Y"];

const lines = [
  { key: "revenue", label: "Revenue", color: "#9333ea" },
  { key: "clicks", label: "Clicks", color: "#6366f1" },
  { key: "impressions", label: "Impressions", color: "#10b981" },
];

/* ── Custom tooltip ───────────────────────────────────── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg">
      <p className="mb-2 text-[12px] font-semibold text-gray-800">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 py-0.5">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[11.5px] text-gray-500">{entry.name}</span>
          <span className="ml-auto text-[12px] font-semibold text-gray-900">
            {entry.dataKey === "revenue"
              ? `₹${entry.value.toLocaleString()}`
              : entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Custom legend ────────────────────────────────────── */
function CustomLegend({ payload }) {
  return (
    <div className="mt-2 flex flex-wrap justify-center gap-3 sm:gap-5">
      {payload?.map((entry) => (
        <div key={entry.value} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[11px] font-medium text-gray-500 sm:text-[12px]">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsChart() {
  const [activeTab, setActiveTab] = useState("7D");

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
      {/* ── Header ────────────────────────────────── */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-[14px] font-semibold text-gray-900 sm:text-[15px]">
            Campaign Performance
          </h3>
          <p className="mt-0.5 text-[11px] text-gray-400 sm:text-[12px]">
            Revenue, clicks &amp; impressions trend
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-lg bg-gray-100 p-0.5 self-start sm:self-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-all duration-200 sm:px-3 sm:py-1.5 sm:text-[12px] ${
                activeTab === t
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Chart ─────────────────────────────────── */}
      <div className="h-[220px] w-full sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              {lines.map((l) => (
                <linearGradient
                  key={l.key}
                  id={`grad-${l.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={l.color} stopOpacity={0.15} />
                  <stop offset="100%" stopColor={l.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickFormatter={(v) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v
              }
              dx={-5}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e5e7eb" }} />
            <Legend content={<CustomLegend />} />

            {lines.map((l) => (
              <Line
                key={l.key}
                type="monotone"
                dataKey={l.key}
                name={l.label}
                stroke={l.color}
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#fff", stroke: l.color, strokeWidth: 2 }}
                activeDot={{
                  r: 6,
                  fill: l.color,
                  stroke: "#fff",
                  strokeWidth: 2.5,
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

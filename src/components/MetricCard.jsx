import { TrendingUp, TrendingDown } from "lucide-react";

/* ── Tiny sparkline paths for visual variety ───────────── */
const sparklines = {
  up: "M0,32 C8,28 16,20 24,22 C32,24 40,14 48,12 C56,10 64,16 72,8 C80,4 88,6 96,2",
  steady: "M0,20 C10,22 18,16 28,18 C38,20 46,12 56,14 C66,16 74,10 84,12 C90,14 94,8 96,10",
  down: "M0,4 C10,8 18,12 28,10 C38,14 46,20 56,18 C66,22 74,26 84,24 C90,28 94,30 96,32",
};

export default function MetricCard({
  title = "Metric",
  value = "0",
  percentage = 0,
  icon: Icon,
  chartColor = "#3b82f6",
}) {
  const isPositive = percentage >= 0;
  const sparkPath = isPositive
    ? percentage > 10
      ? sparklines.up
      : sparklines.steady
    : sparklines.down;

  /* derive lighter tint for icon bg from chartColor */
  const iconBg = `${chartColor}14`;
  const iconRing = `${chartColor}08`;

  return (
    <div
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl
        border border-gray-100 bg-white p-5 shadow-sm
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60"
    >
      {/* ── Top: Title + Icon ──────────────────────── */}
      <div className="flex items-start justify-between">
        <p className="text-[13px] font-medium tracking-wide text-gray-500">
          {title}
        </p>
        {Icon && (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: iconBg,
              boxShadow: `0 0 0 6px ${iconRing}`,
            }}
          >
            <Icon
              className="h-[18px] w-[18px]"
              style={{ color: chartColor }}
              strokeWidth={1.9}
            />
          </div>
        )}
      </div>

      {/* ── Middle: Value ──────────────────────────── */}
      <p className="mt-4 text-[28px] font-extrabold leading-none tracking-tight text-gray-900">
        {value}
      </p>

      {/* ── Bottom: Growth indicator ───────────────── */}
      <div className="mt-3 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-semibold ${
            isPositive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="h-3 w-3" strokeWidth={2.4} />
          ) : (
            <TrendingDown className="h-3 w-3" strokeWidth={2.4} />
          )}
          {isPositive ? "↑" : "↓"} {Math.abs(percentage)}%
        </span>
        <span className="text-[11.5px] text-gray-400">vs last 7 days</span>
      </div>

      {/* ── Mini SVG sparkline ─────────────────────── */}
      <div className="mt-4 h-10 w-full overflow-hidden rounded-lg">
        <svg
          viewBox="0 0 96 36"
          fill="none"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          {/* gradient fill under line */}
          <defs>
            <linearGradient
              id={`grad-${title.replace(/\s/g, "")}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={chartColor} stopOpacity="0.18" />
              <stop offset="100%" stopColor={chartColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`${sparkPath} L96,36 L0,36 Z`}
            fill={`url(#grad-${title.replace(/\s/g, "")})`}
          />
          <path
            d={sparkPath}
            stroke={chartColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-sm"
          />
        </svg>
      </div>
    </div>
  );
}

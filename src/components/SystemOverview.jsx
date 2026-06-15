import {
  Globe,
  LayoutGrid,
  Server,
  Zap,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

const items = [
  {
    label: "Online Publishers",
    value: "120",
    icon: Globe,
    color: "#9333ea",
    change: 8.2,
  },
  {
    label: "Active Ad Slots",
    value: "1,482",
    icon: LayoutGrid,
    color: "#8b5cf6",
    change: 12.5,
  },
  {
    label: "Cache Servers",
    value: "24",
    icon: Server,
    color: "#10b981",
    change: 0,
  },
  {
    label: "Bid Requests Today",
    value: "48,392",
    icon: Zap,
    color: "#f59e0b",
    change: 18.7,
  },
  {
    label: "System Uptime",
    value: "99.98%",
    icon: Activity,
    color: "#ec4899",
    change: 0.02,
  },
];

function GrowthBadge({ change }) {
  if (change > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
        <TrendingUp className="h-3 w-3" strokeWidth={2.4} />
        +{change}%
      </span>
    );
  }
  if (change < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-red-500">
        <TrendingDown className="h-3 w-3" strokeWidth={2.4} />
        {change}%
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-gray-400">
      <Minus className="h-3 w-3" strokeWidth={2.4} />
      Stable
    </span>
  );
}

export default function SystemOverview() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* ── Header ────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div>
          <h3 className="text-[15px] font-semibold text-gray-900">
            System Overview
          </h3>
          <p className="mt-0.5 text-[12px] text-gray-400">
            Infrastructure &amp; delivery stats
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600 ring-1 ring-inset ring-emerald-600/10">
          All Systems Go
        </span>
      </div>

      {/* ── Items list ────────────────────────────── */}
      <div className="flex flex-1 flex-col">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isLast = idx === items.length - 1;

          return (
            <div
              key={item.label}
              className={`group flex items-center justify-between px-5 py-4
                transition-colors hover:bg-gray-50/70
                ${!isLast ? "border-b border-gray-50" : ""}`}
            >
              {/* Left: icon + label */}
              <div className="flex items-center gap-3.5">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl
                    transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: `${item.color}10` }}
                >
                  <Icon
                    className="h-[18px] w-[18px]"
                    style={{ color: item.color }}
                    strokeWidth={1.8}
                  />
                </div>
                <div>
                  <p className="text-[12.5px] text-gray-500">{item.label}</p>
                  <p className="text-[17px] font-bold tracking-tight text-gray-900">
                    {item.value}
                  </p>
                </div>
              </div>

              {/* Right: growth status */}
              <GrowthBadge change={item.change} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

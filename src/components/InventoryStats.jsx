import { Users, LayoutGrid, IndianRupee, Target, TrendingUp } from "lucide-react";

const statsData = [
  {
    id: 1,
    title: "Total Publishers",
    value: "156",
    growth: "12.5%",
    trend: "up",
    icon: Users,
    color: "blue",
    chartPoints: "0,30 15,25 30,28 45,20 60,22 75,12 90,14 100,5",
  },
  {
    id: 2,
    title: "Active Ad Slots",
    value: "2,840",
    growth: "8.3%",
    trend: "up",
    icon: LayoutGrid,
    color: "emerald",
    chartPoints: "0,28 15,22 30,25 45,15 60,18 75,10 90,12 100,2",
  },
  {
    id: 3,
    title: "Revenue Potential",
    value: "₹42.5L",
    growth: "15.7%",
    trend: "up",
    icon: IndianRupee,
    color: "violet",
    chartPoints: "0,35 15,28 30,30 45,18 60,20 75,8 90,10 100,0",
  },
  {
    id: 4,
    title: "Slot Occupancy",
    value: "78%",
    growth: "6.4%",
    trend: "up",
    icon: Target,
    color: "amber",
    chartPoints: "0,25 15,20 30,22 45,15 60,16 75,10 90,11 100,4",
  },
];

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    stroke: "stroke-blue-500",
    fill: "fill-blue-500/20",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    stroke: "stroke-emerald-500",
    fill: "fill-emerald-500/20",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    stroke: "stroke-violet-500",
    fill: "fill-violet-500/20",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    stroke: "stroke-amber-500",
    fill: "fill-amber-500/20",
  },
};

export default function InventoryStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        const colors = colorClasses[stat.color];

        return (
          <div
            key={stat.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-100 bg-white p-5 pb-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)]"
          >
            {/* Top row */}
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-[13px] font-medium text-gray-500">{stat.title}</p>
                <p className="mt-1 text-[26px] font-bold tracking-tight text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full ${colors.bg} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className={`h-5 w-5 ${colors.text}`} strokeWidth={2} />
              </div>
            </div>

            {/* Growth indicator */}
            <div className="relative z-10 mt-3 flex items-center gap-1.5">
              <span className="flex items-center gap-1 text-[13px] font-semibold text-emerald-600">
                <TrendingUp className="h-4 w-4" strokeWidth={2.5} />
                {stat.growth}
              </span>
              <span className="text-[12px] text-gray-400">vs last month</span>
            </div>

            {/* Mini SVG Line Chart at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
              <svg
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
                className="h-full w-full"
              >
                {/* Gradient area */}
                <polygon
                  points={`0,40 ${stat.chartPoints} 100,40`}
                  className={`${colors.fill}`}
                />
                {/* Line */}
                <polyline
                  points={stat.chartPoints}
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`${colors.stroke}`}
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

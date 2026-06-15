import {
  IndianRupee,
  Megaphone,
  Eye,
  TrendingUp,
  Users,
} from "lucide-react";

import MetricCard from "../components/MetricCard";
import AnalyticsChart from "../components/AnalyticsChart";
import DistributionChart from "../components/DistributionChart";
import AuctionTable from "../components/AuctionTable";
import SystemOverview from "../components/SystemOverview";

const metrics = [
  {
    title: "Revenue",
    value: "₹24,80,000",
    percentage: 18.5,
    icon: IndianRupee,
    chartColor: "#9333ea",
  },
  {
    title: "Active Campaigns",
    value: "342",
    percentage: 8.2,
    icon: Megaphone,
    chartColor: "#8b5cf6",
  },
  {
    title: "Ad Impressions",
    value: "15.6M",
    percentage: 12.7,
    icon: Eye,
    chartColor: "#10b981",
  },
  {
    title: "Conversion Rate",
    value: "8.7%",
    percentage: 3.4,
    icon: TrendingUp,
    chartColor: "#f59e0b",
  },
  {
    title: "Audience Matches",
    value: "89%",
    percentage: 5.1,
    icon: Users,
    chartColor: "#ec4899",
  },
];

export default function Dashboard() {
  return (
    <div className="flex-1 p-4 sm:p-6">
      {/* Page heading */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl font-bold text-gray-900 sm:text-[22px]">Overview</h1>
        <p className="mt-1 text-[12px] text-gray-500 sm:text-[13px]">
          Your campaign performance at a glance.
        </p>
      </div>

      {/* ── Top: Metric cards ─────────────────────── */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
        {metrics.map((m) => (
          <MetricCard key={m.title} {...m} />
        ))}
      </div>

      {/* ── Middle: Charts row ────────────────────── */}
      <div className="mb-4 grid grid-cols-1 gap-4 sm:mb-6 sm:gap-5 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <AnalyticsChart />
        </div>
        <div className="lg:col-span-2">
          <DistributionChart />
        </div>
      </div>

      {/* ── Bottom: Table + System row ────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <AuctionTable />
        </div>
        <div className="lg:col-span-2">
          <SystemOverview />
        </div>
      </div>
    </div>
  );
}

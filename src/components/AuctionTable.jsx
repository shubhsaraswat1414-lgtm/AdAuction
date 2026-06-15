import { useState } from "react";
import { Search, Filter, MoreHorizontal, X } from "lucide-react";
import { useToast } from "../hooks/useToast";

const auctions = [
  {
    campaign: "AI Product Launch",
    advertiser: "TechNova",
    bid: "₹12.50",
    match: 92,
    status: "Won",
    time: "2 min ago",
  },
  {
    campaign: "Summer Sports Sale",
    advertiser: "Sportify",
    bid: "₹8.30",
    match: 85,
    status: "Won",
    time: "5 min ago",
  },
  {
    campaign: "Gaming Accessories",
    advertiser: "GameX Pro",
    bid: "₹7.40",
    match: 78,
    status: "Pending",
    time: "8 min ago",
  },
  {
    campaign: "Fashion Week Promo",
    advertiser: "StyleHub",
    bid: "₹9.80",
    match: 88,
    status: "Won",
    time: "12 min ago",
  },
  {
    campaign: "Food Delivery Ads",
    advertiser: "QuickBite",
    bid: "₹5.60",
    match: 64,
    status: "Lost",
    time: "18 min ago",
  },
  {
    campaign: "EdTech Webinar",
    advertiser: "LearnPro",
    bid: "₹6.90",
    match: 71,
    status: "Pending",
    time: "24 min ago",
  },
];

const statusConfig = {
  Won: {
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  },
  Pending: {
    dot: "bg-amber-400 animate-pulse",
    badge: "bg-amber-50 text-amber-700 ring-amber-600/10",
  },
  Lost: {
    dot: "bg-red-400",
    badge: "bg-red-50 text-red-600 ring-red-600/10",
  },
};

function matchBarColor(v) {
  if (v >= 85) return "#10b981";
  if (v >= 70) return "#3b82f6";
  return "#f59e0b";
}

export default function AuctionTable() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();

  const filtered = searchTerm
    ? auctions.filter(
        (a) =>
          a.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.advertiser.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : auctions;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* ── Header ────────────────────────────────── */}
      <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
        <div>
          <h3 className="text-[14px] font-semibold text-gray-900 sm:text-[15px]">
            Recent Auction Activity
          </h3>
          <p className="mt-0.5 text-[11px] text-gray-400 sm:text-[12px]">
            Live bid results &amp; audience matching
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search toggle */}
          {showSearch ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                autoFocus
                className="w-32 rounded-lg border border-gray-200 px-2.5 py-1.5 text-[12px] outline-none focus:ring-2 focus:ring-purple-500 sm:w-40"
              />
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchTerm("");
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400
                transition-colors hover:bg-gray-100 hover:text-gray-600"
              title="Search"
            >
              <Search className="h-4 w-4" strokeWidth={1.8} />
            </button>
          )}

          {/* Filter */}
          <button
            onClick={() =>
              toast({
                title: "Filter Applied",
                message: "Showing all auction results. Advanced filters coming soon.",
                type: "info",
              })
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400
              transition-colors hover:bg-gray-100 hover:text-gray-600"
            title="Filter"
          >
            <Filter className="h-4 w-4" strokeWidth={1.8} />
          </button>

          {/* View All */}
          <button
            onClick={() =>
              toast({
                title: "All Auctions",
                message: "Full auction history page coming in the next update.",
                type: "info",
              })
            }
            className="rounded-lg border border-gray-200 px-2.5 py-1 text-[11px]
              font-medium text-gray-600 transition-colors hover:bg-gray-50 sm:px-3 sm:py-1.5 sm:text-[12px]"
          >
            View All
          </button>
        </div>
      </div>

      {/* ── Table ─────────────────────────────────── */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-[560px]">
          <thead>
            <tr className="border-b border-gray-100">
              {[
                "Campaign",
                "Advertiser",
                "Bid Amount",
                "Audience Match",
                "Status",
                "Time",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase
                    tracking-wider text-gray-400 sm:px-5 sm:py-3 sm:text-[11px]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map((a) => {
              const st = statusConfig[a.status];

              return (
                <tr
                  key={a.campaign}
                  className="group border-b border-gray-50 transition-colors
                    last:border-0 hover:bg-gray-50/70"
                >
                  {/* Campaign */}
                  <td className="px-3 py-3 sm:px-5 sm:py-3.5">
                    <span className="text-[12px] font-semibold text-gray-800 sm:text-[13px]">
                      {a.campaign}
                    </span>
                  </td>

                  {/* Advertiser */}
                  <td className="px-3 py-3 sm:px-5 sm:py-3.5">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div
                        className="flex h-6 w-6 shrink-0 items-center justify-center
                          rounded-full bg-linear-to-br from-purple-100 to-fuchsia-100
                          text-[9px] font-bold text-purple-600 sm:h-7 sm:w-7 sm:text-[10px]"
                      >
                        {a.advertiser.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-[11.5px] text-gray-600 sm:text-[12.5px]">
                        {a.advertiser}
                      </span>
                    </div>
                  </td>

                  {/* Bid */}
                  <td className="px-3 py-3 sm:px-5 sm:py-3.5">
                    <span className="text-[12px] font-semibold text-gray-900 sm:text-[13px]">
                      {a.bid}
                    </span>
                  </td>

                  {/* Audience Match — progress bar */}
                  <td className="px-3 py-3 sm:px-5 sm:py-3.5">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-gray-100 sm:w-20">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${a.match}%`,
                            backgroundColor: matchBarColor(a.match),
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-gray-700 sm:text-[12px]">
                        {a.match}%
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3 sm:px-5 sm:py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5
                        text-[10px] font-semibold ring-1 ring-inset sm:gap-1.5 sm:px-2.5 sm:text-[11px] ${st.badge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                      {a.status}
                    </span>
                  </td>

                  {/* Time */}
                  <td className="px-3 py-3 text-[11px] text-gray-400 sm:px-5 sm:py-3.5 sm:text-[12px]">
                    {a.time}
                  </td>

                  {/* More */}
                  <td className="px-2 py-3 sm:px-3 sm:py-3.5">
                    <button
                      onClick={() =>
                        toast({
                          title: a.campaign,
                          message: `View details for ${a.campaign} by ${a.advertiser}`,
                          type: "info",
                        })
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-lg
                        text-gray-300 opacity-0 transition-all
                        hover:bg-gray-100 hover:text-gray-500
                        group-hover:opacity-100"
                    >
                      <MoreHorizontal className="h-4 w-4" strokeWidth={1.8} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

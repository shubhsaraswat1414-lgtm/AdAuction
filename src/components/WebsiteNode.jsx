import { motion } from "framer-motion";
import { ChevronRight, Globe } from "lucide-react";
import { ICON_MAP } from "../data/inventoryData";

export default function WebsiteNode({ website, expanded, onToggle }) {
  const SiteIcon = (typeof website.icon === 'string' ? ICON_MAP[website.icon] : website.icon) || Globe;

  return (
    <button
      onClick={onToggle}
      className={`group relative z-10 grid w-full items-center rounded-xl border p-3 text-left transition-all duration-300 sm:p-4
        grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto] lg:grid-cols-[minmax(0,1fr)_120px_120px_110px_90px] gap-x-4 gap-y-1 ${
        expanded
          ? "border-purple-200 bg-purple-50/50 shadow-sm ring-1 ring-purple-100"
          : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50 hover:shadow-sm"
      }`}
    >
      {/* ── Col 1: Website Domain & Mobile Fallback ── */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        {/* Chevron */}
        <motion.div
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
            expanded ? "bg-purple-100" : "bg-gray-100 group-hover:bg-gray-200"
          }`}
        >
          <ChevronRight
            className={`h-[18px] w-[18px] ${
              expanded ? "text-purple-600" : "text-gray-400"
            }`}
            strokeWidth={2.5}
          />
        </motion.div>

        {/* Logo */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ${
            website.iconBg || "bg-gray-50"
          }`}
        >
          <SiteIcon
            className={`h-5 w-5 ${website.iconColor || "text-gray-500"}`}
            strokeWidth={2}
          />
        </div>

        {/* Text Details */}
        <div className="min-w-0">
          <h3 className="text-[15px] font-bold text-gray-900 leading-tight truncate">
            {website.domain}
          </h3>
          {/* Mobile Text Fallback (Hidden on lg where real columns take over) */}
          <div className="lg:hidden mt-0.5">
            <p className="text-[12px] font-medium text-gray-500 truncate">
              {website.traffic} · {website.revenue}
            </p>
          </div>
        </div>
      </div>

      {/* ── Col 2: Category Pill ── */}
      <div className="hidden md:flex items-center">
        <span className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-[12px] font-semibold text-gray-600 transition-colors group-hover:bg-white truncate">
          {website.category}
        </span>
      </div>

      {/* ── Col 3: Traffic (Desktop Only) ── */}
      <div className="hidden lg:flex items-center">
        <span className="text-[13px] font-semibold text-gray-700 truncate">{website.traffic}</span>
      </div>

      {/* ── Col 4: Revenue (Desktop Only) ── */}
      <div className="hidden lg:flex items-center">
        <span className="text-[13px] font-semibold text-gray-700 truncate">{website.revenue}</span>
      </div>

      {/* ── Col 5: Status Badge ── */}
      <div className="flex shrink-0 items-center justify-end">
        {website.status === "active" ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-bold text-gray-600">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
            Inactive
          </span>
        )}
      </div>
    </button>
  );
}


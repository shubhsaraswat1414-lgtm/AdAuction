import { LayoutGrid, RectangleHorizontal, Square, ArrowRight } from "lucide-react";

function SlotIcon({ type }) {
  if (type === "banner") return <RectangleHorizontal className="h-[18px] w-[18px]" strokeWidth={1.8} />;
  if (type === "rectangle") return <Square className="h-[18px] w-[18px]" strokeWidth={1.8} />;
  return <LayoutGrid className="h-[18px] w-[18px]" strokeWidth={1.8} />;
}

export default function AdSlotItem({ slot, isLast, isSelected, onSelect, onStartAuction }) {
  // Mapping status to styling
  const statusConfig = {
    Available: "bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-200 bg-emerald-500",
    Reserved: "bg-amber-50 text-amber-700 border-amber-100 ring-amber-200 bg-amber-400",
    Sold: "bg-blue-50 text-blue-700 border-blue-100 ring-blue-200 bg-blue-500",
  };

  const currentStatus = slot.status || "Available";
  const statusStyles = statusConfig[currentStatus] || statusConfig.Available;
  // Extract node dot color from the string (the last two classes represent ring and bg)
  const dotClasses = statusStyles.split(" ").slice(-2).join(" ");

  return (
    <div className="relative flex items-center justify-between py-1 w-full">
      {/* ── Tree Connecting Lines ── */}
      {/* Horizontal connector from vertical trunk to dot */}
      <div className="absolute -left-8 top-1/2 h-px w-6 bg-gray-200" />
      {/* If it's the last child, mask the rest of the vertical line below it */}
      {isLast && (
        <div className="absolute left-[-33px] top-1/2 bottom-0 w-2 bg-white" />
      )}

      {/* ── The Node Item ── */}
      <div
        onClick={onSelect}
        className={`group relative grid w-full items-center rounded-xl border p-3 text-left transition-all duration-200 lg:p-3.5 cursor-pointer
          grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto] lg:grid-cols-[minmax(0,1fr)_120px_120px_110px_90px] gap-x-4 gap-y-1 ${
          isSelected
            ? "border-blue-200 bg-blue-50/60 shadow-sm ring-1 ring-blue-100"
            : "border-transparent hover:border-gray-200 hover:bg-gray-50 hover:shadow-sm"
        }`}
      >
        {/* Node Dot (Small green node dot for available, etc.) */}
        <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 z-10">
          <div className={`h-[9px] w-[9px] rounded-full border-2 border-white ring-1 transition-colors ${dotClasses}`} />
        </div>

        {/* ── Col 1: Icon & Name ── */}
        <div className="flex min-w-0 items-center gap-3.5">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
            isSelected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700"
          }`}>
            <SlotIcon type={slot.type} />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className={`truncate text-[14px] font-semibold leading-tight transition-colors ${isSelected ? "text-blue-900" : "text-gray-800"}`}>
              {slot.name}
            </h4>
            <span className="block truncate text-[12px] font-medium text-gray-500">{slot.size}</span>
          </div>
        </div>

        {/* ── Col 2: Advertiser (If sold) ── */}
        <div className="hidden lg:flex items-center">
          {slot.advertiser ? (
            <span className="truncate text-[13px] font-semibold text-blue-700">{slot.advertiser.name}</span>
          ) : (
            <span className="text-[13px] text-gray-400">-</span>
          )}
        </div>

        {/* ── Col 3: Impressions (Desktop Only) ── */}
        <div className="hidden lg:flex items-center">
          <span className="text-[13px] font-semibold text-gray-700 truncate">{slot.impressions || "500K"}</span>
        </div>

        {/* ── Col 4: Price (Desktop Only) ── */}
        <div className="hidden lg:flex items-center">
          <span className="text-[13px] font-semibold text-gray-700 truncate">{slot.price || "₹2500/day"}</span>
        </div>

        {/* ── Col 5: Status / Action ── */}
        <div className="flex shrink-0 items-center justify-end relative h-8">
          {/* Default Status Badge */}
          <span className={`inline-flex absolute right-0 items-center justify-center rounded-md border px-2.5 py-1 text-[11px] font-bold w-max transition-opacity duration-200 ${currentStatus === "Available" ? "group-hover:opacity-0" : ""} ${statusStyles.split(" ").slice(0, 3).join(" ")}`}>
            {currentStatus}
          </span>
          
          {/* Hover Start Auction Button */}
          {currentStatus === "Available" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartAuction();
              }}
              className="absolute right-0 flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-blue-700 active:scale-95 opacity-0 group-hover:opacity-100 transition-all duration-200 w-max z-20"
            >
              Start Auction
              <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

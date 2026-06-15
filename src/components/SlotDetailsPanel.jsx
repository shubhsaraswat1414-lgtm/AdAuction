import { X, RectangleHorizontal, LayoutGrid, Square, BarChart3, TrendingUp, Settings, Trash2, Zap, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../hooks/useToast";
import { useAuction } from "../context/AuctionContext";

function SlotIcon({ type }) {
  if (type === "banner") return <RectangleHorizontal className="h-5 w-5" strokeWidth={1.8} />;
  if (type === "rectangle") return <Square className="h-5 w-5" strokeWidth={1.8} />;
  return <LayoutGrid className="h-5 w-5" strokeWidth={1.8} />;
}

export default function SlotDetailsPanel({ slot, site, onClose, isMobile }) {
  const toast = useToast();
  const { removeSlot } = useAuction();

  if (!slot || !site) {
    return (
      <div className={`flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/50 p-8 text-center shadow-[0_2px_12px_-4px_rgba(0,0,0,0.02)] ${isMobile ? "h-full" : "h-[calc(100vh-140px)]"}`}>
        <LayoutGrid className="mb-4 h-12 w-12 text-gray-300" strokeWidth={1.5} />
        <h3 className="text-[15px] font-semibold text-gray-800">No slot selected</h3>
        <p className="mt-1 text-[13px] text-gray-500 max-w-[200px]">
          Select an ad slot from the inventory tree to view its details.
        </p>
      </div>
    );
  }

  const isAvailable = slot.status === "Available";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slot.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`flex flex-col bg-white overflow-hidden ${
          isMobile
            ? "h-full"
            : "h-[calc(100vh-140px)] rounded-2xl border border-gray-200 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
        }`}
      >
        {/* ── Top Header ── */}
        {!isMobile && (
          <div className="flex items-start justify-between border-b border-gray-100 p-4 pb-3 sm:p-5 sm:pb-4">
            <div className="flex min-w-0 items-center gap-3">
               <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-11 sm:w-11 ${
                  isAvailable ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
               }`}>
                 <SlotIcon type={slot.type} />
               </div>
               <div className="min-w-0 flex-1">
                  <h2 className="truncate text-[14px] font-bold leading-tight text-gray-900 sm:text-[16px]">{slot.name}</h2>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                     <span className="truncate text-[11px] font-medium text-gray-500 max-w-[100px] sm:max-w-none sm:text-[12px]">{site.domain}</span>
                     <span className="hidden h-1 w-1 shrink-0 rounded-full bg-gray-300 sm:block" />
                     <span className={`inline-flex shrink-0 items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                       isAvailable ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-blue-100 bg-blue-50 text-blue-700"
                     }`}>
                       {slot.status}
                     </span>
                  </div>
               </div>
            </div>
            <button
              onClick={onClose}
              className="ml-3 shrink-0 rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        )}

        {/* ── Body (Scrollable) ── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">

          {/* SECTION 1: Slot Information */}
          <div className="mb-6 sm:mb-8">
             <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 sm:mb-3.5 sm:text-[11.5px]">Slot Information</h3>
             <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3 sm:p-3.5">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide sm:text-[11px]">Placement</p>
                   <p className="mt-1 text-[12px] font-bold text-gray-900 sm:text-[13.5px]">{slot.name}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3 sm:p-3.5">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide sm:text-[11px]">Dimensions</p>
                   <p className="mt-1 text-[12px] font-bold text-gray-900 sm:text-[13.5px]">{slot.size}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3 sm:p-3.5">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide sm:text-[11px]">Ad Type</p>
                   <p className="mt-1 text-[12px] font-bold capitalize text-gray-900 sm:text-[13.5px]">Display {slot.type}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3 sm:p-3.5">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide sm:text-[11px]">Price</p>
                   <p className="mt-1 text-[12px] font-bold text-gray-900 sm:text-[13.5px]">{slot.price || "₹2500/day"}</p>
                </div>
             </div>
          </div>

          {/* SECTION 2: Performance Last 30 Days */}
          <div className="mb-6 sm:mb-8">
             <div className="mb-3 flex items-center justify-between sm:mb-3.5">
               <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 sm:text-[11.5px]">Performance (30D)</h3>
               <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md sm:text-[11.5px]">
                 <TrendingUp className="h-3 w-3" strokeWidth={2.5} /> +12%
               </span>
             </div>
             <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {/* Impressions */}
                <div className="rounded-xl border border-gray-100 p-2 shadow-sm transition-shadow hover:shadow-md min-w-0 sm:p-2.5">
                   <p className="truncate text-[9px] font-bold uppercase tracking-wide text-gray-400 sm:text-[10px]">Impressions</p>
                   <p className="mt-1 truncate text-[12px] font-black tracking-tight text-gray-900 sm:text-[14px]">{slot.impressions || "500K"}</p>
                   <svg className="mt-2 h-4 w-full text-blue-500 sm:mt-2.5 sm:h-5" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <polyline fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="0,15 20,10 40,12 60,5 80,10 100,2" />
                   </svg>
                </div>
                {/* CTR */}
                <div className="rounded-xl border border-gray-100 p-2 shadow-sm transition-shadow hover:shadow-md min-w-0 sm:p-2.5">
                   <p className="truncate text-[9px] font-bold uppercase tracking-wide text-gray-400 sm:text-[10px]">CTR</p>
                   <p className="mt-1 truncate text-[12px] font-black tracking-tight text-gray-900 sm:text-[14px]">1.85%</p>
                   <svg className="mt-2 h-4 w-full text-emerald-500 sm:mt-2.5 sm:h-5" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <polyline fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="0,18 20,12 40,15 60,8 80,4 100,5" />
                   </svg>
                </div>
                {/* Revenue */}
                <div className="rounded-xl border border-gray-100 p-2 shadow-sm transition-shadow hover:shadow-md min-w-0 sm:p-2.5">
                   <p className="truncate text-[9px] font-bold uppercase tracking-wide text-gray-400 sm:text-[10px]">Revenue</p>
                   <p className="mt-1 truncate text-[12px] font-black tracking-tight text-gray-900 sm:text-[14px]">{slot.price ? `₹${parseInt(slot.price.replace(/[^0-9]/g, '')) * 30}` : "₹75,000"}</p>
                   <svg className="mt-2 h-4 w-full text-purple-500 sm:mt-2.5 sm:h-5" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <polyline fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="0,18 20,15 40,10 60,12 80,5 100,2" />
                   </svg>
                </div>
             </div>
          </div>

          {/* SECTION 3: Current Advertiser */}
          {!isAvailable && slot.advertiser && (
            <div className="mb-4">
               <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 sm:mb-3.5 sm:text-[11.5px]">Current Advertiser</h3>
               <div className="group rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:border-blue-300 hover:shadow-md cursor-pointer sm:p-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 sm:pb-3.5">
                     <div className="flex items-center gap-3 sm:gap-3.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-md sm:h-[42px] sm:w-[42px]">
                           <span className="text-[14px] font-black sm:text-[16px]">{slot.advertiser.name.charAt(0)}</span>
                        </div>
                        <div>
                           <h4 className="text-[13px] font-bold text-gray-900 leading-tight sm:text-[14.5px]">{slot.advertiser.name}</h4>
                           <p className="text-[11px] font-medium text-amber-500 mt-0.5 sm:text-[12px]">Ends in 12 days</p>
                        </div>
                     </div>
                     <ArrowUpRight className="h-5 w-5 text-gray-300 transition-colors group-hover:text-blue-500" strokeWidth={2} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-3 sm:gap-4 sm:pt-3.5">
                     <div>
                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide sm:text-[10.5px]">Budget</p>
                       <p className="mt-1 text-[12px] font-black text-gray-800 sm:text-[13.5px]">{slot.advertiser.budget}</p>
                     </div>
                     <div>
                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide sm:text-[10.5px]">Daily Spend</p>
                       <p className="mt-1 text-[12px] font-black text-gray-800 sm:text-[13.5px]">{slot.advertiser.dailySpend}</p>
                     </div>
                     <div>
                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide sm:text-[10.5px]">Bid Amount</p>
                       <p className="mt-1 text-[12px] font-black text-gray-800 sm:text-[13.5px]">{slot.advertiser.bidAmount}</p>
                     </div>
                  </div>
               </div>
            </div>
          )}

        </div>

        {/* ── Footer Buttons ── */}
        <div className="border-t border-gray-100 bg-gray-50/50 p-4 sm:p-5">
           <div className="flex flex-col gap-2 sm:gap-3">
              {isAvailable ? (
                <button
                  onClick={() =>
                    toast({
                      title: "Auction Started",
                      message: `Auction initiated for ${slot.name}. Bids are now being collected.`,
                      type: "success",
                    })
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)] transition-all hover:bg-blue-700 hover:shadow-[0_6px_16px_rgba(37,99,235,0.35)] active:scale-[0.98] sm:py-3 sm:text-[14.5px]"
                >
                   <Zap className="h-4 w-4" strokeWidth={2.5} />
                   Start Auction
                </button>
              ) : (
                <button
                  onClick={() =>
                    toast({
                      title: "Campaign Details",
                      message: `Viewing campaign details for ${slot.name}. Full campaign view coming soon.`,
                      type: "info",
                    })
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-[13px] font-bold text-white shadow-md transition-all hover:bg-black active:scale-[0.98] sm:py-3 sm:text-[14.5px]"
                >
                   <BarChart3 className="h-4 w-4" strokeWidth={2.5} />
                   View Campaign
                </button>
              )}

              <div className="flex gap-2 sm:gap-3">
                 <button
                   onClick={() =>
                     toast({
                       title: "Edit Slot",
                       message: `Editing ${slot.name}. Slot editor coming soon.`,
                       type: "info",
                     })
                   }
                   className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2 text-[12px] font-bold text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] sm:gap-2 sm:py-2.5 sm:text-[13px]"
                 >
                    <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
                    Edit Slot
                 </button>
                 <button
                   onClick={() => {
                     removeSlot(site.id, slot.id);
                     onClose();
                     toast({
                       title: "Slot Removed",
                       message: `${slot.name} has been removed from the inventory.`,
                       type: "error",
                     });
                   }}
                   className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-100 bg-red-50 py-2 text-[12px] font-bold text-red-600 shadow-sm transition-all hover:border-red-200 hover:bg-red-100 active:scale-[0.98] sm:gap-2 sm:py-2.5 sm:text-[13px]"
                 >
                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
                    Remove
                 </button>
              </div>
           </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

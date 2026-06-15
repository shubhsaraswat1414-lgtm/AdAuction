import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WebsiteNode from "./WebsiteNode";
import AdSlotItem from "./AdSlotItem";
import { useAuction } from "../context/AuctionContext";
import {
  } from "lucide-react";





export default function WebsiteTree({ onSelectSlot, selectedSlotId }) {
  const { inventory, startAuction } = useAuction();
  const [expandedNodes, setExpandedNodes] = useState(["site-1"]); // Default expand first node

  const toggleNode = (id) => {
    setExpandedNodes((prev) =>
      prev.includes(id) ? prev.filter((nodeId) => nodeId !== id) : [...prev, id]
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
      {/* Header Row (Aligned with WebsiteNode grid layout) */}
      <div className="hidden lg:grid grid-cols-[minmax(0,1fr)_120px_120px_110px_90px] gap-4 px-4 py-3 text-[12px] font-semibold text-gray-500 border-b border-gray-100 mb-2">
        <div className="pl-[68px]">Website / Placement</div>
        <div>Category</div>
        <div>Monthly Traffic</div>
        <div>Est. Revenue</div>
        <div className="text-right pr-2">Status</div>
      </div>

      <div className="flex flex-col">
        {inventory.map((site) => {
          const isExpanded = expandedNodes.includes(site.id);

          return (
            <div key={site.id} className="relative flex flex-col">
              {/* ── Parent Node ── */}
              <WebsiteNode 
                website={site} 
                expanded={isExpanded} 
                onToggle={() => toggleNode(site.id)} 
              />

              {/* ── Child Nodes ── */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    {/* The vertical tree line space wrapper */}
                    <div className="relative ml-[22px] mb-2 pl-4 pt-1 lg:ml-8 lg:pl-6">
                      {/* Vertical line drawn down the container */}
                      <div className="absolute left-[34px] top-0 bottom-6 w-[2px] bg-gray-100 lg:left-[42px]" />
                      
                      {site.slots.map((slot, index) => {
                        const isLast = index === site.slots.length - 1;
                        const isSelected = selectedSlotId === slot.id;
                        return (
                          <AdSlotItem 
                            key={slot.id}
                            slot={slot}
                            isLast={isLast}
                            isSelected={isSelected}
                            onSelect={() => onSelectSlot && onSelectSlot(slot, site)}
                            onStartAuction={() => startAuction(slot.id, site.id, slot.name)}
                          />
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

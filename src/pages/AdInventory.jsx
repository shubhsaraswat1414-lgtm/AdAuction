import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InventoryStats from "../components/InventoryStats";
import InventoryFilters from "../components/InventoryFilters";
import WebsiteTree from "../components/WebsiteTree";
import SlotDetailsPanel from "../components/SlotDetailsPanel";
import {
  Plus,
  Download,
  X,
} from "lucide-react";
import { useToast } from "../hooks/useToast";

export default function AdInventory() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [showMobilePanel, setShowMobilePanel] = useState(false);
  const toast = useToast();

  const handleSelectSlot = (slot, site) => {
    setSelectedSlot(slot);
    setSelectedSite(site);
    // On mobile, show the panel as an overlay
    if (window.innerWidth < 1024) {
      setShowMobilePanel(true);
    }
  };

  const handleClosePanel = () => {
    setSelectedSlot(null);
    setSelectedSite(null);
    setShowMobilePanel(false);
  };

  return (
    <div className="flex-1 p-4 sm:p-6">
      {/* ── Page Header ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between"
      >
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-[22px]">Ad Inventory</h1>
          <p className="mt-1 text-[12px] text-gray-500 sm:text-[13px]">
            Manage publisher websites and advertisement placements
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              toast({
                title: "Export Started",
                message: "Your inventory report is being generated and will download shortly.",
                type: "success",
              })
            }
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-[12px] font-medium text-gray-600 transition-all hover:border-gray-300 hover:shadow-sm active:scale-[0.98] sm:px-4 sm:py-2.5 sm:text-[13px]"
          >
            <Download className="h-4 w-4" strokeWidth={1.8} />
            Export
          </button>
          <button
            onClick={() =>
              toast({
                title: "Add Website",
                message: "Website registration form will be available in the next update.",
                type: "info",
              })
            }
            className="flex items-center gap-2 rounded-xl bg-linear-to-r from-purple-600 to-blue-600 px-3 py-2 text-[12px] font-semibold text-white shadow-md shadow-purple-200/50 transition-all hover:shadow-lg hover:brightness-105 active:scale-[0.97] sm:px-4 sm:py-2.5 sm:text-[13px]"
          >
            <Plus className="h-4 w-4" strokeWidth={2.4} />
            Add Website
          </button>
        </div>
      </motion.div>

      {/* ── Analytics Cards ──────────────────────── */}
      <div className="mb-6 sm:mb-8">
        <InventoryStats />
      </div>

      {/* ── Search & Filter Row ──────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <InventoryFilters />
      </motion.div>

      {/* ── Two Column Layout ────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
        {/* Left: Inventory Tree */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="min-w-0"
        >
          <WebsiteTree
            onSelectSlot={handleSelectSlot}
            selectedSlotId={selectedSlot?.id}
          />
        </motion.div>

        {/* Right: Details Panel — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="hidden lg:block"
        >
          <div className="sticky top-[91px]">
            <SlotDetailsPanel
              slot={selectedSlot}
              site={selectedSite}
              onClose={handleClosePanel}
            />
          </div>
        </motion.div>
      </div>

      {/* ── Mobile Slot Details Drawer ────────────── */}
      <AnimatePresence>
        {showMobilePanel && selectedSlot && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={handleClosePanel}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 h-full w-full max-w-[380px] bg-white shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
                <h3 className="text-[14px] font-semibold text-gray-900">Slot Details</h3>
                <button
                  onClick={handleClosePanel}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <SlotDetailsPanel
                slot={selectedSlot}
                site={selectedSite}
                onClose={handleClosePanel}
                isMobile
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

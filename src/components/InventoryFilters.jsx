import { useState } from "react";
import { Search, ChevronDown, Plus } from "lucide-react";
import { useToast } from "../hooks/useToast";

export default function InventoryFilters() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const toast = useToast();

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] sm:mb-6 md:flex-row md:items-center md:justify-between">
      {/* ── Search Input Area ── */}
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <Search
            className={`h-[18px] w-[18px] transition-colors duration-200 ${
              searchFocused ? "text-blue-500" : "text-gray-400"
            }`}
            strokeWidth={2}
          />
        </div>
        <input
          type="text"
          placeholder="Search websites or ad slots..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className={`w-full rounded-lg bg-gray-50/50 py-2.5 pl-10 pr-4 text-[13px] text-gray-900 outline-none ring-1 ring-inset transition-all duration-200 placeholder:text-gray-400 hover:bg-gray-100/50 sm:text-[13.5px] ${
            searchFocused
              ? "bg-white ring-2 ring-blue-500"
              : "ring-gray-200"
          }`}
        />
      </div>

      {/* ── Filters & Actions Area ── */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Category Dropdown */}
        <div className="relative flex-1 sm:flex-none">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full appearance-none rounded-lg bg-white py-2.5 pl-3 pr-8 text-[12px] font-medium text-gray-700 outline-none ring-1 ring-inset ring-gray-200 transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 cursor-pointer sm:w-auto sm:pl-4 sm:pr-10 sm:text-[13px]"
          >
            <option value="All Categories">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="News">News</option>
            <option value="Gaming">Gaming</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3">
            <ChevronDown className="h-4 w-4 text-gray-500" strokeWidth={2} />
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="relative flex-1 sm:flex-none">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full appearance-none rounded-lg bg-white py-2.5 pl-3 pr-8 text-[12px] font-medium text-gray-700 outline-none ring-1 ring-inset ring-gray-200 transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 cursor-pointer sm:w-auto sm:pl-4 sm:pr-10 sm:text-[13px]"
          >
            <option value="All Status">All Status</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Reserved">Reserved</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3">
            <ChevronDown className="h-4 w-4 text-gray-500" strokeWidth={2} />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden h-7 w-px bg-gray-200 md:block" />

        {/* Add Slot Button */}
        <button
          onClick={() =>
            toast({
              title: "Add New Slot",
              message: "New ad slot creation form will be available soon.",
              type: "info",
            })
          }
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-[12px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.97] sm:w-auto sm:text-[13px]"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Add Slot
        </button>
      </div>
    </div>
  );
}

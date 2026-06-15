import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Bell,
  Settings,
  ChevronDown,
  Menu,
  } from "lucide-react";
import { useToast } from "../hooks/useToast";

import { useNavigate } from "react-router-dom";

export default function Navbar({ onMobileMenuOpen }) {
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const toast = useToast();
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const notifications = [
    { id: 1, title: "Campaign approved", desc: "Nike Summer Sale is live", time: "2m ago", read: false },
    { id: 2, title: "Budget alert", desc: "TechNova campaign at 90% spend", time: "15m ago", read: false },
    { id: 3, title: "New bid received", desc: "₹12.50 from GameX Pro", time: "1h ago", read: true },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-[65px] items-center justify-between border-b border-gray-200 bg-white px-3 sm:h-[75px] sm:px-4 md:px-6">
      {/* ── Left side ─────────────────────────────── */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1">
        {/* Mobile hamburger */}
        <button
          onClick={onMobileMenuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-xl
            text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700
            sm:h-10 sm:w-10 md:hidden"
          title="Open menu"
        >
          <Menu className="h-5 w-5" strokeWidth={1.8} />
        </button>

        {/* Search */}
        <div className="relative w-full max-w-xl">
          <Search
            className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-200 sm:left-3.5 sm:h-[18px] sm:w-[18px] ${
              searchFocused ? "text-purple-500" : "text-gray-400"
            }`}
            strokeWidth={1.8}
          />
          <input
            type="text"
            placeholder="Search campaigns..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`
              w-full rounded-xl border bg-gray-50 py-2 pl-9 pr-3 sm:py-2.5 sm:pl-11 sm:pr-4
              text-[13px] sm:text-[13.5px] text-gray-700 placeholder-gray-400
              outline-none transition-all duration-200
              ${
                searchFocused
                  ? "border-purple-300 bg-white shadow-sm shadow-purple-100 ring-2 ring-purple-100"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-100/60"
              }
            `}
          />
        </div>
      </div>

      {/* ── Right side ────────────────────────────── */}
      <div className="flex items-center gap-1 pl-2 sm:gap-2 sm:pl-4">
        {/* Create Campaign */}
        <button
          onClick={() =>
            toast({
              title: "Create Campaign",
              message: "Campaign creation wizard will be available in the next update.",
              type: "info",
            })
          }
          className="hidden items-center gap-2 rounded-xl bg-linear-to-r from-purple-600 to-blue-600
            px-3 py-2 text-[12px] font-semibold text-white shadow-md shadow-purple-200/50
            transition-all duration-200 hover:shadow-lg hover:shadow-purple-200/70
            hover:brightness-105 active:scale-[0.97] sm:flex sm:px-4 sm:py-2.5 sm:text-[13px]"
        >
          <Plus className="h-4 w-4" strokeWidth={2.4} />
          <span className="whitespace-nowrap">Create Campaign</span>
        </button>

        {/* Mobile: icon-only create */}
        <button
          onClick={() =>
            toast({
              title: "Create Campaign",
              message: "Campaign creation wizard coming soon.",
              type: "info",
            })
          }
          className="flex h-9 w-9 items-center justify-center rounded-xl
            bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-200/50
            transition-all hover:brightness-110 sm:hidden"
          title="Create Campaign"
        >
          <Plus className="h-5 w-5" strokeWidth={2.4} />
        </button>

        {/* Divider */}
        <div className="mx-1 hidden h-8 w-px bg-gray-200 sm:block sm:mx-1.5" />

        {/* Bell / Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotifications((prev) => !prev);
              setShowProfile(false);
            }}
            className="group relative flex h-9 w-9 items-center justify-center rounded-xl
              text-gray-500 transition-all duration-200
              hover:bg-gray-100 hover:text-gray-700 sm:h-10 sm:w-10"
            title="Notifications"
          >
            <Bell className="h-[18px] w-[18px] sm:h-[19px] sm:w-[19px]" strokeWidth={1.8} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500 sm:right-2 sm:top-2" />
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-[320px] max-w-[calc(100vw-24px)] rounded-xl border border-gray-200 bg-white shadow-xl z-50">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <h3 className="text-[13px] font-semibold text-gray-900">Notifications</h3>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    toast({ title: "Notifications cleared", type: "success" });
                  }}
                  className="text-[11px] font-medium text-purple-600 hover:text-purple-700"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-[280px] overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex gap-3 px-4 py-3 transition-colors hover:bg-gray-50 cursor-pointer ${
                      !n.read ? "bg-purple-50/40" : ""
                    }`}
                    onClick={() => {
                      setShowNotifications(false);
                      toast({ title: n.title, message: n.desc, type: "notification" });
                    }}
                  >
                    <div className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${!n.read ? "bg-purple-500" : "bg-transparent"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-medium text-gray-800 truncate">{n.title}</p>
                      <p className="text-[11.5px] text-gray-500 truncate">{n.desc}</p>
                    </div>
                    <span className="shrink-0 text-[10.5px] text-gray-400">{n.time}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 px-4 py-2.5">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    toast({ title: "All Notifications", message: "Full notification center coming soon.", type: "info" });
                  }}
                  className="w-full text-center text-[12px] font-medium text-purple-600 hover:text-purple-700"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <button
          onClick={() =>
            toast({
              title: "Settings",
              message: "Settings panel will be available soon.",
              type: "info",
            })
          }
          className="hidden h-9 w-9 items-center justify-center rounded-xl
            text-gray-500 transition-all duration-200
            hover:bg-gray-100 hover:text-gray-700 sm:flex sm:h-10 sm:w-10"
          title="Settings"
        >
          <Settings className="h-[18px] w-[18px] sm:h-[19px] sm:w-[19px]" strokeWidth={1.8} />
        </button>

        {/* Divider */}
        <div className="mx-1 hidden h-8 w-px bg-gray-200 md:block md:mx-1.5" />

        {/* User profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfile((prev) => !prev);
              setShowNotifications(false);
            }}
            className="group flex items-center gap-2 rounded-xl px-1.5 py-1 transition-all duration-200 hover:bg-gray-50 sm:gap-3 sm:px-2 sm:py-1.5"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-purple-600 to-blue-600 shadow-sm sm:h-9 sm:w-9">
              <span className="text-[12px] font-bold text-white sm:text-[13px]">SS</span>
            </div>
            <div className="hidden text-left leading-tight lg:block">
              <p className="text-[13px] font-semibold text-gray-800">
                Shubh Saraswat
              </p>
              <p className="text-[11px] text-gray-400">Ad Manager</p>
            </div>
            <ChevronDown
              className={`hidden h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:text-gray-600 lg:block ${showProfile ? "rotate-180" : ""}`}
              strokeWidth={1.8}
            />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-[200px] rounded-xl border border-gray-200 bg-white shadow-xl z-50">
              <div className="p-3 border-b border-gray-100">
                <p className="text-[13px] font-semibold text-gray-900">Shubh Saraswat</p>
                <p className="text-[11px] text-gray-500">shubh@adauction.com</p>
              </div>
              {[
                { label: "My Profile", action: "Profile page coming soon." },
                { label: "Account Settings", action: "Account settings coming soon." },
                { label: "Billing", action: "Billing dashboard coming soon." },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setShowProfile(false);
                    toast({ title: item.label, message: item.action, type: "info" });
                  }}
                  className="w-full px-4 py-2.5 text-left text-[12.5px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-gray-100">
                <button
                  onClick={() => {
                    setShowProfile(false);
                    toast({ title: "Signed out", message: "You have been signed out successfully.", type: "success" });
                    navigate("/auth", { state: { tab: "signup" } });
                  }}
                  className="w-full px-4 py-2.5 text-left text-[12.5px] font-medium text-red-600 hover:bg-red-50 transition-colors rounded-b-xl"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

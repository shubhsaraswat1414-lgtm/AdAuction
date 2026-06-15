import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Wallet,
  Radio,
  Users,
  Trophy,
  Globe,
  Route,
  HardDrive,
  Sparkles,
  ArrowRight,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  RotateCcw,
} from "lucide-react";
import { useToast } from "../hooks/useToast";
import { useAuction } from "../context/AuctionContext";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: Package, label: "Ad Inventory", path: "/ad-inventory" },
  { icon: Wallet, label: "Budget History", path: "/budget-history" },
  { icon: Radio, label: "Live Auction", path: "/live-auction" },
  { icon: Users, label: "Audience Manager", path: "/audience-manager" },
  { icon: Trophy, label: "Campaign Ranking", path: "/campaign-ranking" },
  { icon: Globe, label: "Publisher Network", path: "/publisher-network" },
  { icon: Route, label: "Delivery Routes", path: "/delivery-routes" },
  { icon: HardDrive, label: "Storage System", path: "/storage-system" },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const location = useLocation();
  const toast = useToast();
  const { resetData } = useAuction();

  const handleUpgrade = () => {
    toast({
      title: "Upgrade to Pro",
      message: "Premium features including advanced analytics, priority support & unlimited campaigns. Coming soon!",
      type: "upgrade",
      duration: 4000,
    });
  };

  const sidebarContent = (
    <>
      {/* ── Logo + Toggle ────────────────────────── */}
      <div className={`flex items-center px-4 py-5 ${collapsed && !mobileOpen ? "flex-col gap-3" : "justify-between"}`}>
        <Link to="/" className={`flex items-center gap-3 overflow-hidden ${collapsed && !mobileOpen ? "justify-center" : ""}`}>
          {/* gradient icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-purple-600 to-blue-600 shadow-md shadow-purple-200">
            <Sparkles className="h-5 w-5 text-white" strokeWidth={2.2} />
          </div>
          <div
            className={`leading-tight whitespace-nowrap transition-all duration-300 ${
              collapsed && !mobileOpen
                ? "w-0 scale-95 opacity-0 hidden"
                : "w-auto scale-100 opacity-100"
            }`}
          >
            <p className="text-[15px] font-bold tracking-tight text-gray-900">
              AdAuction
            </p>
            <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400">
              Manager
            </p>
          </div>
        </Link>

        {/* Desktop: collapse toggle | Mobile: close button */}
        <button
          onClick={mobileOpen ? onMobileClose : onToggle}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
            text-gray-400 transition-all duration-200
            hover:bg-gray-100 hover:text-gray-700"
          title={mobileOpen ? "Close menu" : collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {mobileOpen ? (
            <X className="h-[18px] w-[18px]" strokeWidth={1.8} />
          ) : collapsed ? (
            <PanelLeftOpen className="h-[18px] w-[18px]" strokeWidth={1.8} />
          ) : (
            <PanelLeftClose className="h-[18px] w-[18px]" strokeWidth={1.8} />
          )}
        </button>
      </div>

      {/* ── Divider ──────────────────────────────── */}
      <div className="mx-3 h-px bg-gray-100" />

      {/* ── Nav ──────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-4">
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
            const Icon = item.icon;
            const isCollapsedDesktop = collapsed && !mobileOpen;

            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  onClick={() => {
                    if (mobileOpen) onMobileClose();
                  }}
                  title={isCollapsedDesktop ? item.label : undefined}
                  className={`
                    group relative flex w-full items-center gap-3 rounded-lg
                    py-2.5 text-[13.5px] font-medium
                    transition-all duration-200
                    ${isCollapsedDesktop ? "justify-center px-0" : "px-3"}
                    ${
                      isActive
                        ? "bg-purple-50 text-purple-600"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <Icon
                    className={`h-[18px] w-[18px] shrink-0 transition-colors duration-200 ${
                      isActive
                        ? "text-purple-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                    strokeWidth={1.8}
                  />

                  <span
                    className={`whitespace-nowrap transition-all duration-300 ${
                      isCollapsedDesktop
                        ? "w-0 scale-95 opacity-0"
                        : "w-auto scale-100 opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>

                  {isActive && !isCollapsedDesktop && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-500" />
                  )}

                  {isCollapsedDesktop && (
                    <span
                      className="pointer-events-none absolute left-full ml-3 rounded-lg
                        bg-gray-900 px-3 py-1.5 text-[12px] font-medium text-white
                        opacity-0 shadow-lg transition-all duration-200
                        group-hover:opacity-100"
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Upgrade Card ─────────────────────────── */}
      <div className="mx-2.5 mb-4">
        {collapsed && !mobileOpen ? (
          <button
            onClick={handleUpgrade}
            title="Upgrade Plan"
            className="group flex w-full items-center justify-center rounded-lg
              bg-linear-to-r from-purple-600 to-blue-600 p-2.5
              shadow-md shadow-purple-200/50
              transition-all duration-300 hover:shadow-lg hover:brightness-110
              active:scale-[0.96]"
          >
            <Sparkles className="h-5 w-5 text-white" strokeWidth={2} />
          </button>
        ) : (
          <div className="rounded-xl border border-gray-100 bg-linear-to-br from-gray-50 to-purple-50/60 p-4 transition-all duration-300">
            <div className="mb-2 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-purple-500" strokeWidth={2} />
              <span className="text-[13px] font-semibold text-gray-900">
                Upgrade Plan
              </span>
            </div>
            <p className="mb-3 text-[12px] leading-relaxed text-gray-500">
              Unlock premium features and advanced analytics.
            </p>
            <button
              onClick={handleUpgrade}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 px-4 py-2 text-[12.5px] font-semibold text-white shadow-md shadow-purple-200/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/50 hover:brightness-110 active:scale-[0.98]"
            >
              Upgrade Now
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </div>

      {/* ── Reset Data ───────────────────────────── */}
      <div className="mx-2.5 mb-4">
        <button
          onClick={() => {
            if (confirm("Are you sure you want to completely reset all simulation data?")) {
              resetData();
            }
          }}
          title="Reset Simulation Data"
          className={`group flex w-full items-center justify-center gap-2 rounded-lg py-2 text-[12.5px] font-semibold transition-all duration-200
            bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700
            ${collapsed && !mobileOpen ? "px-2" : "px-4"}
          `}
        >
          <RotateCcw className={`h-4 w-4 transition-transform duration-300 group-hover:-rotate-90 ${collapsed && !mobileOpen ? "mx-auto" : ""}`} />
          {!(collapsed && !mobileOpen) && "Reset Data"}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ── Desktop sidebar ──────────────────────── */}
      <aside
        className={`
          fixed top-0 left-0 z-50 hidden h-screen flex-col
          border-r border-gray-200 bg-white
          transition-all duration-300 ease-in-out
          md:flex
          ${collapsed ? "w-[72px]" : "w-[260px]"}
        `}
      >
        {sidebarContent}
      </aside>

      {/* ── Mobile overlay ───────────────────────── */}
      {mobileOpen && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={onMobileClose}
          />
          {/* drawer */}
          <aside className="fixed top-0 left-0 z-50 flex h-screen w-[260px] flex-col border-r border-gray-200 bg-white shadow-2xl md:hidden">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}

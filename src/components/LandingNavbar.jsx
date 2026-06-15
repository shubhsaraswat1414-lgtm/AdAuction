import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
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
} from "lucide-react";

const features = [
  { icon: LayoutDashboard, label: "Overview", path: "/", desc: "Dashboard analytics" },
  { icon: Package, label: "Ad Inventory", path: "/ad-inventory", desc: "Manage placements" },
  { icon: Wallet, label: "Budget History", path: "/budget-history", desc: "Track spending" },
  { icon: Radio, label: "Live Auction", path: "/live-auction", desc: "Real-time bidding" },
  { icon: Users, label: "Audience Manager", path: "/audience-manager", desc: "Segment users" },
  { icon: Trophy, label: "Campaign Ranking", path: "/campaign-ranking", desc: "Performance scores" },
  { icon: Globe, label: "Publisher Network", path: "/publisher-network", desc: "Network graph" },
  { icon: Route, label: "Delivery Routes", path: "/delivery-routes", desc: "Shortest path" },
  { icon: HardDrive, label: "Storage System", path: "/storage-system", desc: "Cache hashing" },
];

export default function LandingNavbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[80px] flex items-center transition-all duration-300
          ${scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] border-b border-gray-100"
            : "bg-white border-b border-transparent"
          }`}
      >
        <div className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* ── Left: Logo ──────────────────── */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 via-purple-500 to-violet-600 shadow-lg shadow-purple-200/50 transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>
            <div className="leading-tight">
              <span className="text-[18px] font-extrabold tracking-tight text-gray-900">
                Ad<span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Auction</span>
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 -mt-0.5">
                Platform
              </p>
            </div>
          </Link>

          {/* ── Center: Desktop Nav ─────────── */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Features Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setFeaturesOpen(true)}
              onMouseLeave={() => setFeaturesOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all duration-200
                  ${featuresOpen
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                Features
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${featuresOpen ? "rotate-180" : ""}`}
                  strokeWidth={2.5}
                />
              </button>

              {/* Mega Dropdown */}
              {featuresOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2">
                  <div className="w-[580px] rounded-2xl border border-gray-200/80 bg-white p-4 shadow-2xl shadow-gray-200/60">
                    <div className="grid grid-cols-3 gap-1">
                      {features.map((f) => {
                        const Icon = f.icon;
                        return (
                          <Link
                            key={f.path}
                            to={f.path}
                            className="group/item flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-all duration-200 group-hover/item:bg-blue-100 group-hover/item:text-blue-600">
                              <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                            </div>
                            <div>
                              <p className="text-[13px] font-semibold text-gray-800 group-hover/item:text-blue-700 leading-tight">
                                {f.label}
                              </p>
                              <p className="text-[11px] text-gray-400 group-hover/item:text-blue-500/70 leading-tight mt-0.5">
                                {f.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between px-3">
                      <p className="text-[12px] text-gray-400">
                        9 powerful modules built with DSA
                      </p>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-1 text-[12px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Open Dashboard
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <NavLink label="Dashboard" to="/dashboard" />
            <NavLink label="Auctions" to="/live-auction" />
            <NavLink label="Network" to="/publisher-network" />
            <NavLink label="Analytics" to="/campaign-ranking" />
          </div>

          {/* ── Right: CTA ─────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => navigate("/auth", { state: { tab: "login" } })}
              className="px-5 py-2.5 text-[13.5px] font-semibold text-gray-600 rounded-xl transition-all duration-200 hover:text-gray-900 hover:bg-gray-50"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/auth", { state: { tab: "signup" } })}
              className="group flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13.5px] font-bold text-white
                bg-linear-to-r from-blue-600 via-purple-600 to-violet-600
                shadow-lg shadow-purple-300/40
                transition-all duration-300
                hover:shadow-xl hover:shadow-purple-300/60 hover:brightness-110 hover:-translate-y-0.5
                active:scale-[0.97]"
            >
              Start Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </button>
          </div>

          {/* ── Mobile Hamburger ────────────── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex lg:hidden h-10 w-10 items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ────────── */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-[80px] left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-xl lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="p-4 space-y-1">
              <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Features
              </p>
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <Link
                    key={f.path}
                    to={f.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold">{f.label}</p>
                      <p className="text-[11px] text-gray-400">{f.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="p-4 pt-2 border-t border-gray-100 space-y-2">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/auth", { state: { tab: "login" } });
                }}
                className="w-full py-3 rounded-xl text-[14px] font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/auth", { state: { tab: "signup" } });
                }}
                className="w-full py-3 rounded-xl text-[14px] font-bold text-white bg-linear-to-r from-blue-600 via-purple-600 to-violet-600 shadow-lg shadow-purple-300/30 transition-all hover:brightness-110"
              >
                Start Now →
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function NavLink({ label, to }) {
  return (
    <Link
      to={to}
      className="px-4 py-2.5 rounded-xl text-[13.5px] font-semibold text-gray-600 transition-all duration-200 hover:text-gray-900 hover:bg-gray-50"
    >
      {label}
    </Link>
  );
}

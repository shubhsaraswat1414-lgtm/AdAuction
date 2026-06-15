import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Package,
  Wallet,
  Radio,
  Users,
  Trophy,
  Globe,
  Route,
  HardDrive,
  Sparkles,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react";
import LandingNavbar from "../components/LandingNavbar";
import PromoBanner from "../components/PromoBanner";
import HeroIllustration from "../components/HeroIllustration";
import TrustedLogos from "../components/TrustedLogos";

const highlights = [
  { icon: Zap, title: "Real-Time Bidding", desc: "Queue-based FIFO auction engine processes bids live with instant visualization." },
  { icon: Shield, title: "Smart Caching", desc: "Hash-based storage distributes ads across cache servers with dynamic scaling." },
  { icon: BarChart3, title: "Campaign Analytics", desc: "Heap-sorted campaign rankings with ROI tracking and performance scoring." },
  { icon: Globe, title: "Network Routing", desc: "Dijkstra's algorithm finds the fastest ad delivery path across your network." },
];

const features = [
  { icon: Package, title: "Ad Inventory", desc: "Tree-structured publisher management with nested ad slots and real-time status tracking.", color: "blue" },
  { icon: Wallet, title: "Budget History", desc: "Stack-based budget operations with push/pop undo — see every financial change.", color: "purple" },
  { icon: Radio, title: "Live Auction", desc: "Queue data structure powers FIFO bid processing with animated enqueue/dequeue.", color: "emerald" },
  { icon: Users, title: "Audience Manager", desc: "Linked list audience segmentation with insert, delete, and traversal operations.", color: "amber" },
  { icon: Trophy, title: "Campaign Ranking", desc: "Heap sort algorithm ranks campaigns by composite score in real-time.", color: "rose" },
  { icon: Globe, title: "Publisher Network", desc: "Graph visualization of the entire ad network with adjacency list representation.", color: "indigo" },
  { icon: Route, title: "Delivery Routes", desc: "Shortest path routing via Dijkstra's algorithm to minimize ad delivery latency.", color: "cyan" },
  { icon: HardDrive, title: "Storage System", desc: "Consistent hashing distributes cached ads with add/remove server scaling.", color: "violet" },
];

const colorMap = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-100" },
  violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-100" },
};

const dsaConcepts = [
  "Queue (FIFO)", "Stack (LIFO)", "Hash Table", "Binary Heap",
  "Graphs", "Dijkstra's Algorithm", "Trees", "Linked Lists",
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      {/* ── Hero Section ────────────────────────── */}
      <section className="relative pt-[80px] overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-blue-50/80 via-purple-50/30 to-white pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-200/20 blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-200/20 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <PromoBanner />
        </div>

        <div className="relative max-w-[1320px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-24 sm:pb-36">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-10 items-center">
            {/* ── Left Column ─────────────────────── */}
            <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200 mb-8 shadow-sm">
                <span className="text-[11px] font-extrabold text-gray-600 tracking-[0.15em] uppercase">
                  ✦ AI POWERED AD EXCHANGE
                </span>
              </div>

              <h1 className="text-[44px] sm:text-[56px] lg:text-[68px] font-extrabold tracking-tight text-gray-900 leading-[1.08] mb-8">
                The future of advertising is <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">real-time.</span>
              </h1>

              <p className="text-[18px] sm:text-[20px] text-gray-500 leading-relaxed mb-12 max-w-xl font-medium">
                AdAuction connects advertisers and publishers through AI-powered real-time auctions that deliver higher ROI for everyone.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <button
                  onClick={() => navigate("/auth")}
                  className="group flex justify-center items-center gap-2 px-8 py-4 rounded-2xl text-[16px] font-bold text-white
                    bg-linear-to-r from-purple-600 to-blue-600
                    shadow-xl shadow-purple-200/60
                    transition-all duration-300
                    hover:shadow-2xl hover:shadow-purple-300/60 hover:-translate-y-1 hover:brightness-110
                    active:scale-[0.98] w-full sm:w-auto"
                >
                  Launch Campaign
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="flex justify-center items-center gap-2.5 px-8 py-4 rounded-2xl text-[16px] font-bold text-gray-700
                    bg-white border-2 border-gray-200
                    transition-all duration-300
                    hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 hover:-translate-y-1
                    active:scale-[0.98] w-full sm:w-auto"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Watch Demo
                </button>
              </div>

              {/* DSA Pills - Retained as subtle bottom context */}
              <div className="mt-14 flex flex-wrap items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                {dsaConcepts.map((concept) => (
                  <span
                    key={concept}
                    className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wide bg-gray-50 border border-gray-100 text-gray-400"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right Column ────────────────────── */}
            <div className="relative w-full min-h-[450px] lg:min-h-[600px] flex items-center justify-center animate-in fade-in zoom-in-95 duration-1000 delay-200">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted Logos ───────────────────────── */}
      <TrustedLogos />

      {/* ── Highlights Row ──────────────────────── */}
      <section className="relative py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.title}
                  className="group relative flex flex-col p-6 rounded-2xl border border-gray-100 bg-white
                    transition-all duration-300 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-purple-50 text-blue-600 mb-4
                    transition-colors duration-300 group-hover:from-blue-100 group-hover:to-purple-100">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-2">{h.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{h.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Features Grid ───────────────────────── */}
      <section className="py-20 sm:py-28 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-[11px] font-bold text-purple-600 uppercase tracking-[0.15em] mb-4">
              Modules
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Every feature, powered by DSA
            </h2>
            <p className="mt-4 text-[16px] text-gray-500 max-w-xl mx-auto">
              Each module in the dashboard is a practical demonstration of a core data structure or algorithm.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              const c = colorMap[f.color];
              return (
                <div
                  key={f.title}
                  className={`group relative flex flex-col p-6 rounded-2xl border bg-white
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 ${c.border}`}
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.bg} ${c.text} mb-4
                    transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed flex-1">{f.desc}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => {
                        const paths = {
                          "Ad Inventory": "/ad-inventory",
                          "Budget History": "/budget-history",
                          "Live Auction": "/live-auction",
                          "Audience Manager": "/audience-manager",
                          "Campaign Ranking": "/campaign-ranking",
                          "Publisher Network": "/publisher-network",
                          "Delivery Routes": "/delivery-routes",
                          "Storage System": "/storage-system",
                        };
                        navigate(paths[f.title] || "/");
                      }}
                      className={`flex items-center gap-1 text-[12px] font-bold ${c.text} transition-all duration-200 hover:gap-2`}
                    >
                      Explore
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-blue-600 via-purple-600 to-violet-700 p-10 sm:p-16 text-center">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ready to explore the platform?
              </h2>
              <p className="mt-4 text-lg text-blue-100 max-w-xl mx-auto">
                Dive into the interactive dashboard and see how data structures power a real ad tech system.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-[15px] font-bold text-purple-700
                    bg-white shadow-xl
                    transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
                    active:scale-[0.97]"
                >
                  Launch Dashboard
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => navigate("/auth")}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl text-[15px] font-bold text-white
                    border-2 border-white/30
                    transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5"
                >
                  Sign Up Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────── */}
      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-[14px] font-bold text-gray-800">
              Ad<span className="text-purple-600">Auction</span>
            </span>
          </div>
          <p className="text-[12px] text-gray-400 font-medium">
            Built with React · Demonstrating DSA concepts through interactive UI
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/auth")} className="text-[12px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
              Login
            </button>
            <button onClick={() => navigate("/")} className="text-[12px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
              Dashboard
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

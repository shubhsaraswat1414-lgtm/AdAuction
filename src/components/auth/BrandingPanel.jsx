import { motion } from "framer-motion";
import { Gavel, TrendingUp, ShieldCheck, Zap, Layout, IndianRupee } from "lucide-react";
import FeatureCard from "../ui/FeatureCard";

export default function BrandingPanel() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-linear-to-br from-indigo-900 via-purple-900 to-violet-950 p-8 sm:p-10 lg:p-12">
      {/* Background Decorative Blobs */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-purple-600/30 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/20 blur-3xl" />

      {/* ── Logo Section ── */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-auto"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-500 to-indigo-600 shadow-lg border border-purple-400/30">
            <Gavel className="h-6 w-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white">AdAuction</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-purple-300">
              Bid. Win. Advertise.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Center Content: Hero Text & CSS Illustration ── */}
      <div className="relative z-10 my-12 flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-4xl font-extrabold leading-tight text-white lg:text-5xl">
            The Smarter Way to <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-300 to-fuchsia-300">
              Buy & Sell
            </span>{" "}
            Ad Spaces
          </h2>
          <p className="mt-6 text-base font-medium text-purple-200 leading-relaxed max-w-sm">
            AdAuction connects advertisers and publishers in a transparent competitive marketplace.
          </p>
        </motion.div>

        {/* CSS Illustration Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-56 w-full max-w-sm"
        >
          {/* Main Dashboard / Card */}
          <div className="absolute left-4 top-8 h-40 w-64 rounded-xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md">
            <div className="mb-3 flex gap-1.5">
              <div className="h-2 w-2 rounded-full bg-red-400/80" />
              <div className="h-2 w-2 rounded-full bg-amber-400/80" />
              <div className="h-2 w-2 rounded-full bg-emerald-400/80" />
            </div>
            {/* Dashboard Content Mockup */}
            <div className="flex h-24 gap-3">
              <div className="h-full w-1/3 rounded-lg border border-white/10 bg-white/5" />
              <div className="flex h-full w-2/3 flex-col gap-2">
                <div className="h-10 w-full rounded-lg border border-white/10 bg-white/5" />
                <div className="h-12 w-full rounded-lg bg-linear-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30" />
              </div>
            </div>
          </div>

          {/* Floating Ad Block */}
          <motion.div 
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -left-2 top-20 flex h-14 w-14 items-center justify-center rounded-xl border border-indigo-400/30 bg-indigo-500/20 shadow-xl backdrop-blur-md"
          >
            <Layout className="h-6 w-6 text-indigo-200" />
          </motion.div>

          {/* Floating Auction Hammer */}
          <motion.div 
            animate={{ y: [5, -5, 5], rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -right-2 top-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-fuchsia-400/30 bg-fuchsia-500/20 shadow-xl backdrop-blur-md"
          >
            <Gavel className="h-8 w-8 text-fuchsia-200" />
          </motion.div>

          {/* Floating Highest Bid Card */}
          <motion.div 
            animate={{ y: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
            className="absolute right-6 bottom-4 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/20 px-3 py-2 shadow-xl backdrop-blur-md"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/40">
              <IndianRupee className="h-4 w-4 text-emerald-100" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-200">Highest Bid</p>
              <p className="text-sm font-black text-white">₹450</p>
            </div>
          </motion.div>

          {/* Floating Growth Graph Icon */}
          <motion.div 
            animate={{ y: [4, -4, 4] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute left-1/2 -top-6 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/20 shadow-xl backdrop-blur-md"
          >
            <TrendingUp className="h-5 w-5 text-blue-200" />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom Section: Feature Cards ── */}
      <div className="relative z-10 mt-auto pt-8">
        <div className="flex flex-col gap-3">
          <FeatureCard
            title="Wider Reach"
            description="Connect with the right audience"
            icon={Zap}
            delay={0.3}
          />
          <FeatureCard
            title="Transparent"
            description="Fair bidding and real results"
            icon={ShieldCheck}
            delay={0.4}
          />
          <FeatureCard
            title="Better Value"
            description="Best ROI for your ad spend"
            icon={TrendingUp}
            delay={0.5}
          />
        </div>
      </div>
    </div>
  );
}

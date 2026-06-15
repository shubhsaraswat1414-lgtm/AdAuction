import { motion } from "framer-motion";
import { ArrowRight, } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroVisual from "./HeroVisual";
import PromoBanner from "../PromoBanner";
import styles from "./Hero.module.css";

export default function Hero() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section className={`${styles.heroSection} relative pt-[80px] overflow-hidden`}>
      {/* CSS Modules Backgrounds */}
      <div className={styles.bgGradient} />
      <div className={styles.blueBlob} />
      <div className={styles.purpleBlob} />

      <div className="relative z-10">
        <PromoBanner />
      </div>

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 items-center">
          {/* ── Left Column ─────────────────────── */}
          <motion.div 
            className="max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200 mb-8 shadow-sm">
              <span className="text-[11px] font-extrabold text-gray-600 tracking-[0.15em] uppercase">
                ✦ AI POWERED AD EXCHANGE
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-[44px] sm:text-[56px] lg:text-[68px] font-extrabold tracking-tight text-gray-900 leading-[1.08] mb-8">
              The future of advertising is <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">real-time.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-[18px] sm:text-[20px] text-gray-500 leading-relaxed mb-12 max-w-xl font-medium">
              AdAuction connects advertisers and publishers through AI-powered real-time auctions that deliver higher ROI for everyone.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
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
            </motion.div>
          </motion.div>

          {/* ── Right Column ────────────────────── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative w-full min-h-[450px] lg:min-h-[600px] flex items-center justify-center"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

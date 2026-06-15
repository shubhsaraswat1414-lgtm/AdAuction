import { motion } from "framer-motion";

export default function FeatureCard({ title, description, icon: Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/15 cursor-pointer"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/30 text-purple-100 shadow-inner">
        <Icon className="h-6 w-6" strokeWidth={2} />
      </div>
      <div>
        <h3 className="text-[15px] font-bold tracking-wide text-white">{title}</h3>
        <p className="mt-0.5 text-[13px] font-medium leading-snug text-purple-200">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

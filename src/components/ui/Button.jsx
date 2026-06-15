import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  onClick,
  loading = false,
  disabled = false,
  type = "button",
  fullWidth = false,
  className = "",
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!(disabled || loading) ? { scale: 1.02 } : {}}
      whileTap={!(disabled || loading) ? { scale: 0.98 } : {}}
      className={`
        relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-bold text-white shadow-md transition-all
        bg-linear-to-r from-purple-600 via-fuchsia-600 to-indigo-600
        hover:shadow-lg hover:shadow-purple-500/30
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        ${fullWidth ? "w-full" : ""}
        ${disabled || loading ? "opacity-70 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {/* Glossy overlay effect for premium feel */}
      <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />
      
      {loading && <Loader2 className="h-4 w-4 animate-spin text-white relative z-10" />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

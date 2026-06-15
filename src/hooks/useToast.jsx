/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X, Sparkles, Bell } from "lucide-react";

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  upgrade: Sparkles,
  notification: Bell,
};

const STYLES = {
  success: {
    bg: "bg-emerald-50 border-emerald-200",
    icon: "text-emerald-500",
    title: "text-emerald-900",
    msg: "text-emerald-700",
  },
  error: {
    bg: "bg-red-50 border-red-200",
    icon: "text-red-500",
    title: "text-red-900",
    msg: "text-red-700",
  },
  info: {
    bg: "bg-blue-50 border-blue-200",
    icon: "text-blue-500",
    title: "text-blue-900",
    msg: "text-blue-700",
  },
  upgrade: {
    bg: "bg-purple-50 border-purple-200",
    icon: "text-purple-500",
    title: "text-purple-900",
    msg: "text-purple-700",
  },
  notification: {
    bg: "bg-amber-50 border-amber-200",
    icon: "text-amber-500",
    title: "text-amber-900",
    msg: "text-amber-700",
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, message, type = "info", duration = 3000 }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-100 flex flex-col gap-3 pointer-events-none w-[360px] max-w-[calc(100vw-32px)]">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = ICONS[toast.type] || ICONS.info;
            const style = STYLES[toast.type] || STYLES.info;

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-sm ${style.bg}`}
              >
                <div className={`mt-0.5 shrink-0 ${style.icon}`}>
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] font-semibold ${style.title}`}>
                    {toast.title}
                  </p>
                  {toast.message && (
                    <p className={`mt-0.5 text-[12px] leading-relaxed ${style.msg}`}>
                      {toast.message}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 rounded-lg p-1 text-gray-400 transition-colors hover:bg-white/50 hover:text-gray-600"
                >
                  <X className="h-4 w-4" strokeWidth={2} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

import { motion } from "framer-motion";
import BrandingPanel from "./BrandingPanel";
import AuthForm from "./AuthForm";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] sm:flex-row min-h-[600px] border border-gray-100"
      >
        {/* Left Side: Branding Panel (Hidden on small mobile, visible on lg) */}
        <div className="hidden w-full sm:block sm:w-1/2">
          <BrandingPanel />
        </div>

        {/* Right Side: Auth Form */}
        <div className="flex w-full flex-col justify-center p-8 sm:w-1/2 sm:p-12 lg:p-16">
          <AuthForm />
        </div>
      </motion.div>
    </div>
  );
}

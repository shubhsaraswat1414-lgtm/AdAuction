import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Building2, ChevronDown, CheckSquare, Square, Target } from "lucide-react";
import Button from "../ui/Button";
import SocialButton from "../ui/SocialButton";
import InputField from "../ui/InputField";

// Custom Google SVG icon
const GoogleIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
    </g>
  </svg>
);

// Custom Facebook SVG icon
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function AuthForm() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || "login");
  const [rememberMe, setRememberMe] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    company: "",
    accountType: "Advertiser",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const formVariants = {
    hidden: { opacity: 0, x: activeTab === "login" ? -20 : 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: activeTab === "login" ? 20 : -20 },
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col">
      {/* Mobile Branding Fallback */}
      <Link to="/" className="mb-8 flex flex-col items-center text-center sm:hidden">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 shadow-lg shadow-purple-600/20">
          <Target className="h-6 w-6 text-white" strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          AdAuction
        </h1>
      </Link>

      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {activeTab === "login" ? "Welcome back" : "Create an account"}
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          {activeTab === "login"
            ? "Sign in to manage your ad inventory and campaigns."
            : "Join AdAuction to start managing your advertising workflow."}
        </p>
      </div>

      {/* ── Tabs ── */}
      <div className="relative mb-6 flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("login")}
          className={`flex-1 pb-3 text-sm font-bold transition-colors ${
            activeTab === "login" ? "text-purple-600" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab("signup")}
          className={`flex-1 pb-3 text-sm font-bold transition-colors ${
            activeTab === "signup" ? "text-purple-600" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Signup
        </button>
        {/* Animated Underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-1/2 bg-purple-600"
          animate={{ x: activeTab === "login" ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* ── Social Logins ── */}
      <div className="mb-6 flex flex-col gap-3">
        <SocialButton provider="Google" icon={GoogleIcon} onClick={() => {}} />
        <SocialButton provider="Facebook" icon={FacebookIcon} onClick={() => {}} />
      </div>

      <div className="mb-6 relative flex items-center justify-center">
        <div className="absolute inset-x-0 h-px bg-gray-200" />
        <span className="relative bg-white px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Or continue with email
        </span>
      </div>

      {/* ── Form Container ── */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={activeTab}>
          <motion.form
            key={activeTab}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* ── LOGIN FORM FIELDS ── */}
            {activeTab === "login" && (
              <>
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  icon={Mail}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-sm font-semibold text-gray-700">Password</label>
                    <button type="button" className="text-xs font-semibold text-purple-600 hover:text-purple-500">
                      Forgot password?
                    </button>
                  </div>
                  <InputField
                    name="password"
                    type="password"
                    icon={Lock}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    {rememberMe ? (
                      <CheckSquare className="h-4 w-4 text-purple-600" />
                    ) : (
                      <Square className="h-4 w-4 text-gray-400" />
                    )}
                    Remember me
                  </button>
                </div>
                <Button type="submit" fullWidth className="mt-2">
                  Sign in
                </Button>
              </>
            )}

            {/* ── SIGNUP FORM FIELDS ── */}
            {activeTab === "signup" && (
              <>
                <InputField
                  label="Full Name"
                  name="name"
                  type="text"
                  icon={User}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  icon={Mail}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Company Name"
                  name="company"
                  type="text"
                  icon={Building2}
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
                
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Account Type <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      name="accountType"
                      value={formData.accountType}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-10 text-sm text-gray-900 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    >
                      <option value="Advertiser">Advertiser (Buy Ads)</option>
                      <option value="Publisher">Publisher (Sell Ads)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-gray-400" />
                  </div>
                </div>

                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  icon={Lock}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  icon={Lock}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                
                <Button type="submit" fullWidth className="mt-2">
                  Create account
                </Button>
              </>
            )}
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  );
}

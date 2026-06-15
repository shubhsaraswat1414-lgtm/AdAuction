import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Target,
  CheckCircle2,
  ArrowRight,
  UserCircle,
  Hash,
  Sparkles,
  Search,
  Shuffle,
  ShieldCheck,
  Database
} from "lucide-react";

// Hash Table
const HASH_TABLE = {
  gaming: { ad: "Xbox Game Pass Ultimate Promo", category: "Gaming", score: 92, color: "text-purple-600", bg: "bg-purple-100" },
  sports: { ad: "ESPN+ Live Sports Subscription", category: "Sports", score: 88, color: "text-green-600", bg: "bg-green-100" },
  technology: { ad: "AWS Cloud Services Promo", category: "Technology", score: 95, color: "text-purple-600", bg: "bg-purple-100" },
  fashion: { ad: "Zara Winter Collection Ad", category: "Fashion", score: 85, color: "text-pink-600", bg: "bg-pink-100" },
  travel: { ad: "MakeMyTrip Flight Deals", category: "Travel", score: 90, color: "text-orange-600", bg: "bg-orange-100" },
};

const RANDOM_USERS = [
  { id: "USR-1024", age: 21, location: "Mumbai", interest: "Gaming", device: "Mobile" },
  { id: "USR-2048", age: 34, location: "London", interest: "Technology", device: "Desktop" },
  { id: "USR-3096", age: 28, location: "New York", interest: "Fashion", device: "Tablet" },
  { id: "USR-4192", age: 45, location: "Tokyo", interest: "Travel", device: "Mobile" },
  { id: "USR-5201", age: 19, location: "Sydney", interest: "Sports", device: "Desktop" },
];

export default function AudienceManager() {
  const [currentUser, setCurrentUser] = useState(RANDOM_USERS[0]);
  const [matchedAd, setMatchedAd] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const generateRandomUser = () => {
    setMatchedAd(null);
    let newUser;
    do {
      newUser = RANDOM_USERS[Math.floor(Math.random() * RANDOM_USERS.length)];
    } while (newUser.id === currentUser.id);
    setCurrentUser(newUser);
  };

  const findMatchingAd = () => {
    setIsProcessing(true);
    setMatchedAd(null);
    
    // Simulate slight processing delay for visualization
    setTimeout(() => {
      const key = currentUser.interest.toLowerCase();
      // O(1) Hash Table Lookup
      const result = HASH_TABLE[key];
      setMatchedAd(result);
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 w-full max-w-7xl mx-auto">
      {/* ── Header ──────────────────────────────── */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Target className="h-6 w-6 text-purple-600" />
          Audience Manager
        </h1>
        <p className="text-gray-500 text-sm">
          Match users with targeted advertisements using Hash Table lookup
        </p>
      </div>

      {/* ── Stats ───────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Total Users", value: "50,000", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
          { title: "Audience Groups", value: "12", icon: Database, color: "text-purple-600", bg: "bg-purple-50" },
          { title: "Match Accuracy", value: "92%", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex items-center gap-4"
          >
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Main Section ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* LEFT: User Profile */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="border-b border-gray-100 bg-gray-50/50 p-4 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-gray-500" />
              User Profile
            </h2>
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
              {currentUser.id}
            </span>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-center gap-4">
            <div className="space-y-3">
              {[
                { label: "Age", value: currentUser.age },
                { label: "Location", value: currentUser.location },
                { label: "Interest", value: currentUser.interest, highlight: true },
                { label: "Device", value: currentUser.device },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className={`font-medium ${item.highlight ? "text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md" : "text-gray-900"}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={generateRandomUser}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded-lg transition-colors text-sm border border-gray-200"
            >
              <Shuffle className="h-4 w-4" />
              Generate Random User
            </button>
          </div>
        </motion.div>

        {/* CENTER: Hash Processing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6 relative z-10">
            O(1) Hash Lookup
          </h2>

          <div className="flex flex-col items-center gap-4 w-full">
            <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium border border-purple-100 shadow-sm w-3/4 text-center">
              "{currentUser.interest.toLowerCase()}"
            </div>

            <motion.div
              animate={isProcessing ? { y: [0, 10, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
              className="h-10 w-px bg-linear-to-b from-purple-200 to-purple-500 relative"
            >
              <div className="absolute -bottom-1 -left-1.5 w-3 h-3 border-r-2 border-b-2 border-purple-500 transform rotate-45"></div>
            </motion.div>

            <button
              onClick={findMatchingAd}
              disabled={isProcessing}
              className={`relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300
                ${isProcessing ? "bg-purple-600 scale-95 shadow-purple-500/50" : "bg-linear-to-br from-purple-500 to-purple-600 hover:shadow-purple-500/40 hover:-translate-y-1"}
              `}
            >
              {isProcessing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Hash className="h-8 w-8 text-white" />
                </motion.div>
              ) : (
                <Search className="h-8 w-8 text-white" />
              )}
            </button>

            <motion.div
              animate={isProcessing ? { y: [0, 10, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
              className="h-10 w-px bg-linear-to-b from-purple-500 to-pink-500 relative"
            >
              <div className="absolute -bottom-1 -left-1.5 w-3 h-3 border-r-2 border-b-2 border-purple-500 transform rotate-45"></div>
            </motion.div>

            <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium border border-purple-100 shadow-sm w-3/4 text-center truncate">
              {matchedAd ? matchedAd.ad : "Waiting..."}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Recommended Advertisement */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden"
        >
          <div className="border-b border-gray-100 bg-gray-50/50 p-4 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Targeted Ad
            </h2>
          </div>
          
          <div className="p-5 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {matchedAd ? (
                <motion.div
                  key="matched"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col h-full"
                >
                  <div className={`inline-flex items-center gap-1.5 w-max px-2.5 py-1 rounded-full text-xs font-semibold ${matchedAd.bg} ${matchedAd.color} mb-4`}>
                    <Target className="h-3.5 w-3.5" />
                    {matchedAd.category}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2">
                    {matchedAd.ad}
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-6">
                    Perfect match based on user's recent browsing history and profile segment.
                  </p>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        Match Score
                      </span>
                      <span className="text-sm font-bold text-emerald-600">{matchedAd.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${matchedAd.score}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center opacity-50"
                >
                  <Search className="h-12 w-12 text-gray-300 mb-3" strokeWidth={1} />
                  <p className="text-sm text-gray-500">
                    Click the search icon to find<br/>a matching ad instantly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Section: Hash Table Data ──────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="border-b border-gray-100 bg-gray-50/50 p-4 px-6 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <Hash className="h-5 w-5 text-gray-500" />
            Hash Table Reference (Memory State)
          </h2>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/30 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Key (Interest)</th>
                <th className="px-6 py-3 font-medium"></th>
                <th className="px-6 py-3 font-medium">Value (Advertisement)</th>
                <th className="px-6 py-3 font-medium">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Object.entries(HASH_TABLE).map(([key, data]) => (
                <tr key={key} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-purple-600 bg-purple-50/30">
                    "{key}"
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    <ArrowRight className="h-4 w-4" />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {data.ad}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${data.bg} ${data.color}`}>
                      {data.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

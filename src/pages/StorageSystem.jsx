import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuction, ADVERTISERS } from "../context/AuctionContext";
import {
  HardDrive,
  Database,
  Server as ServerIcon,
  PieChart,
  ArrowDown,
  Hash,
  CheckCircle2,
  FileImage,
  Tag,
  Cpu,
  Trash2,
  XCircle
} from "lucide-react";

export default function StorageSystem() {
  const { servers, storeInCache, deleteFromCache, addServer, removeServer } = useAuction();
  const [adName, setAdName] = useState(ADVERTISERS[0]);
  const [category, setCategory] = useState("Sports");
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0); // 0: Idle, 1: Hashing, 2: Done
  const [assignedServer, setAssignedServer] = useState(null);
  const [lastAction, setLastAction] = useState("store");
  const [actionSuccess, setActionSuccess] = useState(true);

  const handleStore = () => {
    if (!adName.trim()) return;

    setIsProcessing(true);
    setProcessingStep(1);
    setAssignedServer(null);
    setLastAction("store");

    // Step 1: Compute Hash
    
    // Step 2: Determine Server (modulo arithmetic)

    setTimeout(() => {
      setProcessingStep(2);
      
      const { serverIndex } = storeInCache(adName);
      
      // Need to defer assignedServer update slightly to let context propagate
      // but for UI sake, we can just grab from the current `servers` array 
      // with updated properties manually for the assigned display
      const updatedServer = { ...servers[serverIndex], ads: [...servers[serverIndex].ads, adName], storage: Math.min(100, servers[serverIndex].storage + 2) };
      setAssignedServer(updatedServer);

      setActionSuccess(true);
      setIsProcessing(false);
    }, 1200); // Wait to show hashing animation
  };

  const handleDelete = () => {
    if (!adName.trim()) return;

    setIsProcessing(true);
    setProcessingStep(1);
    setAssignedServer(null);
    setLastAction("delete");

    
    setTimeout(() => {
      setProcessingStep(2);
      
      const { serverIndex, found } = deleteFromCache(adName);
      
      const updatedServer = { ...servers[serverIndex], ads: servers[serverIndex].ads.filter(a => a !== adName), storage: found ? Math.max(0, servers[serverIndex].storage - 2) : servers[serverIndex].storage };
      setAssignedServer(updatedServer);

      setActionSuccess(found);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 w-full max-w-7xl mx-auto">
      {/* ── Header ──────────────────────────────── */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <HardDrive className="h-6 w-6 text-purple-600" />
          Storage System
        </h1>
        <p className="text-gray-500 text-sm">
          Store and retrieve advertisements efficiently using Hashing Data Structure
        </p>
      </div>

      {/* ── Top Statistics Cards ────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Total Advertisements", value: servers.reduce((acc, s) => acc + s.ads.length, 0), icon: FileImage, color: "text-purple-600", bg: "bg-purple-50" },
          { title: "Cache Servers", value: servers.length, icon: ServerIcon, color: "text-purple-600", bg: "bg-purple-50" },
          { title: "Storage Usage", value: "76%", icon: PieChart, color: "text-emerald-600", bg: "bg-emerald-50" },
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

      {/* ── Main Section: Hashing Visualization ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* LEFT: Advertisement Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="border-b border-gray-100 bg-gray-50/50 p-4">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <FileImage className="h-5 w-5 text-gray-500" />
              Advertisement Input
            </h2>
          </div>
          <div className="p-5 flex flex-col gap-4 flex-1 justify-center">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                  Advertisement Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileImage className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    value={adName}
                    onChange={(e) => setAdName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow bg-white appearance-none"
                    disabled={isProcessing}
                  >
                    {ADVERTISERS.map(adv => (
                      <option key={adv} value={adv}>{adv}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                  Category
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow bg-white"
                    disabled={isProcessing}
                  >
                    <option value="Sports">Sports</option>
                    <option value="Technology">Technology</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Gaming">Gaming</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={handleStore}
                disabled={isProcessing || !adName.trim()}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white shadow-sm transition-all duration-300
                  ${isProcessing || !adName.trim() ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 hover:-translate-y-0.5 hover:shadow-md"}
                `}
              >
                <Database className="h-4 w-4" />
                Store Advertisement
              </button>

              <button
                onClick={handleDelete}
                disabled={isProcessing || !adName.trim()}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 border
                  ${isProcessing || !adName.trim() ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed" : "bg-white text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 hover:-translate-y-0.5 hover:shadow-sm"}
                `}
              >
                <Trash2 className="h-4 w-4" />
                Delete Advertisement
              </button>
            </div>
          </div>
        </motion.div>

        {/* CENTER: Hash Function Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          <div className="flex flex-col items-center w-full relative z-10 gap-2">
            {/* Input Ad Indicator */}
            <div className={`px-5 py-2.5 rounded-xl text-sm font-bold border shadow-sm transition-all duration-300 max-w-[200px] truncate text-center ${processingStep >= 1 ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-gray-50 text-gray-400 border-gray-100"}`}>
              {processingStep >= 1 ? adName : "Awaiting Input..."}
            </div>

            {/* Arrow Down */}
            <motion.div
              animate={processingStep === 1 ? { y: [0, 4, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
              className={`flex flex-col items-center justify-center ${processingStep >= 1 ? "text-purple-500" : "text-gray-300"}`}
            >
              <div className={`w-px h-6 ${processingStep >= 1 ? "bg-linear-to-b from-purple-200 to-purple-500" : "bg-gray-200"}`} />
              <ArrowDown className="h-4 w-4 -mt-1" strokeWidth={3} />
            </motion.div>

            {/* Hash Function Box */}
            <div className="flex flex-col items-center">
              <div className={`relative flex items-center justify-center w-32 h-16 rounded-2xl border-2 shadow-sm transition-all duration-500 z-10
                ${processingStep === 1 ? "bg-purple-600 border-purple-700 shadow-purple-500/30 scale-105" : processingStep === 2 ? "bg-gray-800 border-gray-900 shadow-lg" : "bg-white border-gray-200"}
              `}>
                {processingStep === 1 ? (
                  <Hash className="h-8 w-8 text-white animate-spin-slow" />
                ) : (
                  <Cpu className={`h-8 w-8 ${processingStep === 2 ? "text-purple-400" : "text-gray-400"}`} />
                )}
              </div>

              {/* Formula output removed as requested */}
            </div>

            {/* Arrow Down */}
            <motion.div
              animate={processingStep === 2 ? { y: [0, 4, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
              className={`flex flex-col items-center justify-center ${processingStep === 2 ? "text-purple-500" : "text-gray-300"} ${processingStep >= 1 ? "-mt-1" : "mt-2"}`}
            >
              <div className={`w-px h-6 ${processingStep === 2 ? "bg-linear-to-b from-purple-500 to-pink-500" : "bg-gray-200"}`} />
              <ArrowDown className="h-4 w-4 -mt-1" strokeWidth={3} />
            </motion.div>

            {/* Server Selection Output */}
            <div className={`px-5 py-2.5 rounded-xl text-sm font-bold border shadow-sm transition-all duration-300
              ${processingStep === 2 && assignedServer ? `${assignedServer.bg} ${assignedServer.color} ${assignedServer.border}` : "bg-gray-50 text-gray-400 border-gray-100"}
            `}>
              {processingStep === 2 && assignedServer ? `${lastAction === 'store' ? 'Assign to' : 'Search in'} ${assignedServer.name}` : "Server Selection"}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Result Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden"
        >
          <div className="border-b border-gray-100 bg-gray-50/50 p-4">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              {lastAction === "store" || actionSuccess ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              {lastAction === "store" ? "Storage Result" : "Deletion Result"}
            </h2>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              {processingStep === 2 && assignedServer ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col h-full justify-center text-center"
                >
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 border-4 ${assignedServer.bg} ${assignedServer.color} ${assignedServer.border}`}>
                    <ServerIcon className="h-8 w-8" />
                  </div>
                  
                  <span className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">
                    {lastAction === 'store' ? "Assigned Server" : "Targeted Server"}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {assignedServer.name}
                  </h3>

                  <div className={`border rounded-lg p-3 flex items-center justify-center gap-2 font-medium ${
                      lastAction === 'store'
                        ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                        : actionSuccess
                          ? "bg-blue-50 border-blue-100 text-blue-700"
                          : "bg-red-50 border-red-100 text-red-700"
                  }`}>
                    {lastAction === 'store' ? (
                      <><CheckCircle2 className="h-5 w-5" /> Successfully Stored</>
                    ) : actionSuccess ? (
                      <><CheckCircle2 className="h-5 w-5" /> Successfully Deleted</>
                    ) : (
                      <><XCircle className="h-5 w-5" /> Not Found in Server</>
                    )}
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
                  <Database className="h-12 w-12 text-gray-300 mb-3" strokeWidth={1} />
                  <p className="text-sm text-gray-500">
                    Submit an advertisement to view<br/>storage assignment results.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Section: Cache Server Cards ──── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-2"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <ServerIcon className="h-5 w-5 text-gray-500" />
            Active Cache Servers
          </h2>
          <button
            onClick={addServer}
            disabled={servers.length >= 6}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300
              ${servers.length >= 6 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"}
            `}
          >
            <Database className="h-4 w-4" />
            Add Server
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servers.map((server) => {
            const isTarget = processingStep === 2 && assignedServer?.id === server.id;
            
            return (
              <motion.div
                key={server.id}
                animate={isTarget ? { y: -5, scale: 1.02 } : { y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden flex flex-col transition-colors duration-300
                  ${isTarget ? server.border : "border-gray-100"}
                `}
              >
                {/* Server Header */}
                <div className={`p-4 border-b flex justify-between items-center ${isTarget ? server.bg : "bg-gray-50/50"} ${isTarget ? server.border : "border-gray-100"}`}>
                  <div className="flex items-center gap-2">
                    <ServerIcon className={`h-5 w-5 ${isTarget ? server.color.split(" ")[0] : "text-gray-500"}`} />
                    <h3 className={`font-bold ${isTarget ? server.color.split(" ")[0] : "text-gray-800"}`}>{server.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${isTarget ? "bg-white text-gray-800 shadow-sm" : "bg-gray-200 text-gray-600"}`}>
                      ID: {server.id}
                    </span>
                    <button 
                      onClick={() => removeServer(server.id)}
                      disabled={servers.length <= 1}
                      className={`p-1 rounded-md transition-colors ${servers.length <= 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-red-100 hover:text-red-600 text-gray-400"}`}
                      title="Remove Server"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Storage Progress */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Storage Capacity</span>
                    <span className="text-sm font-bold text-gray-900">{server.storage}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: `${server.storage - 2}%` }}
                      animate={{ width: `${server.storage}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full rounded-full ${server.fill}`}
                    />
                  </div>
                </div>

                {/* Stored Ads List */}
                <div className="p-5 flex-1 bg-gray-50/30">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Stored Advertisements ({server.ads.length})
                  </h4>
                  <ul className="space-y-2">
                    <AnimatePresence>
                      {server.ads.map((ad, idx) => (
                        <motion.li
                          key={`${ad}-${idx}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className={`text-sm py-1.5 px-3 rounded border flex items-center justify-between gap-2 group
                            ${isTarget && idx === server.ads.length - 1 ? `${server.bg} ${server.border} ${server.color}` : "bg-white border-gray-200 text-gray-700"}
                          `}
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <FileImage className="h-3.5 w-3.5 shrink-0 opacity-70" />
                            <span className="truncate">{ad}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteFromCache(ad);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 -mr-1 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            title="Remove Advertisement"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

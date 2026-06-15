import { useState, useMemo } from "react";
import { useAuction } from "../context/AuctionContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Route,
  Server,
  Monitor,
  Database,
  Activity,
  CheckCircle2,
  Zap,
  Clock,
  ArrowRight,
  MapPin
} from "lucide-react";


export default function DeliveryRoutes() {
  const { adjacencyList } = useAuction();

  const { NODES, EDGES, NODE_LAYOUT, targetNodes, totalNodes, totalLatency } = useMemo(() => {
    const nodes = {};
    const edges = [];
    const layout = {};
    const targets = [];
    let latencySum = 0;

    nodes["AdServer"] = { id: "AdServer", label: "Ad Server", type: "Server", icon: Server, color: "text-purple-600", bg: "bg-purple-100", border: "border-purple-300" };
    layout["AdServer"] = { x: 50, y: 15 };

    const getLatency = (src, tgt) => {
      let hash = 0;
      const str = src + tgt;
      for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
      return 5 + Math.abs(hash % 45);
    };

    const l1 = adjacencyList["AdServer"] || [];
    const l2Set = new Set();
    
    const l1Spacing = 100 / (l1.length + 1);
    l1.forEach((website, index) => {
      nodes[website] = { id: website, label: website, type: "Website", icon: Database, color: "text-purple-600", bg: "bg-purple-100", border: "border-purple-300" };
      layout[website] = { x: l1Spacing * (index + 1), y: 50 };
      const lat = getLatency("AdServer", website);
      latencySum += lat;
      edges.push({ id: `E_AdServer_${website}`, source: "AdServer", target: website, latency: lat });
      
      const children = adjacencyList[website] || [];
      children.forEach(child => {
        if (child !== "AdServer") {
          l2Set.add(child);
          const clat = getLatency(website, child);
          latencySum += clat;
          edges.push({ id: `E_${website}_${child}`, source: website, target: child, latency: clat });
        }
      });
    });

    const l2 = Array.from(l2Set);
    const l2Spacing = 100 / (l2.length + 1);
    l2.forEach((campaign, index) => {
      nodes[campaign] = { id: campaign, label: campaign, type: "Campaign", icon: Monitor, color: "text-emerald-600", bg: "bg-emerald-100", border: "border-emerald-300" };
      layout[campaign] = { x: l2Spacing * (index + 1), y: 85 };
      targets.push(campaign);
    });

    return { NODES: nodes, EDGES: edges, NODE_LAYOUT: layout, targetNodes: targets, totalNodes: Object.keys(nodes).length, totalLatency: Math.floor(latencySum / (edges.length || 1)) };
  }, [adjacencyList]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);
  const [shortestPath, setShortestPath] = useState([]);
  const [pathEdges, setPathEdges] = useState([]);
  const [routeStats, setRouteStats] = useState({ latency: 0, saved: 0 });

  const findFastestRoute = () => {
    setIsOptimizing(true);
    setIsOptimized(false);
    setShortestPath([]);
    setPathEdges([]);

    setTimeout(() => {
      const targetId = targetNodes[Math.floor(Math.random() * targetNodes.length)] || "User";
      const distances = {};
      const previous = {};
      const unvisited = new Set(Object.keys(NODES));

      Object.keys(NODES).forEach(node => {
        distances[node] = Infinity;
        previous[node] = null;
      });
      distances["AdServer"] = 0;

      while (unvisited.size > 0) {
        let current = null;
        let minDistance = Infinity;
        unvisited.forEach(node => {
          if (distances[node] < minDistance) {
            minDistance = distances[node];
            current = node;
          }
        });

        if (current === null || current === targetId) break;
        unvisited.delete(current);

        EDGES.filter(e => e.source === current).forEach(edge => {
          if (unvisited.has(edge.target)) {
            const alt = distances[current] + edge.latency;
            if (alt < distances[edge.target]) {
              distances[edge.target] = alt;
              previous[edge.target] = current;
            }
          }
        });
      }

      const path = [];
      const pEdges = [];
      let curr = targetId;
      while (curr) {
        path.unshift(curr);
        const prev = previous[curr];
        if (prev) {
          const edge = EDGES.find(e => e.source === prev && e.target === curr);
          if (edge) pEdges.unshift(edge.id);
        }
        curr = prev;
      }

      setShortestPath(path);
      setPathEdges(pEdges);
      setRouteStats({ latency: distances[targetId], saved: 15 + Math.floor(Math.random() * 20) });
      setIsOptimizing(false);
      setIsOptimized(true);
    }, 1500);
  };

  const resetRoute = () => {
    setIsOptimized(false);
    setShortestPath([]);
    setPathEdges([]);
  };

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 w-full max-w-7xl mx-auto">
      {/* ── Header ──────────────────────────────── */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Route className="h-6 w-6 text-purple-600" />
          Delivery Routes
        </h1>
        <p className="text-gray-500 text-sm">
          Find fastest advertisement delivery path using Dijkstra Algorithm
        </p>
      </div>

      {/* ── Top Statistics Cards ────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Active Nodes", value: totalNodes, icon: Server, color: "text-purple-600", bg: "bg-purple-50" },
          { title: "Average Latency", value: `${totalLatency}ms`, icon: Activity, color: "text-purple-600", bg: "bg-purple-50" },
          { title: "Total Connections", value: EDGES.length, icon: Route, color: "text-emerald-600", bg: "bg-emerald-50" },
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

      {/* ── Main Section: Visualization & Details ─ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* Network Route Visualization */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative min-h-[450px]">
          <div className="border-b border-gray-100 bg-gray-50/50 p-4 px-6 flex justify-between items-center z-10 relative">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-500" />
              Network Route Map
            </h2>
            
            {/* Feature Button */}
            {!isOptimized ? (
              <button
                onClick={findFastestRoute}
                disabled={isOptimizing}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-sm transition-all duration-300
                  ${isOptimizing ? "bg-purple-400 scale-95" : "bg-purple-600 hover:bg-purple-700 hover:shadow hover:-translate-y-0.5"}
                `}
              >
                {isOptimizing ? (
                  <>
                    <Activity className="h-4 w-4 animate-pulse" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Find Fastest Route
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={resetRoute}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                Reset Map
              </button>
            )}
          </div>
          
          <div className="flex-1 relative w-full h-full bg-gray-50/30 p-6 overflow-hidden">
            {/* SVG Edges Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {EDGES.map(edge => {
                const sourcePos = NODE_LAYOUT[edge.source];
                const targetPos = NODE_LAYOUT[edge.target];
                const isPath = pathEdges.includes(edge.id);
                
                // Calculate midpoint for the latency label
                const midX = (sourcePos.x + targetPos.x) / 2;
                const midY = (sourcePos.y + targetPos.y) / 2;

                return (
                  <g key={edge.id}>
                    <line
                      x1={`${sourcePos.x}%`}
                      y1={`${sourcePos.y}%`}
                      x2={`${targetPos.x}%`}
                      y2={`${targetPos.y}%`}
                      stroke={isPath ? "#3b82f6" : "#cbd5e1"}
                      strokeWidth={isPath ? 4 : 2}
                      strokeDasharray={isPath ? "none" : "5,5"}
                      className="transition-colors duration-500"
                    />
                    
                    {/* Animate dot along the path if optimized */}
                    {isPath && isOptimized && (
                      <circle r="4" fill="#3b82f6">
                        <animateMotion
                          dur="1s"
                          repeatCount="indefinite"
                          path={`M ${sourcePos.x} ${sourcePos.y} L ${targetPos.x} ${targetPos.y}`}
                          // Note: standard SVG animateMotion requires absolute pixel coordinates or proper viewBox.
                          // To make this robust with percentages, we might just rely on Framer Motion below or keep it simple.
                        />
                      </circle>
                    )}

                    {/* Edge Label (Latency) */}
                    <rect
                      x={`${midX}%`}
                      y={`${midY}%`}
                      width="44"
                      height="22"
                      rx="11"
                      fill={isPath ? "#eff6ff" : "white"}
                      stroke={isPath ? "#bfdbfe" : "#e2e8f0"}
                      className="transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-500"
                    />
                    <text
                      x={`${midX}%`}
                      y={`${midY}%`}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`text-[11px] font-bold ${isPath ? "fill-blue-700" : "fill-gray-500"}`}
                      dy="1"
                    >
                      {edge.latency}ms
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* DOM Nodes */}
            {Object.values(NODES).map(node => {
              const pos = NODE_LAYOUT[node.id];
              const Icon = node.icon;
              const isPathNode = shortestPath.includes(node.id);
              
              return (
                <div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <motion.div
                    animate={isPathNode ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 rounded-full border-4 flex items-center justify-center shadow-md transition-all duration-300
                      ${isPathNode ? "border-purple-500 ring-4 ring-purple-100 bg-white" : `${node.bg} ${node.border}`}
                    `}
                  >
                    <Icon className={`h-6 w-6 ${isPathNode ? "text-purple-600" : node.color.split(" ")[0]}`} />
                  </motion.div>
                  <div className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm border transition-colors
                    ${isPathNode ? "bg-purple-600 text-white border-purple-700" : "bg-white text-gray-700 border-gray-200"}
                  `}>
                    {node.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Route Details */}
        <div className="flex flex-col gap-6">
          {/* Result Card */}
          <AnimatePresence mode="wait">
            {isOptimized ? (
              <motion.div
                key="optimized"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-purple-100" />
                  <h2 className="text-lg font-bold">Fastest Route Found</h2>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20 mb-4">
                  <span className="text-purple-100 text-sm font-medium block mb-1">Total Latency</span>
                  <span className="text-3xl font-bold">{routeStats.latency}ms</span>
                </div>
                
                <div className="flex justify-between items-center bg-blue-700/30 px-4 py-3 rounded-lg border border-blue-400/30">
                  <span className="text-sm text-purple-100">Delivery Status</span>
                  <span className="text-sm font-bold tracking-wide uppercase text-white">Optimized</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center text-center min-h-[220px]"
              >
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-4 border border-purple-100">
                  <Route className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Dijkstra Optimizer</h3>
                <p className="text-sm text-gray-500 max-w-[200px]">
                  Click the button to calculate the shortest path to the user.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Route Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden flex-1"
          >
            <div className="border-b border-gray-100 bg-gray-50/50 p-4">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                Route Details
              </h2>
            </div>
            <div className="p-5 flex flex-col gap-4">
              
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-2">Selected Path</span>
                  <div className="flex items-center flex-wrap gap-2 text-sm font-semibold text-gray-800">
                    {isOptimized ? (
                      <>
                        {shortestPath.map((nodeId, idx) => (
      <span key={nodeId} className="flex items-center gap-2">
        <span className="bg-gray-100 px-2 py-1 rounded">{NODES[nodeId].label}</span>
        {idx < shortestPath.length - 1 && <ArrowRight className="h-4 w-4 text-purple-500" />}
      </span>
    ))}
                      </>
                    ) : (
                      <span className="text-gray-400 italic font-normal">Pending optimization...</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-3">
                  <span className="text-gray-500">Number of Nodes</span>
                  <span className="font-bold text-gray-900">{isOptimized ? shortestPath.length : "-"}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Distance</span>
                  <span className="font-bold text-gray-900">{isOptimized ? "{routeStats.latency}ms" : "-"}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Time Saved</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {isOptimized ? "{routeStats.saved}ms" : "-"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

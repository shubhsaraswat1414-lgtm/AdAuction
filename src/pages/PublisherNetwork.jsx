import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAuction } from "../context/AuctionContext";
import {
  Network,
  Share2,
  Globe,
  MonitorSmartphone,
  Info,
  Link as LinkIcon,
  Plus,
  Minus,
  CheckCircle2,
  Cpu
} from "lucide-react";

// Initial Graph Data
const NODES = {
  AdServer: { id: "AdServer", label: "Ad Server", type: "Server", traffic: "15.6M", revenue: "₹12.5M", icon: Cpu, color: "bg-purple-100 text-purple-600 border-purple-300" },
  TechNews: { id: "TechNews", label: "TechNews.com", type: "Publisher", category: "Technology", traffic: "5.8M", revenue: "₹2.4M", icon: Globe, color: "bg-purple-100 text-purple-600 border-purple-300" },
  SportsWorld: { id: "SportsWorld", label: "SportsWorld.com", type: "Publisher", category: "Sports", traffic: "4.2M", revenue: "₹1.8M", icon: Globe, color: "bg-purple-100 text-purple-600 border-purple-300" },
  GameZone: { id: "GameZone", label: "GameZone.com", type: "Publisher", category: "Gaming", traffic: "3.5M", revenue: "₹1.2M", icon: Globe, color: "bg-purple-100 text-purple-600 border-purple-300" },
  FashionHub: { id: "FashionHub", label: "FashionHub.com", type: "Publisher", category: "Fashion", traffic: "2.1M", revenue: "₹800K", icon: Globe, color: "bg-purple-100 text-purple-600 border-purple-300" },
  NikeCampaign: { id: "NikeCampaign", label: "Nike Campaign", type: "Advertiser", traffic: "N/A", revenue: "₹500K", icon: MonitorSmartphone, color: "bg-emerald-100 text-emerald-600 border-emerald-300" },
  AppleCampaign: { id: "AppleCampaign", label: "Apple Campaign", type: "Advertiser", traffic: "N/A", revenue: "₹900K", icon: MonitorSmartphone, color: "bg-emerald-100 text-emerald-600 border-emerald-300" },
  GamingCampaign: { id: "GamingCampaign", label: "Gaming Campaign", type: "Advertiser", traffic: "N/A", revenue: "₹750K", icon: MonitorSmartphone, color: "bg-emerald-100 text-emerald-600 border-emerald-300" }
};

const NODE_LAYOUT = {
  AdServer: { x: 50, y: 50 },
  TechNews: { x: 25, y: 35 },
  SportsWorld: { x: 75, y: 35 },
  GameZone: { x: 75, y: 65 },
  FashionHub: { x: 25, y: 65 },
  NikeCampaign: { x: 90, y: 15 },
  AppleCampaign: { x: 10, y: 15 },
  GamingCampaign: { x: 90, y: 85 }
};

export default function PublisherNetwork() {
  const { adjacencyList, setAdjacencyList } = useAuction();
  const [selectedNode, setSelectedNode] = useState("AdServer");
  
  // Graph Ops State
  const [sourceNode, setSourceNode] = useState("FashionHub");
  const [targetNode, setTargetNode] = useState("NikeCampaign");

  // Get unique edges for rendering SVG lines (undirected visualization)
  const edges = useMemo(() => {
    const uniqueEdges = [];
    const seen = new Set();
    Object.entries(adjacencyList).forEach(([source, targets]) => {
      targets.forEach(target => {
        const edgeId = [source, target].sort().join("-");
        if (!seen.has(edgeId)) {
          seen.add(edgeId);
          uniqueEdges.push({ id: edgeId, source, target });
        }
      });
    });
    return uniqueEdges;
  }, [adjacencyList]);

  const handleAddConnection = () => {
    if (sourceNode === targetNode) return;
    setAdjacencyList(prev => {
      const newList = { ...prev };
      if (!newList[sourceNode].includes(targetNode)) newList[sourceNode] = [...newList[sourceNode], targetNode];
      if (!newList[targetNode].includes(sourceNode)) newList[targetNode] = [...newList[targetNode], sourceNode];
      return newList;
    });
  };

  const handleRemoveConnection = () => {
    setAdjacencyList(prev => {
      const newList = { ...prev };
      newList[sourceNode] = newList[sourceNode].filter(n => n !== targetNode);
      newList[targetNode] = newList[targetNode].filter(n => n !== sourceNode);
      return newList;
    });
  };

  const selectedNodeDetails = NODES[selectedNode];
  const selectedNodeConnections = adjacencyList[selectedNode].length;

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 w-full max-w-7xl mx-auto">
      {/* ── Header ──────────────────────────────── */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Network className="h-6 w-6 text-purple-600" />
          Publisher Network
        </h1>
        <p className="text-gray-500 text-sm">
          Visualize advertising relationships using Graph Data Structure
        </p>
      </div>

      {/* ── Top Statistics Cards ────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Total Publishers", value: "120", icon: Globe, color: "text-purple-600", bg: "bg-purple-50" },
          { title: "Total Connections", value: "580", icon: Share2, color: "text-purple-600", bg: "bg-purple-50" },
          { title: "Active Networks", value: "45", icon: Network, color: "text-emerald-600", bg: "bg-emerald-50" },
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

      {/* ── Main Section: Graph Visualization ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* Graph Canvas */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative min-h-[450px]">
          <div className="border-b border-gray-100 bg-gray-50/50 p-4 px-6 flex justify-between items-center z-10 relative">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <Share2 className="h-5 w-5 text-gray-500" />
              Network Graph (Adjacency List)
            </h2>
          </div>
          
          <div className="flex-1 relative w-full h-full bg-gray-50/30 overflow-hidden p-6">
            {/* SVG Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {edges.map(edge => {
                const isSelected = selectedNode === edge.source || selectedNode === edge.target;
                return (
                  <motion.line
                    key={edge.id}
                    x1={`${NODE_LAYOUT[edge.source].x}%`}
                    y1={`${NODE_LAYOUT[edge.source].y}%`}
                    x2={`${NODE_LAYOUT[edge.target].x}%`}
                    y2={`${NODE_LAYOUT[edge.target].y}%`}
                    stroke={isSelected ? "#3b82f6" : "#e5e7eb"}
                    strokeWidth={isSelected ? 3 : 2}
                    className="transition-colors duration-300"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}
            </svg>

            {/* DOM Nodes */}
            {Object.values(NODES).map(node => {
              const isSelected = selectedNode === node.id;
              const pos = NODE_LAYOUT[node.id];
              const Icon = node.icon;
              
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 rounded-full border-4 flex items-center justify-center shadow-md transition-all duration-300 z-10
                      ${isSelected ? "border-purple-500 ring-4 ring-purple-100" : node.color}
                      bg-white
                    `}
                  >
                    <Icon className={`h-6 w-6 ${isSelected ? "text-purple-600" : ""}`} />
                  </motion.div>
                  <div className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm border transition-colors
                    ${isSelected ? "bg-purple-600 text-white border-purple-700" : "bg-white text-gray-700 border-gray-200 group-hover:border-gray-300"}
                  `}>
                    {node.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: Node Details & Ops */}
        <div className="flex flex-col gap-6">
          {/* Node Details */}
          <motion.div
            key={selectedNode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden"
          >
            <div className="border-b border-gray-100 bg-gray-50/50 p-4">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                <Info className="h-5 w-5 text-purple-500" />
                Node Details
              </h2>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gray-50 border ${selectedNodeDetails.color}`}>
                  <selectedNodeDetails.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{selectedNodeDetails.label}</h3>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{selectedNodeDetails.type}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Traffic</span>
                  <span className="font-medium text-gray-900">{selectedNodeDetails.traffic}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Connections</span>
                  <span className="font-semibold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
                    {selectedNodeConnections} edges
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Revenue Generated</span>
                  <span className="font-medium text-emerald-600">{selectedNodeDetails.revenue}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Graph Operations */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50/50 p-4">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-gray-500" />
                Graph Operations
              </h2>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex gap-2">
                <select
                  value={sourceNode}
                  onChange={e => setSourceNode(e.target.value)}
                  className="w-1/2 p-2 rounded-lg border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {Object.values(NODES).map(n => (
                    <option key={n.id} value={n.id}>{n.label}</option>
                  ))}
                </select>
                <select
                  value={targetNode}
                  onChange={e => setTargetNode(e.target.value)}
                  className="w-1/2 p-2 rounded-lg border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {Object.values(NODES).map(n => (
                    <option key={n.id} value={n.id}>{n.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddConnection}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-colors text-sm shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Edge
                </button>
                <button
                  onClick={handleRemoveConnection}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition-colors text-sm"
                >
                  <Minus className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Section: Publisher Table ───────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mt-2"
      >
        <div className="border-b border-gray-100 bg-gray-50/50 p-4 px-6">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <Globe className="h-5 w-5 text-gray-500" />
            Publisher Directory
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/30 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium">Publisher Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Traffic</th>
                <th className="px-6 py-4 font-medium">Connections</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Object.values(NODES).filter(n => n.type === "Publisher").map((pub) => (
                <tr key={pub.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-purple-500" />
                    {pub.label}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {pub.category}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {pub.traffic}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-100 text-gray-700 font-medium text-xs">
                      <Share2 className="h-3 w-3" />
                      {adjacencyList[pub.id].length}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-medium text-xs">
                      <CheckCircle2 className="h-4 w-4" />
                      Active
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

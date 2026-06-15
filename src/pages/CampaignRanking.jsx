import { useState } from 'react';
import { Trophy, ArrowUpRight, Award, TrendingUp, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from "../hooks/useToast";

// Mock data
const campaigns = [
  { id: 1, name: "Summer Mega Sale", advertiser: "Nike India", score: 98.5, roi: "+24.5%", spend: "₹4.2L", rank: 1, trend: 'up' },
  { id: 2, name: "Tech Weekly Promos", advertiser: "Amazon", score: 95.2, roi: "+18.2%", spend: "₹8.5L", rank: 2, trend: 'up' },
  { id: 3, name: "New Year Gadgets", advertiser: "Samsung", score: 91.8, roi: "+12.4%", spend: "₹3.1L", rank: 3, trend: 'down' },
  { id: 4, name: "Fashion Fest 2024", advertiser: "Myntra", score: 88.4, roi: "+8.9%", spend: "₹2.8L", rank: 4, trend: 'up' },
  { id: 5, name: "Grocery Delivery", advertiser: "Swiggy Instamart", score: 85.1, roi: "+5.2%", spend: "₹1.5L", rank: 5, trend: 'down' },
];

const SortIcon = ({ field, sortField, sortDir }) => {
  if (sortField !== field) return <ChevronDown className="h-3 w-3 text-gray-300 opacity-0 group-hover:opacity-100" />;
  return sortDir === 'asc' ? <ChevronUp className="h-3 w-3 text-purple-500" /> : <ChevronDown className="h-3 w-3 text-purple-500" />;
};

export default function CampaignRanking() {
  const [sortField, setSortField] = useState('score');
  const [sortDir, setSortDir] = useState('desc');
  const toast = useToast();

  // Basic sorting logic
  const sortedCampaigns = [...campaigns].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    
    // Convert string currencies/percentages to numbers for sorting
    if (typeof valA === 'string') valA = Number(valA.replace(/[^0-9.-]+/g, ""));
    if (typeof valB === 'string') valB = Number(valB.replace(/[^0-9.-]+/g, ""));

    if (valA < valB) return sortDir === 'asc' ? -1 : 1;
    if (valA > valB) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
            Campaign Ranking
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Top performing ad campaigns ranked by overall score using Priority Queue (Max Heap)
          </p>
        </div>
        <button 
          onClick={() => toast({ title: "Ranking Logic", message: "Campaigns are ranked using a Max Heap data structure based on their overall score.", type: "info" })}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 text-xs sm:text-sm font-medium text-gray-700 transition-colors self-start sm:self-auto"
        >
          <HelpCircle className="h-4 w-4 text-purple-500" />
          How it's ranked
        </button>
      </div>

      {/* Top 3 Podium (Optional extra feature, just placeholders for now) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {[campaigns[1], campaigns[0], campaigns[2]].map((camp, idx) => (
          <div key={camp.id} className={`bg-white rounded-xl border p-4 sm:p-5 flex flex-col items-center text-center shadow-sm relative overflow-hidden transition-transform hover:-translate-y-1 duration-300 ${idx === 1 ? 'border-yellow-200 shadow-yellow-100 ring-1 ring-yellow-50 md:-mt-4 md:mb-4' : 'border-gray-100'}`}>
            {idx === 1 && <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-yellow-400 to-yellow-500" />}
            <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center mb-3 ${idx === 1 ? 'bg-yellow-100 text-yellow-600' : idx === 0 ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-600'}`}>
              <Award className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">{camp.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{camp.advertiser}</p>
            <div className="mt-3 sm:mt-4 text-xl sm:text-2xl font-black text-gray-900">{camp.score}</div>
            <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Score</div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-sm font-bold text-gray-900">Full Leaderboard</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 w-16">Rank</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 cursor-pointer group" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">Campaign <SortIcon field="name" sortField={sortField} sortDir={sortDir} /></div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 cursor-pointer group" onClick={() => handleSort('score')}>
                  <div className="flex items-center gap-1">Score <SortIcon field="score" sortField={sortField} sortDir={sortDir} /></div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 cursor-pointer group" onClick={() => handleSort('roi')}>
                  <div className="flex items-center gap-1">ROI <SortIcon field="roi" sortField={sortField} sortDir={sortDir} /></div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 cursor-pointer group" onClick={() => handleSort('spend')}>
                  <div className="flex items-center gap-1">Spend <SortIcon field="spend" sortField={sortField} sortDir={sortDir} /></div>
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sortedCampaigns.map((camp, idx) => (
                <tr key={camp.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${
                      idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                      idx === 1 ? 'bg-gray-100 text-gray-700' :
                      idx === 2 ? 'bg-orange-100 text-orange-700' :
                      'text-gray-500'
                    }`}>
                      #{idx + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{camp.name}</p>
                      <p className="text-xs text-gray-500">{camp.advertiser}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-black text-gray-900">{camp.score}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      <TrendingUp className="h-3 w-3" />
                      {camp.roi}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-medium text-gray-600">
                    {camp.spend}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button 
                      onClick={() => toast({ title: "View Details", message: `Viewing ${camp.name}`, type: "info" })}
                      className="inline-flex items-center justify-center p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

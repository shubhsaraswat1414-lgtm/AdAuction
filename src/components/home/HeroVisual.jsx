import { Sparkles, Activity, TrendingUp } from "lucide-react";

export default function HeroVisual() {
  return (
    <div className="relative w-full aspect-square max-w-[600px] flex items-center justify-center">
      {/* Soft purple background blob */}
      <div 
        className="absolute inset-0 bg-linear-to-tr from-purple-300/40 via-fuchsia-200/30 to-blue-300/40 rounded-full blur-[80px] animate-pulse" 
        style={{ animationDuration: "5s" }} 
      />
      
      {/* SVG Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full text-purple-200/60" style={{ zIndex: 0 }}>
        {/* Simple dashed lines from center (50%, 50%) to card positions */}
        <line x1="50%" y1="50%" x2="20%" y2="25%" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
        <line x1="50%" y1="50%" x2="85%" y2="25%" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
        <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
        <line x1="50%" y1="50%" x2="80%" y2="75%" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
      </svg>

      {/* Center Logo */}
      <div 
        className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-blue-600 via-purple-600 to-violet-600 shadow-2xl shadow-purple-500/40 ring-8 ring-white/50 animate-bounce" 
        style={{ animationDuration: "4s" }}
      >
        <Sparkles className="h-10 w-10 text-white" strokeWidth={2} />
      </div>

      {/* Card 1: Top Left */}
      <div 
        className="absolute top-[12%] left-[2%] sm:top-[15%] sm:left-[5%] z-20 w-[170px] sm:w-[190px] p-4 sm:p-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-xl shadow-purple-100/50 animate-bounce" 
        style={{ animationDuration: "5s", animationDelay: "0.5s" }}
      >
        <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">Campaign Performance</p>
        <p className="text-[12px] sm:text-[13px] font-medium text-gray-500">Impressions</p>
        <p className="text-[20px] sm:text-[24px] font-extrabold text-gray-900 leading-none mt-1">8.42M</p>
        <div className="flex gap-1.5 mt-3 sm:mt-4 items-end h-8 sm:h-10">
          <div className="w-1/4 bg-purple-200 rounded-t h-[40%]" />
          <div className="w-1/4 bg-purple-300 rounded-t h-[60%]" />
          <div className="w-1/4 bg-purple-400 rounded-t h-[80%]" />
          <div className="w-1/4 bg-purple-600 rounded-t h-full" />
        </div>
      </div>

      {/* Card 2: Top Right */}
      <div 
        className="absolute top-[5%] right-[0%] sm:top-[10%] sm:right-[0%] z-20 w-[170px] sm:w-[190px] p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-xl shadow-purple-100/50 animate-bounce" 
        style={{ animationDuration: "4.5s", animationDelay: "1s" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-4 w-4 text-emerald-500" />
          <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wide">Live Auction</p>
        </div>
        <p className="text-[12px] sm:text-[13px] font-medium text-gray-500">Winning Bid</p>
        <div className="flex items-end gap-2 mt-1">
          <p className="text-[20px] sm:text-[24px] font-extrabold text-gray-900 leading-none">₹245</p>
          <span className="text-[11px] sm:text-[12px] font-bold text-emerald-500 leading-tight">+18.6%</span>
        </div>
        {/* Mini Graph using SVG */}
        <div className="mt-3 sm:mt-4">
          <svg viewBox="0 0 100 30" className="w-full h-8 sm:h-10 stroke-emerald-500 fill-emerald-50/50">
            <polyline points="0,30 20,20 40,25 60,10 80,15 100,5" fill="none" strokeWidth="3" />
            <polygon points="0,30 20,20 40,25 60,10 80,15 100,5 100,30" stroke="none" />
          </svg>
        </div>
      </div>

      {/* Card 3: Bottom Left */}
      <div 
        className="absolute bottom-[15%] left-[-2%] sm:bottom-[20%] sm:left-[-5%] z-20 w-[170px] sm:w-[190px] p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-xl shadow-purple-100/50 animate-bounce" 
        style={{ animationDuration: "5.5s", animationDelay: "1.5s" }}
      >
        <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">AI Optimization</p>
        <div className="flex items-center justify-between mt-3 mb-2">
          <p className="text-[12px] sm:text-[13px] font-semibold text-purple-600">Learning...</p>
          <p className="text-[12px] sm:text-[13px] font-bold text-gray-800">73%</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div className="bg-linear-to-r from-blue-500 to-purple-500 h-full w-[73%] rounded-full relative">
             <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Card 4: Bottom Right */}
      <div 
        className="absolute bottom-[5%] right-[2%] sm:bottom-[10%] sm:right-[5%] z-20 w-[170px] sm:w-[190px] p-4 sm:p-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-xl shadow-purple-100/50 animate-bounce" 
        style={{ animationDuration: "4.2s", animationDelay: "0.8s" }}
      >
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <TrendingUp className="h-4 w-4 text-purple-600" />
          <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wide">Revenue</p>
        </div>
        <p className="text-[20px] sm:text-[24px] font-extrabold text-gray-900 leading-none mt-2">₹24,560</p>
        <p className="text-[11px] sm:text-[12px] font-bold text-emerald-500 mt-1.5">+24.5% <span className="text-gray-400 font-medium ml-1">vs last mo</span></p>
      </div>

      {/* Floating Small Elements */}
      <div 
        className="absolute top-[30%] left-[25%] h-4 w-4 rounded-full bg-blue-400/80 shadow-lg shadow-blue-400/50 animate-bounce" 
        style={{ animationDuration: "3s", animationDelay: "0.2s" }} 
      />
      <div 
        className="absolute bottom-[35%] right-[20%] h-6 w-6 rounded-full bg-purple-400/80 shadow-lg shadow-purple-400/50 animate-bounce" 
        style={{ animationDuration: "4s", animationDelay: "1.2s" }} 
      />
      <div 
        className="absolute top-[15%] left-[45%] h-3 w-3 rounded-full bg-pink-400/80 shadow-lg shadow-pink-400/50 animate-bounce" 
        style={{ animationDuration: "2.5s", animationDelay: "0.7s" }} 
      />
    </div>
  );
}

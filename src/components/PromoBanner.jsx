import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PromoBanner() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center w-full px-4 pt-4 animate-in fade-in slide-in-from-top-4 duration-700">
      <div
        onClick={() => navigate("/auth", { state: { tab: "signup" } })}
        className="group cursor-pointer flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-50/80 hover:bg-purple-100/80 backdrop-blur-sm border border-purple-200/50 transition-all duration-300 rounded-[50px] shadow-sm hover:shadow-md"
      >
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-200/50 shadow-inner">
            <Sparkles className="h-4 w-4 text-purple-600" />
          </div>
          <p className="text-[13px] sm:text-[14px] font-medium text-purple-900/90 leading-tight">
            <span className="font-bold text-purple-900">New to AdAuction?</span> Get started with up to ₹10,000 in ad credits and launch your first campaign.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[13px] sm:text-[14px] font-bold text-purple-700 whitespace-nowrap mt-2 sm:mt-0">
          Claim Now
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}

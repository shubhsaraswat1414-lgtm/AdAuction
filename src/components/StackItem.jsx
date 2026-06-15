import { MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';
import { useToast } from "../hooks/useToast";

export default function StackItem({ index, amount, change, date, time, user }) {
  const isIncrease = change > 0;
  const isDecrease = change < 0;
  const hasChange = change !== null && change !== undefined && change !== 0;
  const toast = useToast();

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-md transition-shadow duration-200 group w-full gap-3 sm:gap-4">
      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
        {/* Left: Stack position number */}
        <div className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200 text-gray-500 font-bold font-mono text-sm sm:text-base">
          {index}
        </div>

        {/* Middle: Info */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              ₹{Number(amount).toLocaleString('en-IN')}
            </span>
            {hasChange && (
              <span className="text-[11px] sm:text-xs font-medium text-gray-500 flex items-center gap-1">
                {isIncrease && <><TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-500" /> Increase</>}
                {isDecrease && <><TrendingDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-500" /> Decrease</>}
              </span>
            )}
          </div>
          <div className="text-[10px] sm:text-xs text-gray-500 flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
            <span className="font-medium text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">
              {user || 'Admin'}
            </span>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <span>{date}</span>
            <span className="text-gray-300">•</span>
            <span>{time}</span>
          </div>
        </div>
      </div>

      {/* Right: Badge & Menu */}
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto mt-1 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
        {hasChange ? (
          <div className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border ${isIncrease ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {isIncrease ? '+' : ''}₹{Number(change).toLocaleString('en-IN')}
          </div>
        ) : (
          <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border bg-gray-50 text-gray-500 border-gray-200">
            Initial
          </div>
        )}
        <button 
          onClick={() => toast({ title: "Options", message: "Item options coming soon.", type: "info" })}
          className="text-gray-400 hover:text-gray-600 p-1 sm:p-1.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

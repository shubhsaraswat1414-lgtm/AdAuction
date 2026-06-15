import { Settings2, Undo, } from 'lucide-react';

export default function StackOperations({ onPop, stack }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-blue-500" />
          Actions
        </h2>
      </div>
      
      <div className="p-5 space-y-6">
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</h3>
          
          {/* Undo Button */}
          <button
            onClick={onPop}
            disabled={stack.length <= 1}
            className="w-full flex items-center justify-between bg-orange-50 border border-orange-200 hover:bg-orange-100 hover:border-orange-300 text-orange-700 py-3 px-4 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Undo className="h-4 w-4 group-hover:-rotate-90 transition-transform" />
              Undo Last Change
            </div>
          </button>
        </div>

      </div>
    </div>
  );
}

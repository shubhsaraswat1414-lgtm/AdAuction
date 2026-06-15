import { motion, AnimatePresence } from 'framer-motion';
import { Layers } from 'lucide-react';
import StackItem from './StackItem';

export default function BudgetStack({ stack }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[400px] lg:h-[600px]">
      <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Budget History
          </h2>
          <p className="text-sm text-gray-500 mt-1">Latest updates</p>
        </div>
      </div>
      
      <div className="p-5 flex-1 overflow-y-auto bg-gray-50/30">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] top-6 bottom-6 w-0.5 bg-gray-200 rounded-full" />
          
          <div className="space-y-4 relative">
            <AnimatePresence initial={false}>
              {[...stack].reverse().map((item, index) => {
                const isTop = index === 0;
                const isBottom = index === stack.length - 1;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, x: 40 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative pl-14"
                  >
                    {/* Node indicator */}
                    <div className={`absolute left-[16px] top-4 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ring-4 ring-white z-10 ${isTop ? 'bg-blue-500 ring-blue-50' : 'bg-gray-400'}`} />
                    
                    <div className="relative w-full">
                      {isTop && (
                        <div className="absolute -top-2.5 right-4 z-20">
                          <span className="text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200 px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                            Current
                          </span>
                        </div>
                      )}
                      {isBottom && stack.length > 1 && (
                        <div className="absolute -bottom-2.5 right-4 z-20">
                          <span className="text-[10px] font-bold bg-gray-200 text-gray-600 border border-gray-300 px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                            Initial
                          </span>
                        </div>
                      )}
                      <StackItem
                        index={stack.length - index}
                        amount={item.amount}
                        change={item.diff}
                        date={item.date || (item.timestamp ? new Date(item.timestamp).toLocaleDateString() : '')}
                        time={item.time || (item.timestamp ? new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '')}
                        user={item.user || 'Admin'}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

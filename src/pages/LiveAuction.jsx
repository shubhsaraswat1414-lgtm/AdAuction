import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Plus, Play, CheckCircle2, Clock, Users, IndianRupee, Activity, Trash2, LayoutGrid } from 'lucide-react';
import { useAuction } from '../context/AuctionContext';

export default function LiveAuction() {
  const { queue, processed, totalRequests, addRandomBid, processNextBid, deleteBid } = useAuction();

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <Radio className="h-6 w-6 text-purple-600" />
          Live Auction Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Demonstrating Queue Data Structure (FIFO - First In, First Out)
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Total Requests</p>
            <p className="text-xl font-semibold text-gray-800">{totalRequests}</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Processed</p>
            <p className="text-xl font-semibold text-gray-800">{processed.length}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Pending in Queue</p>
            <p className="text-xl font-semibold text-gray-800">{queue.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Queue Container */}
        <div className="lg:col-span-2 bg-[#F8F9FA] rounded-lg border border-gray-200 p-6 flex flex-col min-h-[500px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Bid Request Queue</h2>
            <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full border border-purple-200">
              FIFO Order
            </span>
          </div>

          {queue.length > 0 && (
            <div className="text-center mb-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-200 px-3 py-1 rounded-full border border-gray-300 shadow-sm">
                Front
              </span>
            </div>
          )}

          <div className="flex-1 space-y-3 relative overflow-hidden px-1">
            <AnimatePresence mode="popLayout">
              {queue.map((bid, index) => (
                <motion.div
                  key={bid.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="bg-white p-4 rounded-md border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 shrink-0 rounded bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-mono text-gray-400">
                      #{index + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-purple-600">{bid.advertiser}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-gray-500 font-medium">
                        {bid.slotName && (
                          <span className="flex items-center gap-1 font-bold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                            <LayoutGrid className="h-3 w-3" /> {bid.slotName}
                          </span>
                        )}
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {bid.audience}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {bid.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                      <p className="text-lg font-bold text-gray-800 flex items-center justify-end">
                        <IndianRupee className="h-4 w-4 text-gray-400" />
                        {bid.amount}
                      </p>
                      <span className="inline-block sm:mt-1 text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 px-2 py-0.5 rounded border border-orange-100">
                        {bid.status}
                      </span>
                    </div>
                    <button 
                      onClick={() => deleteBid(bid.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Delete Bid"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {queue.length === 0 && (
              <div className="h-[200px] flex flex-col items-center justify-center text-gray-400">
                <Radio className="h-10 w-10 mb-3 opacity-30" />
                <p className="text-sm font-medium">Queue is empty</p>
              </div>
            )}
          </div>

          {queue.length > 0 && (
            <div className="text-center mt-4 pt-4 border-t border-dashed border-gray-300">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-200 px-3 py-1 rounded-full border border-gray-300 shadow-sm">
                Rear
              </span>
            </div>
          )}
        </div>

        {/* Right: Controls & History */}
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Operations</h2>
            <div className="space-y-3">
              <button
                onClick={processNextBid}
                disabled={queue.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-4 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Play className="h-4 w-4" />
                Process Next Bid
              </button>
              
              <button
                onClick={addRandomBid}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-purple-600 border border-gray-200 py-2.5 px-4 rounded-md text-sm font-medium transition-colors shadow-sm"
              >
                <Plus className="h-4 w-4" />
                Add New Bid
              </button>
            </div>
            <div className="mt-5 p-3 bg-purple-50 rounded border border-purple-100">
              <p className="text-xs text-purple-800 leading-relaxed">
                <strong>Enqueue:</strong> Added to Rear.<br />
                <strong>Dequeue:</strong> Removed from Front.
              </p>
            </div>
          </div>

          {/* Processed History */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[300px]">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Processed History</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {processed.length === 0 ? (
                <div className="p-6 text-center text-sm text-gray-400 h-full flex items-center justify-center">
                  No bids processed yet
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  <AnimatePresence initial={false}>
                    {processed.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, backgroundColor: '#EFF6FF', height: 0 }}
                        animate={{ opacity: 1, backgroundColor: '#FFFFFF', height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="p-4"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-800">{item.advertiser}</span>
                          <span className="text-sm font-semibold text-gray-800">₹{item.amount}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1.5">
                          <span className="text-[10px] text-gray-500 flex items-center gap-1 font-medium">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            Processed at {item.processTime}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

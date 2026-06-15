import { useState } from 'react';
import { Plus, Info } from 'lucide-react';

export default function BudgetUpdate({ onPush }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) === 0) return;

    const now = new Date();
    
    // Create new budget object as requested
    const newEntry = {
      id: Date.now().toString(),
      amount: Number(amount),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'UPDATE',
      timestamp: now.toISOString(), // useful for sorting or standardizing
    };

    if (onPush) {
      onPush(newEntry);
    }
    
    setAmount('');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Update Budget</h2>
        <p className="text-sm text-gray-500 mt-1">Add a new budget amount</p>
      </div>
      
      <div className="p-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Amount to Add/Remove (₹)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full pl-8 pr-4 py-2.5 sm:text-sm border-gray-300 rounded-lg border focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              New budget will be added to the history
            </p>
          </div>

          <button
            type="submit"
            disabled={!amount}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-blue-200"
          >
            <Plus className="h-4 w-4" />
            Update Budget
          </button>
        </form>
      </div>
    </div>
  );
}

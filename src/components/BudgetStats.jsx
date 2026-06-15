import { Wallet, Database, Calendar, PieChart, TrendingUp, TrendingDown } from "lucide-react";

export default function BudgetStats({ currentBudget = 0, initialBudget = 0, updatesCount = 0, lastUpdated = null }) {
  const formattedBudget = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(currentBudget);
  
  const budgetDiff = currentBudget - initialBudget;
  const isPositive = budgetDiff >= 0;
  const formattedDiff = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.abs(budgetDiff));

  let formattedDate = "N/A";
  let formattedTime = "";
  if (lastUpdated) {
    const d = new Date(lastUpdated);
    formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    formattedTime = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  // Calculate dummy spent amount based on current budget (68%)
  const spentAmount = Math.floor(currentBudget * 0.68);
  const formattedSpent = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(spentAmount);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Card 1: Current Budget */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Available Balance</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{formattedBudget}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors shrink-0">
            <Wallet className="h-6 w-6" />
          </div>
        </div>
        <div className={`mt-4 flex items-center text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isPositive ? <TrendingUp className="h-4 w-4 mr-1.5" /> : <TrendingDown className="h-4 w-4 mr-1.5" />}
          {isPositive ? '+' : '-'}{formattedDiff}
        </div>
      </div>

      {/* Card 2: Total Updates */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Updates</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{updatesCount}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors shrink-0">
            <Database className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-4 text-sm font-medium text-gray-500">
          All budget changes
        </div>
      </div>

      {/* Card 3: Last Updated */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Last Updated</p>
            <h3 className="text-lg font-bold text-gray-900 mt-1">{formattedDate}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-100 transition-colors shrink-0">
            <Calendar className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-2 text-sm font-medium text-gray-600">
          {formattedTime}
        </div>
      </div>

      {/* Card 4: Budget Utilization */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Budget Spent</p>
            <h3 className="text-lg font-bold text-gray-900 mt-1">68%</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors shrink-0">
            <PieChart className="h-6 w-6" />
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
          <div className="bg-emerald-500 h-2 rounded-full w-[68%] transition-all duration-1000"></div>
        </div>
        <p className="text-xs text-gray-500 text-right mt-1">{formattedSpent} spent</p>
      </div>
    </div>
  );
}

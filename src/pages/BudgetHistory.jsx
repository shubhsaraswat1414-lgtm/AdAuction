import { useAuction } from "../context/AuctionContext";
import { 
  History, 
  } from "lucide-react";
import BudgetStats from "../components/BudgetStats";
import BudgetUpdate from "../components/BudgetUpdate";
import BudgetStack from "../components/BudgetStack";
import StackOperations from "../components/StackOperations";

export default function BudgetHistory() {
  const { budgetHistory: stack, currentBudget, pushBudgetUpdate, popBudgetUpdate } = useAuction();
  
  const handlePush = (newEntry) => {
    pushBudgetUpdate(newEntry.amount, 'UPDATE');
  };

  const handlePop = () => {
    popBudgetUpdate();
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <History className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            Budget History
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track and manage advertiser budget changes
          </p>
        </div>
      </div>

      {/* Analytics Cards */}
      <BudgetStats 
        currentBudget={currentBudget}
        initialBudget={stack.length > 0 ? stack[0].amount : 0}
        updatesCount={stack.length}
        lastUpdated={stack.length > 0 ? stack[stack.length - 1].timestamp : null}
      />

      {/* Main Content: 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-start">
        
        {/* Left: Form */}
        <BudgetUpdate onPush={handlePush} />

        {/* Center: Timeline */}
        <BudgetStack stack={stack} />

        {/* Right: Operations */}
        <StackOperations onPop={handlePop} stack={stack} />

      </div>
    </div>
  );
}

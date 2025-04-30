import React from 'react';
import { Lightbulb } from 'lucide-react';
import Card from '../ui/Card';
import { Transaction } from '../../types';
import { getTipsBySpending } from '../../data/savingTips';

interface SavingTipsProps {
  transactions: Transaction[];
}

const SavingTips: React.FC<SavingTipsProps> = ({ transactions }) => {
  const getHighSpendingCategory = (): string | null => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryMap: Record<string, number> = {};
    
    expenses.forEach(expense => {
      const category = expense.category;
      categoryMap[category] = (categoryMap[category] || 0) + expense.amount;
    });
    
    if (Object.keys(categoryMap).length === 0) return null;
    
    return Object.entries(categoryMap)
      .sort(([_, a], [__, b]) => b - a)[0][0];
  };
  
  const getUserCategories = (): string[] => {
    return Array.from(
      new Set(
        transactions
          .filter(t => t.type === 'expense')
          .map(t => t.category)
      )
    );
  };
  
  const highSpendingCategory = getHighSpendingCategory();
  const userCategories = getUserCategories();
  const tips = getTipsBySpending(userCategories, highSpendingCategory);
  
  return (
    <Card title="Smart Saving Tips" className="h-full">
      {tips.length > 0 ? (
        <div className="space-y-4">
          {tips.map((tip) => (
            <div 
              key={tip.id}
              className="p-4 bg-blue-50 rounded-lg border border-blue-100 transform transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-blue-800">{tip.title}</h4>
                  <p className="mt-1 text-sm text-blue-700">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
          <Lightbulb className="h-8 w-8 text-gray-400 mb-2" />
          <p>Add some transactions to get personalized saving tips!</p>
        </div>
      )}
    </Card>
  );
};

export default SavingTips;
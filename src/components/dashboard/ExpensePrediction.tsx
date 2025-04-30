import React from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import { Transaction } from '../../types';
import { predictNextMonthExpense, getSpendingTrend } from '../../lib/expensePrediction';

interface ExpensePredictionProps {
  transactions: Transaction[];
}

const ExpensePrediction: React.FC<ExpensePredictionProps> = ({ transactions }) => {
  const predictedExpense = predictNextMonthExpense(transactions);
  const trend = getSpendingTrend(transactions);
  
  const getLastMonthExpense = (): number => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    
    return transactions
      .filter(t => 
        t.type === 'expense' && 
        new Date(t.date) >= lastMonth &&
        new Date(t.date) <= lastMonthEnd
      )
      .reduce((sum, t) => sum + t.amount, 0);
  };
  
  const lastMonthExpense = getLastMonthExpense();
  const percentageChange = lastMonthExpense > 0 
    ? ((predictedExpense - lastMonthExpense) / lastMonthExpense * 100).toFixed(1)
    : '0';
  
  const isIncreasing = parseFloat(percentageChange) > 0;
  
  return (
    <Card title="Next Month Expense Prediction" className="h-full">
      <div className="flex flex-col items-center justify-center p-4">
        <div className={`p-4 rounded-full ${
          trend === 'increasing' 
            ? 'bg-red-100' 
            : trend === 'decreasing' 
              ? 'bg-green-100' 
              : 'bg-blue-100'
        }`}>
          {trend === 'increasing' ? (
            <TrendingUp className="h-8 w-8 text-red-600" />
          ) : trend === 'decreasing' ? (
            <TrendingDown className="h-8 w-8 text-green-600" />
          ) : (
            <ArrowRight className="h-8 w-8 text-blue-600" />
          )}
        </div>
        
        <h3 className="mt-4 text-2xl font-bold text-gray-800">
          ${predictedExpense.toLocaleString()}
        </h3>
        
        <div className={`mt-2 flex items-center text-sm ${
          isIncreasing ? 'text-red-600' : 'text-green-600'
        }`}>
          {isIncreasing ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          <span>{Math.abs(parseFloat(percentageChange))}% {isIncreasing ? 'increase' : 'decrease'}</span>
        </div>
        
        <p className="mt-4 text-sm text-gray-600 text-center">
          Based on your spending patterns, we predict your expenses for next month.
        </p>
        
        {trend === 'increasing' && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100 text-sm text-red-700">
            Your spending is trending upward. Consider reviewing your budget.
          </div>
        )}
        
        {trend === 'decreasing' && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100 text-sm text-green-700">
            Great job! Your spending is trending downward.
          </div>
        )}
      </div>
    </Card>
  );
};

export default ExpensePrediction;
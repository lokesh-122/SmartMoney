import React from 'react';
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import Card from '../ui/Card';
import { Transaction } from '../../types';

interface FinancialSummaryProps {
  transactions: Transaction[];
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ transactions }) => {
  const calculateTotals = () => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const totals = {
      totalIncome: 0,
      totalExpenses: 0,
      monthlyIncome: 0,
      monthlyExpenses: 0,
    };
    
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totals.totalIncome += transaction.amount;
        
        if (new Date(transaction.date) >= firstDayOfMonth) {
          totals.monthlyIncome += transaction.amount;
        }
      } else {
        totals.totalExpenses += transaction.amount;
        
        if (new Date(transaction.date) >= firstDayOfMonth) {
          totals.monthlyExpenses += transaction.amount;
        }
      }
    });
    
    return totals;
  };
  
  const { totalIncome, totalExpenses, monthlyIncome, monthlyExpenses } = calculateTotals();
  const totalSavings = totalIncome - totalExpenses;
  const monthlySavings = monthlyIncome - monthlyExpenses;
  const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome * 100).toFixed(1) : '0';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Balance</p>
            <h3 className="mt-1 text-2xl font-semibold text-gray-900">
              ${totalSavings.toLocaleString()}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Net of all income and expenses
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Wallet className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </Card>
      
      <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Income</p>
            <h3 className="mt-1 text-2xl font-semibold text-green-600">
              ${totalIncome.toLocaleString()}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              This month: ${monthlyIncome.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </Card>
      
      <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Expenses</p>
            <h3 className="mt-1 text-2xl font-semibold text-red-600">
              ${totalExpenses.toLocaleString()}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              This month: ${monthlyExpenses.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <TrendingDown className="h-6 w-6 text-red-600" />
          </div>
        </div>
      </Card>
      
      <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Savings Rate</p>
            <h3 className="mt-1 text-2xl font-semibold text-purple-600">
              {savingsRate}%
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              This month: ${monthlySavings.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <DollarSign className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FinancialSummary;
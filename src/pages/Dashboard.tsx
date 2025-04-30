import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useTransactionStore } from '../store/transactionStore';
import FinancialSummary from '../components/dashboard/FinancialSummary';
import ExpensesPieChart from '../components/dashboard/ExpensesPieChart';
import MonthlyTrendChart from '../components/dashboard/MonthlyTrendChart';
import SavingTips from '../components/dashboard/SavingTips';
import ExpensePrediction from '../components/dashboard/ExpensePrediction';

const Dashboard: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { transactions, fetchTransactions, isLoading } = useTransactionStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    if (user) {
      fetchTransactions(user.id);
    }
  }, [fetchTransactions, user]);
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back, {user.name}!
        </p>
      </div>
      
      <FinancialSummary transactions={transactions} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ExpensesPieChart transactions={transactions} />
        <MonthlyTrendChart transactions={transactions} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SavingTips transactions={transactions} />
        <ExpensePrediction transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;
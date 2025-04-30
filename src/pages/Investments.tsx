import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useTransactionStore } from '../store/transactionStore';
import InvestmentRecommendations from '../components/investments/InvestmentRecommendations';
import Card from '../components/ui/Card';
import { getInvestmentRecommendations } from '../data/investmentOptions';

const Investments: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { transactions, fetchTransactions } = useTransactionStore();
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
  
  const calculateInvestableAmount = () => {
    if (!user) return 0;
    
    // Calculate monthly income and expenses
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const monthlyIncome = transactions
      .filter(
        t => t.type === 'income' && new Date(t.date) >= firstDayOfMonth
      )
      .reduce((sum, t) => sum + t.amount, 0);
    
    const monthlyExpenses = transactions
      .filter(
        t => t.type === 'expense' && new Date(t.date) >= firstDayOfMonth
      )
      .reduce((sum, t) => sum + t.amount, 0);
    
    const monthlySavings = monthlyIncome - monthlyExpenses;
    
    // Consider user's income and savings goal
    const estimatedDisposableIncome = Math.max(0, monthlySavings - (user.savingsGoal * 0.1));
    
    return Math.round(estimatedDisposableIncome);
  };
  
  const investableAmount = calculateInvestableAmount();
  
  const recommendations = user
    ? getInvestmentRecommendations(investableAmount, user.riskAppetite)
    : [];
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Investment Recommendations</h1>
      </div>
      
      <Card>
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Your Investment Profile
          </h3>
          <div className="mt-5 border-t border-gray-200 pt-5">
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Risk Appetite</dt>
                <dd className="mt-1 text-sm text-gray-900 capitalize">{user.riskAppetite}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Monthly Income</dt>
                <dd className="mt-1 text-sm text-gray-900">${user.income.toLocaleString()}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Investable Amount</dt>
                <dd className="mt-1 text-sm text-gray-900">${investableAmount.toLocaleString()}</dd>
              </div>
            </dl>
          </div>
          <div className="mt-5">
            <button
              onClick={() => navigate('/profile')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Profile
            </button>
          </div>
        </div>
      </Card>
      
      <InvestmentRecommendations recommendations={recommendations} />
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              All investments involve risk and may lose value. The information provided is for educational purposes only and should not be considered financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;
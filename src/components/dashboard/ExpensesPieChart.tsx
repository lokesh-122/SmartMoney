import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Card from '../ui/Card';
import { Transaction, SpendingByCategory, TransactionCategory } from '../../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpensesPieChartProps {
  transactions: Transaction[];
}

const ExpensesPieChart: React.FC<ExpensesPieChartProps> = ({ transactions }) => {
  const categoryColors: Record<string, string> = {
    housing: 'rgba(255, 99, 132, 0.8)',
    food: 'rgba(54, 162, 235, 0.8)',
    transportation: 'rgba(255, 206, 86, 0.8)',
    utilities: 'rgba(75, 192, 192, 0.8)',
    insurance: 'rgba(153, 102, 255, 0.8)',
    healthcare: 'rgba(255, 159, 64, 0.8)',
    debt: 'rgba(199, 199, 199, 0.8)',
    personal: 'rgba(83, 102, 255, 0.8)',
    entertainment: 'rgba(255, 99, 255, 0.8)',
    education: 'rgba(99, 255, 132, 0.8)',
    other: 'rgba(205, 180, 180, 0.8)',
  };
  
  const getSpendingByCategory = (): SpendingByCategory[] => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    
    const categoryMap: Record<string, number> = {};
    
    expenses.forEach(expense => {
      const category = expense.category;
      categoryMap[category] = (categoryMap[category] || 0) + expense.amount;
    });
    
    return Object.entries(categoryMap).map(([category, amount]) => ({
      category: category as TransactionCategory,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
  };
  
  const spendingByCategory = getSpendingByCategory();
  
  const chartData = {
    labels: spendingByCategory.map(c => c.category),
    datasets: [
      {
        data: spendingByCategory.map(c => c.amount),
        backgroundColor: spendingByCategory.map(c => categoryColors[c.category] || 'rgba(128, 128, 128, 0.8)'),
        borderColor: spendingByCategory.map(c => categoryColors[c.category]?.replace('0.8', '1') || 'rgba(128, 128, 128, 1)'),
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 12,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const percentage = spendingByCategory.find(c => c.category === label)?.percentage.toFixed(1) || 0;
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };
  
  useEffect(() => {
    // Cleanup chart on unmount (optional)
    return () => {
      ChartJS.unregister(ArcElement, Tooltip, Legend);
    };
  }, []);
  
  return (
    <Card title="Expenses by Category" className="h-full">
      <div className="h-64">
        {spendingByCategory.length > 0 ? (
          <Pie data={chartData} options={chartOptions} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No expense data available
          </div>
        )}
      </div>
      
      {spendingByCategory.length > 0 && (
        <div className="mt-6 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Top 3 Spending Categories</h4>
          <div className="space-y-3">
            {spendingByCategory.slice(0, 3).map((category) => (
              <div key={category.category} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: categoryColors[category.category] }}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm capitalize">{category.category}</span>
                    <span className="text-sm font-medium">${category.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1">
                    <div 
                      className="h-1.5 rounded-full" 
                      style={{
                        width: `${category.percentage}%`,
                        backgroundColor: categoryColors[category.category],
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ExpensesPieChart;
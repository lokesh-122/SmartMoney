import React, { useEffect } from 'react';
import { format, parseISO, subMonths } from 'date-fns';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Card from '../ui/Card';
import { Transaction, MonthlyData } from '../../types';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend
);

interface MonthlyTrendChartProps {
  transactions: Transaction[];
}

const MonthlyTrendChart: React.FC<MonthlyTrendChartProps> = ({ transactions }) => {
  const getMonthlyData = (): MonthlyData[] => {
    const monthlyData: Record<string, MonthlyData> = {};
    const today = new Date();
    
    // Initialize past 6 months
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(today, i);
      const monthStr = format(date, 'MMM yyyy');
      const monthKey = format(date, 'yyyy-MM');
      
      monthlyData[monthKey] = {
        month: monthStr,
        income: 0,
        expenses: 0,
        savings: 0,
      };
    }
    
    // Populate with transaction data
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = format(date, 'yyyy-MM');
      
      if (monthlyData[monthKey]) {
        if (transaction.type === 'income') {
          monthlyData[monthKey].income += transaction.amount;
        } else {
          monthlyData[monthKey].expenses += transaction.amount;
        }
      }
    });
    
    // Calculate savings for each month
    Object.keys(monthlyData).forEach(monthKey => {
      monthlyData[monthKey].savings = 
        monthlyData[monthKey].income - monthlyData[monthKey].expenses;
    });
    
    // Convert to array sorted by date
    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([_, data]) => data);
  };
  
  const monthlyData = getMonthlyData();
  
  const chartData = {
    labels: monthlyData.map(d => d.month),
    datasets: [
      {
        label: 'Income',
        data: monthlyData.map(d => d.income),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: monthlyData.map(d => d.expenses),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Savings',
        data: monthlyData.map(d => d.savings),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += '$' + context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    },
    animation: {
      duration: 1500,
    },
  };
  
  useEffect(() => {
    // Cleanup chart on unmount (optional)
    return () => {
      ChartJS.unregister(
        CategoryScale, 
        LinearScale, 
        PointElement, 
        LineElement, 
        Title, 
        Tooltip, 
        Legend
      );
    };
  }, []);
  
  return (
    <Card title="Monthly Trends" className="h-full">
      <div className="h-64">
        <Line data={chartData} options={chartOptions} />
      </div>
    </Card>
  );
};

export default MonthlyTrendChart;
import { Transaction } from '../types';

// Get monthly totals for historical data
const getMonthlyTotals = (transactions: Transaction[]): Record<string, number> => {
  const monthlyTotals: Record<string, number> = {};
  
  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      const date = new Date(transaction.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] += transaction.amount;
      } else {
        monthlyTotals[monthYear] = transaction.amount;
      }
    }
  });
  
  return monthlyTotals;
};

// Simple linear regression algorithm
const linearRegression = (data: number[]): { slope: number, intercept: number } => {
  const n = data.length;
  
  if (n <= 1) {
    return { slope: 0, intercept: data[0] || 0 };
  }
  
  // X values are just the indices (1, 2, 3, ..., n)
  const x = Array.from({ length: n }, (_, i) => i + 1);
  
  // Calculate means
  const meanX = x.reduce((sum, val) => sum + val, 0) / n;
  const meanY = data.reduce((sum, val) => sum + val, 0) / n;
  
  // Calculate slope
  const numerator = x.reduce((sum, val, i) => sum + (val - meanX) * (data[i] - meanY), 0);
  const denominator = x.reduce((sum, val) => sum + Math.pow(val - meanX, 2), 0);
  
  const slope = numerator / denominator;
  const intercept = meanY - slope * meanX;
  
  return { slope, intercept };
};

// Predict next month's expense
export const predictNextMonthExpense = (transactions: Transaction[]): number => {
  // Need at least 3 months of data for a reasonable prediction
  const monthlyTotals = getMonthlyTotals(transactions);
  const monthlyExpenses = Object.values(monthlyTotals);
  
  if (monthlyExpenses.length < 3) {
    // Not enough historical data, return average of available data
    return monthlyExpenses.reduce((sum, val) => sum + val, 0) / Math.max(1, monthlyExpenses.length);
  }
  
  const { slope, intercept } = linearRegression(monthlyExpenses);
  const nextMonthIndex = monthlyExpenses.length + 1;
  const predictedExpense = intercept + slope * nextMonthIndex;
  
  // Ensure prediction is not negative
  return Math.max(0, predictedExpense);
};

// Get spending trend direction
export const getSpendingTrend = (transactions: Transaction[]): 'increasing' | 'decreasing' | 'stable' => {
  const monthlyTotals = getMonthlyTotals(transactions);
  const monthlyExpenses = Object.values(monthlyTotals);
  
  if (monthlyExpenses.length < 2) {
    return 'stable';
  }
  
  const { slope } = linearRegression(monthlyExpenses);
  
  // Define thresholds for trend determination
  const thresholdPercentage = 0.05; // 5% change
  const averageExpense = monthlyExpenses.reduce((sum, val) => sum + val, 0) / monthlyExpenses.length;
  const thresholdValue = averageExpense * thresholdPercentage;
  
  if (slope > thresholdValue) {
    return 'increasing';
  } else if (slope < -thresholdValue) {
    return 'decreasing';
  } else {
    return 'stable';
  }
};
export interface User {
  id: string;
  name: string;
  email: string;
  income: number;
  savingsGoal: number;
  riskAppetite: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  category: TransactionCategory;
  type: 'income' | 'expense';
  date: Date;
  description: string;
  createdAt: Date;
}

export type TransactionCategory =
  | 'housing'
  | 'food'
  | 'transportation'
  | 'utilities'
  | 'insurance'
  | 'healthcare'
  | 'debt'
  | 'personal'
  | 'entertainment'
  | 'education'
  | 'savings'
  | 'gifts'
  | 'other'
  | 'salary'
  | 'investment'
  | 'bonus';

export interface Investment {
  id: string;
  userId: string;
  type: 'stocks' | 'bonds' | 'mutualFund' | 'fixedDeposit' | 'realEstate' | 'crypto' | 'other';
  amountInvested: number;
  expectedReturns: number;
  startDate: Date;
  endDate?: Date;
  riskLevel: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SpendingByCategory {
  category: TransactionCategory;
  amount: number;
  percentage: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}
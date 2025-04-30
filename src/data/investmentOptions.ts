import { Investment } from '../types';

export interface InvestmentOption {
  type: Investment['type'];
  name: string;
  riskLevel: Investment['riskLevel'];
  minAmount: number;
  averageReturn: number;
  description: string;
  timeFrame: string;
}

export const investmentOptions: InvestmentOption[] = [
  {
    type: 'fixedDeposit',
    name: 'Fixed Deposit',
    riskLevel: 'low',
    minAmount: 1000,
    averageReturn: 4.5,
    description: 'A secure investment with guaranteed returns. Ideal for conservative investors.',
    timeFrame: '6 months to 5 years'
  },
  {
    type: 'bonds',
    name: 'Government Bonds',
    riskLevel: 'low',
    minAmount: 1000,
    averageReturn: 5.5,
    description: 'Debt securities issued by the government with regular interest payments.',
    timeFrame: '1 to 30 years'
  },
  {
    type: 'mutualFund',
    name: 'Debt Mutual Funds',
    riskLevel: 'low',
    minAmount: 500,
    averageReturn: 6.0,
    description: 'Professionally managed funds that invest in fixed-income securities.',
    timeFrame: '1 to 3 years'
  },
  {
    type: 'mutualFund',
    name: 'Balanced Mutual Funds',
    riskLevel: 'medium',
    minAmount: 1000,
    averageReturn: 9.0,
    description: 'A mix of equity and debt investments that offer stability with moderate growth.',
    timeFrame: '3 to 5 years'
  },
  {
    type: 'mutualFund',
    name: 'Equity Mutual Funds',
    riskLevel: 'medium',
    minAmount: 1000,
    averageReturn: 12.0,
    description: 'Investments in the stock market managed by professional fund managers.',
    timeFrame: '5+ years'
  },
  {
    type: 'stocks',
    name: 'Blue-chip Stocks',
    riskLevel: 'medium',
    minAmount: 500,
    averageReturn: 10.0,
    description: 'Shares of well-established companies with stable earnings.',
    timeFrame: '5+ years'
  },
  {
    type: 'stocks',
    name: 'Growth Stocks',
    riskLevel: 'high',
    minAmount: 1000,
    averageReturn: 15.0,
    description: 'Shares of companies expected to grow at an above-average rate.',
    timeFrame: '7+ years'
  },
  {
    type: 'realEstate',
    name: 'REITs (Real Estate Investment Trusts)',
    riskLevel: 'high',
    minAmount: 5000,
    averageReturn: 8.0,
    description: 'Companies that own, operate, or finance income-generating real estate.',
    timeFrame: '5+ years'
  },
  {
    type: 'crypto',
    name: 'Cryptocurrency',
    riskLevel: 'high',
    minAmount: 100,
    averageReturn: 20.0,
    description: 'Digital or virtual currencies that use cryptography for security.',
    timeFrame: '5+ years'
  }
];

export const getInvestmentRecommendations = (
  disposableIncome: number,
  riskAppetite: 'low' | 'medium' | 'high'
): InvestmentOption[] => {
  // Filter options based on risk appetite and disposable income
  const filteredOptions = investmentOptions.filter(option => {
    // Match risk appetite exactly or one level below
    const isRiskMatch = option.riskLevel === riskAppetite || 
      (riskAppetite === 'high' && option.riskLevel === 'medium') ||
      (riskAppetite === 'medium' && option.riskLevel === 'low');
    
    // Check if user has enough disposable income
    const canAfford = option.minAmount <= disposableIncome;
    
    return isRiskMatch && canAfford;
  });
  
  // If no options match, return the most affordable options
  if (filteredOptions.length === 0) {
    return investmentOptions
      .filter(option => option.minAmount <= disposableIncome)
      .sort((a, b) => a.minAmount - b.minAmount)
      .slice(0, 3);
  }
  
  // Sort by risk level matching the user's appetite first, then by potential returns
  return filteredOptions
    .sort((a, b) => {
      // First sort by risk match
      if (a.riskLevel === riskAppetite && b.riskLevel !== riskAppetite) {
        return -1;
      }
      if (a.riskLevel !== riskAppetite && b.riskLevel === riskAppetite) {
        return 1;
      }
      
      // Then sort by potential returns (higher first)
      return b.averageReturn - a.averageReturn;
    })
    .slice(0, 3);
};
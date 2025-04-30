export const savingTips = [
  {
    id: 1,
    title: "50/30/20 Rule",
    description: "Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.",
    category: "budgeting"
  },
  {
    id: 2,
    title: "Cook at Home",
    description: "Eating out less and cooking at home can save you up to 70% on food expenses.",
    category: "food"
  },
  {
    id: 3,
    title: "Automatic Savings",
    description: "Set up automatic transfers to your savings account on payday to ensure consistent saving.",
    category: "saving"
  },
  {
    id: 4,
    title: "Energy Audit",
    description: "Conduct an energy audit of your home to identify ways to reduce utility bills.",
    category: "utilities"
  },
  {
    id: 5,
    title: "Debt Snowball",
    description: "Pay off your smallest debts first to build momentum and motivation for larger ones.",
    category: "debt"
  },
  {
    id: 6,
    title: "24-Hour Rule",
    description: "Wait 24 hours before making non-essential purchases to avoid impulse buying.",
    category: "shopping"
  },
  {
    id: 7,
    title: "Use Public Transportation",
    description: "Using public transport instead of driving can save on gas, maintenance, and parking costs.",
    category: "transportation"
  },
  {
    id: 8,
    title: "Buy Generic",
    description: "Choose generic or store-brand products over name brands to save 20-30% on groceries.",
    category: "shopping"
  },
  {
    id: 9,
    title: "Cancel Unused Subscriptions",
    description: "Review and cancel subscriptions and memberships you're not actively using.",
    category: "entertainment"
  },
  {
    id: 10,
    title: "Emergency Fund",
    description: "Build an emergency fund that covers 3-6 months of essential expenses.",
    category: "saving"
  }
];

export const getTipsBySpending = (
  categories: string[], 
  highSpendingCategory: string | null
): Array<typeof savingTips[0]> => {
  // Return general tips if no categories or high spending category
  if (categories.length === 0 && !highSpendingCategory) {
    return savingTips.slice(0, 3);
  }
  
  // Filter tips related to user's spending categories and prioritize high spending
  let relevantTips = savingTips.filter(tip => 
    categories.includes(tip.category) || 
    (highSpendingCategory && tip.category === highSpendingCategory)
  );
  
  // If high spending category exists, prioritize those tips
  if (highSpendingCategory) {
    const highPriorityTips = relevantTips.filter(tip => 
      tip.category === highSpendingCategory
    );
    
    const otherTips = relevantTips.filter(tip => 
      tip.category !== highSpendingCategory
    );
    
    relevantTips = [...highPriorityTips, ...otherTips];
  }
  
  // If we don't have enough relevant tips, add some general ones
  if (relevantTips.length < 3) {
    const generalTips = savingTips.filter(tip => 
      tip.category === 'budgeting' || tip.category === 'saving'
    );
    relevantTips = [...relevantTips, ...generalTips];
  }
  
  // Return at most 3 tips
  return relevantTips.slice(0, 3);
};
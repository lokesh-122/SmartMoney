import React from 'react';
import { TrendingUp, AlertTriangle, Shield } from 'lucide-react';
import Card from '../ui/Card';
import { InvestmentOption } from '../../data/investmentOptions';

interface InvestmentRecommendationsProps {
  recommendations: InvestmentOption[];
}

const InvestmentRecommendations: React.FC<InvestmentRecommendationsProps> = ({
  recommendations
}) => {
  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return <Shield className="h-5 w-5 text-green-600" />;
      case 'medium':
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      default:
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
    }
  };
  
  const getRiskColorClass = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card title="Investment Recommendations" className="h-full">
      {recommendations.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
          <TrendingUp className="h-8 w-8 text-gray-400 mb-2" />
          <p>Update your profile with income and risk preference to get recommendations</p>
        </div>
      ) : (
        <div className="space-y-6">
          {recommendations.map((investment, index) => (
            <div 
              key={`${investment.type}-${index}`}
              className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md transform hover:-translate-y-1"
            >
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                  {getRiskIcon(investment.riskLevel)}
                  <h3 className="ml-2 font-medium text-gray-900">{investment.name}</h3>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskColorClass(investment.riskLevel)}`}>
                  {investment.riskLevel.charAt(0).toUpperCase() + investment.riskLevel.slice(1)} Risk
                </span>
              </div>
              
              <div className="p-4">
                <p className="text-sm text-gray-600">{investment.description}</p>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Minimum Investment</p>
                    <p className="font-medium">${investment.minAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Average Return</p>
                    <p className="font-medium">{investment.averageReturn}% per year</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-xs text-gray-500">Recommended Time Frame</p>
                  <p className="text-sm">{investment.timeFrame}</p>
                </div>
                
                <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-sm font-medium">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default InvestmentRecommendations;
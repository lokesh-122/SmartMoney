import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart as ChartPie, LineChart, Wallet, TrendingUp, ShieldCheck, Bell, DollarSign, PiggyBank, Target } from 'lucide-react';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Take control of your finances with
            <span className="text-blue-600"> Smart Money Manager</span>
          </h1>
          <p className="text-lg text-gray-600">
            Track expenses, visualize spending patterns, predict future costs, and get personalized investment recommendations.
          </p>
          <div className="flex gap-4">
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">Sign In</Button>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img 
            src="https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Financial planning" 
            className="rounded-xl shadow-lg w-full h-auto"
          />
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your personal finances in one place.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Wallet className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Expense Tracking</h3>
            <p className="text-gray-600">
              Easily log and categorize all your income and expenses to keep track of where your money goes.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
              <ChartPie className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Visual Analytics</h3>
            <p className="text-gray-600">
              Interactive charts and graphs help you visualize your spending patterns and financial health.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
              <LineChart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Future Prediction</h3>
            <p className="text-gray-600">
              AI-powered predictions help you anticipate future expenses and plan your budget accordingly.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Investment Advice</h3>
            <p className="text-gray-600">
              Get personalized investment recommendations based on your risk profile and financial goals.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-gray-600">
              Your financial data is encrypted and secure. We prioritize your privacy and data protection.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-600 mb-4">
              <Bell className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Alerts</h3>
            <p className="text-gray-600">
              Get notifications when you're approaching budget limits or when unusual spending patterns are detected.
            </p>
          </div>
        </div>
      </div>
      
      {/* Financial Tips Section */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Smart Money Management Tips</h2>
          <p className="mt-4 text-lg text-gray-600">Essential principles for building financial security</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <PiggyBank className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-lg">Emergency Fund</h4>
            </div>
            <p className="text-gray-600">
              Build a safety net of 3-6 months of expenses. Start small with automatic monthly transfers to create a financial buffer for unexpected costs.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-lg">50/30/20 Rule</h4>
            </div>
            <p className="text-gray-600">
              Allocate 50% of income to necessities, 30% to wants, and 20% to savings and investments. This balanced approach ensures sustainable financial growth.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 rounded-full p-2 mr-3">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-lg">Investment Strategy</h4>
            </div>
            <p className="text-gray-600">
              Diversify investments across different asset classes based on your risk tolerance and time horizon. Regular rebalancing helps maintain optimal allocation.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to take control of your finances?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of users who have transformed their financial lives with Smart Money Manager.
        </p>
        <Link to="/register">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors">
            Start Your Free Account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
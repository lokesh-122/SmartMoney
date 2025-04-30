import React from 'react';
import { PiggyBank } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <PiggyBank className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-lg font-bold text-gray-800">SmartMoney</span>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>&copy; {currentYear} SmartMoney. All rights reserved.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Crown, Clock, Shield, Link } from 'lucide-react';
import Payment from './Payment';

const SubscriptionPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1');
  const navigate = useNavigate();

  const subscriptionPlans = {
    '1': { days: '1 minute', price: 0.99, savings: '0%' },
    '5': { days: '5 days', price: 4.99, savings: '15%' },
    '10': { days: '10 days', price: 8.99, savings: '25%' }
  };

  const features = [
    'Unlimited Article Access',
    'Premium Content',
    'Ad-Free Experience',
    'Early Access to News',
    'Exclusive Interviews'
  ];

  const handleSubscribe = () => {
    navigate('/payment', { 
      state: { 
        plan: subscriptionPlans[selectedPeriod],
        price: subscriptionPlans[selectedPeriod].price,
        duration: selectedPeriod 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-blue-600 h-72">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-600 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/90" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Upgrade to Premium
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-blue-100">
              Get unlimited access to all our premium content and exclusive features
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Card */}
      <div className="max-w-4xl mx-auto px-4 pb-24 pt-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <Crown className="w-8 h-8 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-900">Premium Membership</h2>
            </div>

            {/* Plan Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Subscription Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                <option value="1">1 Minute (Demo) - ${subscriptionPlans['1'].price}</option>
                <option value="5">5 Days - ${subscriptionPlans['5'].price} (Save {subscriptionPlans['5'].savings})</option>
                <option value="10">10 Days - ${subscriptionPlans['10'].price} (Save {subscriptionPlans['10'].savings})</option>
              </select>
            </div>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            {/* Price Display */}
            <div className="text-center mb-8">
              <p className="text-5xl font-bold text-gray-900">
                ${subscriptionPlans[selectedPeriod].price}
              </p>
              <p className="text-gray-500 mt-2">
                for {subscriptionPlans[selectedPeriod].days}
              </p>
            </div>

            {/* Subscribe Button */}
            <button
              onClick={handleSubscribe}
              className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Subscribe Now
            </button>

            {/* Additional Info */}
            <div className="mt-6 flex justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;

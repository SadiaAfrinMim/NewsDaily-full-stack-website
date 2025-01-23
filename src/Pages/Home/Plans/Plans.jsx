import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check, X } from 'lucide-react';

const Plans = () => {
  const navigate = useNavigate();
  
  const plans = [
    {
      id: 'free',
      type: "Basic",
      price: "$0",
      period: "/ month",
      features: [
        "5 articles per day",
        "Basic news categories",
        "Standard news updates",
        "Mobile app access",
        "Email newsletter"
      ],
      limitations: [
        "No premium content",
        "Contains advertisements",
        "No offline reading",
        "No custom newsletters"
      ],
      buttonText: "Start Free Trial"
    },
    {
      id: 'premium',
      type: "Premium",
      price: "$9.99",
      period: "/ month",
      features: [
        "Unlimited articles",
        "Exclusive premium content",
        "Breaking news alerts",
        "Ad-free experience",
        "Offline reading mode",
        "Custom news feeds",
        "Priority support",
        "Exclusive interviews",
        "In-depth analysis",
        "Personalized newsletters"
      ],
      buttonText: "Go Premium"
    }
  ];

  const handleSubscription = (planId) => {
    if (planId === 'premium') {
      navigate('/subscription', { 
        state: { 
          selectedPlan: 'premium',
          price: '9.99'
        } 
      });
    } else {
      navigate('/signup', { 
        state: { 
          plan: 'free' 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-red-900 mb-4 flex items-center justify-center gap-2">
            Choose Your Perfect Plan <Sparkles className="text-red-500" />
          </h2>
          <p className="text-red-700 max-w-2xl mx-auto">
            Select the plan that best suits your reading habits. Whether you're a casual reader
            or a news enthusiast, we have the perfect option for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`card ${plan.id === 'premium' ? 'bg-gradient-to-br from-red-600 to-red-800 text-white' : 'bg-white'} 
                shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className="card-body">
                <h3 className="card-title text-3xl font-bold mb-2">
                  {plan.type}
                  {plan.id === 'premium' && (
                    <div className="badge badge-secondary">Popular</div>
                  )}
                </h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-lg ml-1">{plan.period}</span>
                </div>
                
                <div className="divider"></div>
                
                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations && plan.limitations.map((limitation, i) => (
                    <div key={i} className="flex items-center gap-2 opacity-50">
                      <X className="w-5 h-5" />
                      <span>{limitation}</span>
                    </div>
                  ))}
                </div>
                
                <div className="card-actions mt-8">
                  <button 
                    onClick={() => handleSubscription(plan.id)}
                    className={`btn btn-block ${
                      plan.id === 'premium' 
                        ? 'btn-secondary bg-white text-red-700 hover:bg-red-100' 
                        : 'btn-primary bg-red-600 hover:bg-red-700 text-white border-none'
                    } text-lg font-bold`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
                
                {plan.id === 'premium' && (
                  <p className="text-sm opacity-75 text-center mt-4">
                    Cancel anytime. No commitment required.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-red-700 mb-2">Have questions about our plans?</p>
          <button 
            onClick={() => navigate('/faq')}
            className="btn btn-ghost text-red-600 hover:text-red-700"
          >
            Visit our FAQ page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const Plans = () => {
  const navigate = useNavigate();
  
  const plans = [
    {
      id: 'free',
      type: "Free",
      price: "$0/month",
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
      color: "bg-blue-500",
      buttonText: "Continue with Free"
    },
    {
      id: 'premium',
      type: "Premium",
      price: "$9.99/month",
      features: [
        "Unlimited articles",
        "Exclusive premium content",
        "Breaking news alerts",
        "Ad-free experience",
        "Offline reading mode",
        "Custom news feeds",
        "Priority customer support",
        "Exclusive interviews",
        "In-depth analysis",
        "Personalized newsletters"
      ],
      color: "bg-purple-600",
      buttonText: "Get Premium Access"
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
      // For free plan, might want to just register the user
      navigate('/register', { 
        state: { 
          plan: 'free' 
        } 
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto mt-16 p-4 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Perfect Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the plan that best suits your reading habits. Whether you're a casual reader
          or a news enthusiast, we have the perfect option for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div className={`${plan.color} p-6 text-white`}>
              <h3 className="text-2xl font-bold">{plan.type}</h3>
              <p className="text-xl mt-2 font-semibold">{plan.price}</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-semibold text-lg mb-4">What's Included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-green-600">
                      <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.limitations && (
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-4">Limitations:</h4>
                  <ul className="space-y-3">
                    {plan.limitations.map((limitation, i) => (
                      <li key={i} className="flex items-center text-gray-500">
                        <span className="w-5 h-5 mr-2 flex-shrink-0">×</span>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <button 
                onClick={() => handleSubscription(plan.id)}
                className={`mt-6 w-full py-3 px-6 rounded-lg text-white ${plan.color} 
                  hover:opacity-90 transition-opacity font-semibold shadow-md
                  transform transition duration-200 hover:-translate-y-1`}
              >
                {plan.buttonText}
              </button>
              
              {plan.id === 'premium' && (
                <p className="text-sm text-gray-500 text-center mt-4">
                  Cancel anytime. No commitment required.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 text-gray-600">
        <p className="mb-2">Have questions about our plans?</p>
        <button 
          onClick={() => navigate('/faq')}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Visit our FAQ page
        </button>
      </div>
    </section>
  );
};

export default Plans;
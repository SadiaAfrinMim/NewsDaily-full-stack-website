import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const SubscriptionPage = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  
  const [selectedPlan, setSelectedPlan] = useState(5); // Default plan duration (5 days)
  const [price, setPrice] = useState(10); // Default price for 5 days
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Update the price based on the selected plan
    switch (selectedPlan) {
      case 1:
        setPrice(1);  // Price for 1 minute plan
        break;
      case 5:
        setPrice(10); // Price for 5 days plan
        break;
      case 10:
        setPrice(18); // Price for 10 days plan
        break;
      default:
        setPrice(10); // Default value for unhandled plan
    }
  }, [selectedPlan]);

  const handleSubscription = () => {
    setLoading(true);
    setError('');
    try {
      // Navigate to the payment page with selected price and duration
      let planDurationInMilliseconds;

      // Calculate the duration in milliseconds
      if (selectedPlan === 1) {
        planDurationInMilliseconds = 1 * 60 * 1000; // 1 minute in milliseconds
      } else {
        planDurationInMilliseconds = selectedPlan * 24 * 60 * 60 * 1000; // Days to milliseconds
      }

      // Navigate to the payment page
      navigate('/payment', { state: { price, planDuration: planDurationInMilliseconds } });
    } catch (err) {
      setError('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="banner bg-blue-600 text-white p-6 rounded-lg text-center">
        <h1 className="text-3xl font-bold">Upgrade to Premium</h1>
        <p>Get access to exclusive content and features.</p>
      </div>

      <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Choose Your Subscription Plan</h2>
        
        <div className="mt-4">
          <label htmlFor="plan" className="block text-lg">Select Subscription Duration:</label>
          <select
            id="plan"
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(parseInt(e.target.value))}
            className="mt-2 w-full p-2 border rounded-lg"
          >
            <option value={1}>1 minute (For assignment checking)</option>
            <option value={5}>5 days</option>
            <option value={10}>10 days</option>
          </select>
        </div>

        <div className="mt-4">
          <p className="text-lg">Price: ${price}</p>
        </div>

        {error && <div className="mt-4 text-red-500">{error}</div>}

        <button
          onClick={handleSubscription}
          className="mt-6 w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-medium"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPage;

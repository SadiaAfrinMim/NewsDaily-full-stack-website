import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { FaCheckCircle, FaCreditCard } from 'react-icons/fa'; // React Icons

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
    <div className="container lg:max-w-2xl border-gray-200 border mx-auto ">
      <div className="banner bg-gradient-to-r  from-red-500 to-red-600 text-white p-8 rounded-t-lg text-center shadow-xl">
        <h1 className="text-4xl font-semibold mb-2">Upgrade to Premium</h1>
        <p className="text-lg">Unlock exclusive content and features for a better experience.</p>
      </div>
       {/* Relevant Article Section */}
       <div className="m-6 m border-b-red-600  border-4 bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">Why Choose Premium?</h3>
        <p className="mt-4 text-gray-600">
          Upgrading to Premium offers more flexibility and additional features such as access to exclusive content, priority support, and faster processing times. Stay ahead with our top-tier services!
        </p>
        <a
          href="#"
          className="mt-4 inline-block text-red-600 hover:text-red-700 font-semibold"
        >
          Learn More about Premium Features
        </a>
      </div>

      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700">Choose Your Subscription Plan</h2>

        <div className="mt-6">
          <label htmlFor="plan" className="block text-lg text-gray-600">Select Subscription Duration:</label>
          <select
            id="plan"
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(parseInt(e.target.value))}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option className='bg-red-600 text-white' value={1}>1 minute (For assignment checking)</option>
            <option className='bg-red-600 text-white' value={5}>5 days</option>
            <option className='bg-red-600 text-white' value={10}>10 days</option>
          </select>
        </div>

        <div className="mt-6 text-lg text-gray-800 font-semibold">
          <p>Price: <span className="text-red-600">${price}</span></p>
        </div>

        {error && <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">{error}</div>}

        <button
          onClick={handleSubscription}
          className="mt-6 w-full py-3 px-4 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition duration-300"
          disabled={loading}
        >
          {loading ? <FaCreditCard className="animate-spin inline mr-2" /> : <FaCheckCircle className="inline mr-2" />}
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </div>

     
    </div>
  );
};

export default SubscriptionPage;

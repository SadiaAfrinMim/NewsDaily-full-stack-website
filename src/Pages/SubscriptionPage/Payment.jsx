// Payment.jsx
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import StripeCheckoutForm from './StripeCheckoutForm';

// Replace with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { price } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Complete Your Payment</h2>
        <div className="mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-center text-gray-800">
              Amount to Pay: <span className="font-bold">${price}</span>
            </p>
          </div>
        </div>
        <Elements stripe={stripePromise}>
          <StripeCheckoutForm price={price} navigate={navigate} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;

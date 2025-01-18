import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const StripeCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { price, planDuration } = state;  // Get the price and plan duration from the location state
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!stripe || !elements) {
      setError('Stripe has not loaded properly.');
      setLoading(false);
      return;
    }

    try {
      const { data: { clientSecret } } = await axios.post('http://localhost:9000/create-payment-intent', {
        amount: price * 100, // Convert dollars to cents
      });

      const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.name || 'Anonymous',
            email: user.email,
          },
        },
      });

      if (paymentError) {
        setError(paymentError.message);
      } else if (paymentIntent.status === 'succeeded') {
        const subscriptionEnd = new Date(Date.now() + planDuration);

        // Update user with subscription info
        await axios.put('http://localhost:9000/users/premium-status', {
          plan: "premium",
          email: user.email,
          premiumTaken: Date.now(),
          subscriptionEnd,
        });

        // Set the timeout to log the user out after subscription ends
        const timeout = subscriptionEnd - Date.now();
        setTimeout(() => {
          setUser(null);
          navigate('/login');
        }, timeout);

        alert('Payment successful! Premium access granted.');
        navigate('/subscription-success');
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-lg bg-white">
        <CardElement />
      </div>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-3 px-4 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700"
      >
        {loading ? 'Processing...' : `Pay $${price}`}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;

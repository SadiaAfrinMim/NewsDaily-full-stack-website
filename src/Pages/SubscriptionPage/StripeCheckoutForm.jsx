import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import { useLocation } from 'react-router-dom';

const StripeCheckoutForm = ({ price,  navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation()
  const {user} = useAuth()

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');

  //   if (!stripe || !elements) {
  //     setError('Stripe has not loaded properly.');
  //     setLoading(false);
  //     return;
  //   }

  //   // Validate price
  //   if (typeof price !== 'number' || price <= 0) {
  //     setError('Invalid price.');
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     // Create payment intent
  //     const { data: { clientSecret } } = await axios.post('http://localhost:9000/create-payment-intent', {
  //       amount: price, // Convert dollars to cents
  //     });

  //     // Confirm payment
  //     const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(
  //       clientSecret,
  //       {
  //         payment_method: {
  //           card: elements.getElement(CardElement),
  //           billing_details: {
  //             name: user.name || 'Anonymous',
  //             email: user.email,
  //           },
  //         },
  //       }
  //     );

  //     if (paymentError) {
  //       setError(paymentError.message);
  //     } else if (paymentIntent.status === 'succeeded') {
  //       // Save payment info to the database
  //       const paymentInfo = {
  //         email: user.email,
  //         transactionId: paymentIntent.id,
  //         price,
  //         date: new Date(),
  //         status: 'success',
  //       };

  //       try {
  //         await axios.post('http://localhost:9000/payments', paymentInfo);
  //         alert('Payment successful!');
  //         navigate('/'); // Redirect after success
  //       } catch (err) {
  //         setError('Payment recorded, but database update failed.');
  //       }
  //     }
  //   } catch (err) {
  //     setError('Payment failed. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    if (!stripe || !elements) {
      setError('Stripe has not loaded properly.');
      setLoading(false);
      return;
    }
  
    // Validate price (should be a valid positive number)
    if (typeof price !== 'number' || price <= 0) {
      setError('Invalid price.');
      setLoading(false);
      return;
    }
  
    try {
      // Create payment intent
      const { data: { clientSecret } } = await axios.post('http://localhost:9000/create-payment-intent', {
        amount: price, // Convert dollars to cents on backend
      });
  
      // Confirm the payment
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
        console.error(paymentError);  // Log the payment error for debugging
      } else if (paymentIntent.status === 'succeeded') {
        // Payment succeeded, now store payment info
        const paymentInfo = {
          email: user.email,
          transactionId: paymentIntent.id,
          price,
          date: new Date(),
          status: 'success',
          plan: 'premium'
          
        };
  
        try {
          await axios.put('http://localhost:9000/payments', paymentInfo);
          alert('Payment successful!');
          navigate('/'); // Redirect to home or another page after success
        } catch (dbError) {
          setError('Payment recorded, but database update failed.');
          console.error('Database update failed:', dbError);
        }
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
      console.error('Error during payment confirmation:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 border rounded-lg bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors duration-200`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
              Processing...
            </div>
          ) : (
            `Pay $${price}`
          )}
        </button>
      </form>
    </div>
  );
};

export default StripeCheckoutForm;

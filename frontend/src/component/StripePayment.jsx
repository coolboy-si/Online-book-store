import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { Lock, CreditCard } from 'lucide-react';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key_here');

const CheckoutForm = ({ book, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: 'Customer Name',
      },
    });

    if (error) {
      console.error('Error:', error);
      onError(error.message);
      setIsProcessing(false);
      return;
    }

    // Simulate payment processing (replace with actual backend call)
    try {
      // Here you would typically send the paymentMethod.id to your backend
      // const response = await fetch('/api/process-payment', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     payment_method_id: paymentMethod.id,
      //     amount: book.price * 100, // Amount in cents
      //     book_id: book.id
      //   })
      // });

      // Simulate successful payment
      setTimeout(() => {
        onSuccess();
        setIsProcessing(false);
      }, 2000);

    } catch (err) {
      onError('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        '::placeholder': {
          color: '#9ca3af',
        },
        backgroundColor: 'transparent',
      },
      invalid: {
        color: '#ef4444',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Element */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          <CreditCard size={16} className="inline mr-2" />
          Card Information
        </label>
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-xl">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <Lock size={16} />
        <span>Your payment information is secure and encrypted</span>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        whileHover={{ scale: isProcessing ? 1 : 1.02 }}
        whileTap={{ scale: isProcessing ? 1 : 0.98 }}
      >
        {isProcessing ? (
          <>
            <motion.div
              className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock size={18} />
            Pay ${book?.price}
          </>
        )}
      </motion.button>
    </form>
  );
};

const StripePayment = ({ book, onSuccess, onError }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm book={book} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
};

export default StripePayment;
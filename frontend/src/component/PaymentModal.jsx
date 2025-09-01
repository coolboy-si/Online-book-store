import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, ShoppingCart } from 'lucide-react';
import StripePayment from './StripePayment';

function PaymentModal({ isOpen, onClose, book }) {
  const [paymentMethod, setPaymentMethod] = useState('demo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentError('');
    
    // Simulate payment processing for demo
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Close modal after success
      setTimeout(() => {
        setPaymentSuccess(false);
        onClose();
      }, 2000);
    }, 2000);
  };
  
  const handleStripeSuccess = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      onClose();
    }, 2000);
  };
  
  const handleStripeError = (error) => {
    setPaymentError(error);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          className="relative bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {paymentSuccess ? (
            // Success State
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  ✓
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
              <p className="text-gray-400">Your book has been purchased successfully.</p>
            </motion.div>
          ) : (
            // Payment Form
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Complete Purchase</h3>
                <p className="text-gray-400">Secure payment for your book</p>
              </div>

              {/* Book Info */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={book?.image} 
                    alt={book?.name}
                    className="w-16 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{book?.name}</h4>
                    <p className="text-gray-400 text-sm">{book?.category}</p>
                    <p className="text-white font-bold text-lg">${book?.price}</p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-3">Payment Method</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-gray-800 border border-gray-700 rounded-xl cursor-pointer hover:bg-gray-750 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="demo"
                      checked={paymentMethod === 'demo'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-white"
                    />
                    <CreditCard size={20} className="text-gray-400" />
                    <span className="text-white">Demo Payment (Test)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-gray-800 border border-gray-700 rounded-xl cursor-pointer hover:bg-gray-750 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="stripe"
                      checked={paymentMethod === 'stripe'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-white"
                    />
                    <div className="w-5 h-5 bg-purple-500 rounded text-white text-xs flex items-center justify-center font-bold">S</div>
                    <span className="text-white">Stripe (Real Payment)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-gray-800 border border-gray-700 rounded-xl cursor-pointer hover:bg-gray-750 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-white"
                    />
                    <div className="w-5 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
                    <span className="text-white">PayPal</span>
                  </label>
                </div>
              </div>

              {/* Payment Forms */}
              {paymentMethod === 'demo' && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'stripe' && (
                <div className="mb-6">
                  <StripePayment 
                    book={book}
                    onSuccess={handleStripeSuccess}
                    onError={handleStripeError}
                  />
                </div>
              )}

              {/* Error Message */}
              {paymentError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4">
                  <p className="text-red-400 text-sm">{paymentError}</p>
                </div>
              )}
              
              {/* Security Notice */}
              {paymentMethod !== 'stripe' && (
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                  <Lock size={16} />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              )}

              {/* Payment Button - Only show for demo and PayPal */}
              {(paymentMethod === 'demo' || paymentMethod === 'paypal') && (
                <motion.button
                  onClick={handlePayment}
                  disabled={isProcessing}
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
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      Pay ${book?.price}
                    </>
                  )}
                </motion.button>
              )}
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default PaymentModal;
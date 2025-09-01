import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, ShoppingCart, CheckCircle } from 'lucide-react';
import defaultBookImage from '../assets/Boook.jpeg';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  // Redirect if no book data
  if (!book) {
    navigate('/course');
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 3000);
  };

  const handleBackToCourse = () => {
    navigate('/course');
  };

  if (paymentSuccess) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>

        <motion.div
          className="text-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 300 }}
        >
          <motion.div
            className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", damping: 15 }}
          >
            <CheckCircle className="text-white" size={64} />
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Payment Successful!
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Thank you for purchasing "{book.name}"
          </motion.p>
          
          <motion.button
            onClick={handleBackToCourse}
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-3 rounded-2xl hover:bg-gray-200 transition-all duration-200 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <ArrowLeft size={18} />
            Back to Books
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black'>
      <div className='max-w-4xl container mx-auto px-4 py-20'>
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 border border-gray-700 rounded-2xl mb-6 shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", damping: 15 }}
          >
            <ShoppingCart className="text-white" size={32} />
          </motion.div>
          
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Complete Your Purchase
          </h1>
          <p className='text-xl text-gray-400'>
            Secure payment for your selected book
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Book Details */}
          <motion.div
            className="bg-gray-900 border border-gray-700 rounded-2xl p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Order Summary</h3>
            
            <div className="flex items-start gap-6 mb-8">
              <img 
                src={book.image || defaultBookImage} 
                alt={book.name}
                className="w-24 h-32 object-cover rounded-xl shadow-lg"
                onError={(e) => { e.target.src = defaultBookImage }}
              />
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-white mb-2">{book.name}</h4>
                <p className="text-gray-400 mb-4">{book.title}</p>
                <span className="inline-block px-3 py-1 bg-white text-black text-sm font-semibold rounded-full">
                  {book.category}
                </span>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Book Price:</span>
                <span className="text-white font-semibold">${book.price}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Tax:</span>
                <span className="text-white font-semibold">$0.00</span>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">Total:</span>
                  <span className="text-2xl font-bold text-white">${book.price}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            className="bg-gray-900 border border-gray-700 rounded-2xl p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Payment Details</h3>
            
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Payment Methods */}
              <div>
                <label className="block text-white font-medium mb-3">Payment Method</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-gray-800 border border-gray-700 rounded-xl cursor-pointer hover:bg-gray-750 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <CreditCard size={20} className="text-gray-400" />
                    <span className="text-white">Credit/Debit Card</span>
                  </label>
                </div>
              </div>

              {/* Card Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent outline-none"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Lock size={16} />
                <span>Your payment information is secure and encrypted</span>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/course')}
                  className="flex-1 bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-700 transition-all duration-200 border border-gray-700"
                >
                  Cancel
                </button>
                
                <motion.button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                      Pay ${book.price}
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
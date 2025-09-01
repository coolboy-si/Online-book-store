import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Heart, Eye, BookOpen, DollarSign } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import defaultBookImage from '../assets/Boook.jpeg'

function Cards({ item }) {
  console.log(item);
  const navigate = useNavigate();
  
  const handleBuyNow = (e) => {
    e.stopPropagation();
    // Navigate to payment page with book data
    navigate('/payment', { state: { book: item } });
  };
  
  const handleCardClick = () => {
    // Navigate to book detail page
    navigate('/book-detail', { state: { book: item } });
  };
  
  return (
    <motion.div 
      className='mt-4 my-3 p-3'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      <motion.div 
        className="relative bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-700 cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onClick={handleCardClick}
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <motion.img
            src={item.image || defaultBookImage}
            alt={item.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
            onError={(e) => { e.target.src = defaultBookImage }}
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <motion.button
              className="p-3 bg-gray-800/90 rounded-full hover:bg-gray-700 transition-colors shadow-lg border border-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye size={20} className="text-gray-300" />
            </motion.button>
            <motion.button
              className="p-3 bg-gray-800/90 rounded-full hover:bg-gray-700 transition-colors shadow-lg border border-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={20} className="text-red-500" />
            </motion.button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <motion.span 
              className="px-3 py-1 bg-white text-black text-xs font-semibold rounded-full shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {item.category}
            </motion.span>
          </div>

          {/* Rating */}
          <div className="absolute top-4 right-4">
            <motion.div 
              className="flex items-center gap-1 bg-gray-800/90 px-2 py-1 rounded-full shadow-lg border border-gray-600"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Star size={14} className="text-yellow-500 fill-current" />
              <span className="text-xs font-semibold text-gray-300">4.8</span>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title */}
          <motion.h2 
            className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-gray-300 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {item.name}
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            className="text-gray-400 text-sm mb-4 line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {item.title}
          </motion.p>

          {/* Author & Pages Info */}
          <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <BookOpen size={14} />
              <span>248 pages</span>
            </div>
            <div className="flex items-center gap-1">
              <span>•</span>
              <span>Fiction</span>
            </div>
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <DollarSign size={18} className="text-green-500" />
              <span className="text-2xl font-bold text-white">
                {item.price}
              </span>
              <span className="text-sm text-gray-400 line-through ml-2">
                ${(item.price * 1.2).toFixed(2)}
              </span>
            </motion.div>
            
            <motion.button
              onClick={handleBuyNow}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Buy Now</span>
            </motion.button>
          </div>

          {/* Progress Bar for Reading */}
          <motion.div 
            className="mt-4 pt-4 border-t border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span>Reading Progress</span>
              <span>0%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div 
                className="bg-white h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "0%" }}
                transition={{ delay: 0.6, duration: 1 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-gray-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export default Cards
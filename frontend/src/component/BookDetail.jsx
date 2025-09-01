import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, BookOpen, User, Calendar, Globe, Heart, Share2, ShoppingCart } from 'lucide-react';
import defaultBookImage from '../assets/Boook.jpeg';

function BookDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  if (!book) {
    navigate('/course');
    return null;
  }

  const handleBuyNow = () => {
    navigate('/payment', { state: { book } });
  };

  return (
    <div className='min-h-screen bg-black'>
      <div className='max-w-6xl container mx-auto px-4 py-20'>
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft size={20} />
          <span>Back to Books</span>
        </motion.button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Book Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <motion.div
                className="bg-gray-900 border border-gray-700 p-6 rounded-3xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={book.image || defaultBookImage}
                  alt={book.name}
                  className="w-80 h-96 object-cover rounded-2xl shadow-lg"
                  onError={(e) => { e.target.src = defaultBookImage }}
                />
              </motion.div>
              
              {/* Floating Badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white text-black px-4 py-2 rounded-full shadow-lg font-semibold text-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                {book.category}
              </motion.div>
            </div>
          </motion.div>

          {/* Book Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{book.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-500 fill-current" />
                  ))}
                  <span className="text-white font-semibold ml-2">4.8</span>
                  <span className="text-gray-400">(2,847 reviews)</span>
                </div>
              </div>
            </div>

            {/* Author and Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User size={16} className="text-gray-400" />
                  <span className="text-gray-400 text-sm">Author</span>
                </div>
                <p className="text-white font-semibold">John Smith</p>
              </div>
              
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={16} className="text-gray-400" />
                  <span className="text-gray-400 text-sm">Pages</span>
                </div>
                <p className="text-white font-semibold">324 pages</p>
              </div>
              
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-gray-400 text-sm">Published</span>
                </div>
                <p className="text-white font-semibold">2023</p>
              </div>
              
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={16} className="text-gray-400" />
                  <span className="text-gray-400 text-sm">Language</span>
                </div>
                <p className="text-white font-semibold">English</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Description</h3>
              <p className="text-gray-400 leading-relaxed">
                {book.title || "This captivating story takes readers on an unforgettable journey through a world of mystery, adventure, and discovery. With rich character development and intricate plot twists, this book offers an immersive reading experience that will keep you turning pages late into the night."}
              </p>
            </div>

            {/* Price and Actions */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl font-bold text-white">${book.price}</span>
                  <span className="text-lg text-gray-400 line-through ml-3">${(book.price * 1.3).toFixed(2)}</span>
                  <span className="text-green-400 text-sm ml-2">Save 23%</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <motion.button
                  onClick={handleBuyNow}
                  className="flex-1 bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={18} />
                  Buy Now
                </motion.button>
                
                <motion.button
                  className="p-3 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart size={20} className="text-red-500" />
                </motion.button>
                
                <motion.button
                  className="p-3 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 size={20} className="text-gray-400" />
                </motion.button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Book Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">ISBN:</span>
                  <span className="text-white">978-0-123456-78-9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Publisher:</span>
                  <span className="text-white">BookVerse Publishing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Format:</span>
                  <span className="text-white">Digital & Print</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">File Size:</span>
                  <span className="text-white">2.4 MB</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
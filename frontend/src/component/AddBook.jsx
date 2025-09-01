import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Upload, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

function AddBook() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    price: '',
    category: '',
    image: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const bookData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      const response = await axios.post('http://localhost:4001/book', bookData);
      
      if (response.data) {
        toast.success('📚 Book added successfully!');
        navigate('/course');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error('Failed to add book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-black'>
      <div className='max-w-4xl container mx-auto px-4 py-20'>
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ x: -4 }}
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </motion.button>
            
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
              >
                <BookOpen className="text-white" size={24} />
              </motion.div>
              <h1 className='text-3xl md:text-4xl font-bold text-white'>
                Add New Book
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-gray-900 border border-gray-700 rounded-2xl p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Book Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">Book Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter book name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent outline-none"
                  required
                />
              </div>

              {/* Book Title */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">Book Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter book title"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent outline-none"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent outline-none"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-white focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Science">Science</option>
                  <option value="Technology">Technology</option>
                  <option value="History">History</option>
                  <option value="Biography">Biography</option>
                  <option value="Romance">Romance</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Self-Help">Self-Help</option>
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL (optional)"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <motion.button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-700 transition-all duration-200 border border-gray-700 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <X size={18} />
                Cancel
              </motion.button>
              
              <motion.button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Adding...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Add Book
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AddBook;
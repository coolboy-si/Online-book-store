// src\component\banner.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Sparkles, BookOpen, Users, Award, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Boook from '../assets/Boook.jpeg';

function Banner() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  
  const handleGetStarted = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success('Welcome! Redirecting to courses...');
      setTimeout(() => {
        navigate('/course');
      }, 1000);
    } else {
      toast.error('Please enter your email address');
    }
  };
  
  const stats = [
    { icon: BookOpen, label: "Books Available", value: "10,000+" },
    { icon: Users, label: "Happy Readers", value: "50,000+" },
    { icon: Award, label: "Awards Won", value: "25+" },
    { icon: TrendingUp, label: "Growth Rate", value: "200%" }
  ];

  return (
    <div className='min-h-screen bg-black relative overflow-hidden'>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Large Floating Orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-white/5 to-gray-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-gray-400/10 to-white/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row items-center relative z-10 pt-20'>
        
        {/* Left Content */}
        <motion.div 
          className='w-full md:w-1/2 order-2 md:order-1 mt-12 md:mt-32'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className='space-y-8'>
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className='text-5xl md:text-6xl font-bold leading-tight'>
                <span className="text-white">
                  Discover Your Next
                </span>
                <br />
                <span className='bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent flex items-center gap-3'>
                  Great Read
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Sparkles className="text-gray-300" size={40} />
                  </motion.div>
                </span>
              </h1>
            </motion.div>
        
            {/* Description */}
            <motion.p 
              className='text-xl text-gray-400 leading-relaxed max-w-lg'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Embark on literary adventures with our curated collection of books. 
              From timeless classics to contemporary masterpieces, find your perfect story today.
            </motion.p>

            {/* Email Subscription */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <form onSubmit={handleGetStarted} className="flex flex-col sm:flex-row gap-4 max-w-md">
                <div className="relative flex-1">
                  <input 
                    type="email" 
                    placeholder="Enter your email for book recommendations" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-4 pl-12 bg-gray-900 border border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200 shadow-lg text-white placeholder-gray-400"
                    required 
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <motion.button 
                  type="submit"
                  className="px-8 py-4 bg-white text-black font-semibold rounded-2xl hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                  <ArrowRight size={18} />
                </motion.button>
              </form>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 border border-gray-700 rounded-xl mb-2 shadow-lg">
                    <stat.icon className="text-white" size={20} />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div 
          className="w-full md:w-1/2 order-1 md:order-2 mt-10 md:mt-10 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative">
            {/* Decorative Elements */}
            <motion.div 
              className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl opacity-80 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360] 
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl opacity-60 blur-xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0] 
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            {/* Main Image */}
            <motion.div
              className="relative z-10 bg-gray-900 border border-gray-700 p-4 rounded-3xl shadow-2xl"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5 
              }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={Boook} 
                className='w-full h-80 md:h-96 object-cover rounded-2xl shadow-lg' 
                alt="Stack of books representing our diverse collection"
              />
              
              {/* Floating Badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white text-black px-4 py-2 rounded-full shadow-lg font-semibold text-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 500 }}
                whileHover={{ scale: 1.1 }}
              >
                📚 New Arrivals
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Banner
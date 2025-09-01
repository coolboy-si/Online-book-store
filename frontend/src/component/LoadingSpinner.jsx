import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

function LoadingSpinner({ size = 'medium', text = 'Loading...' }) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Animated Book Icon */}
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={{ 
          rotateY: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg opacity-20 blur-sm"></div>
        <BookOpen className="w-full h-full text-pink-500 relative z-10" />
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="text-gray-600 dark:text-gray-400 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
      </motion.p>

      {/* Loading Dots */}
      <div className="flex gap-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              delay: index * 0.2 
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default LoadingSpinner
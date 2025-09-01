import React, { useEffect, useState } from 'react'
import Cards from './Cards';
import axios from "axios"
import {Link} from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

function Course() {
  const[book,setBook]=useState([])
  const[loading,setLoading]=useState(true)
  
  useEffect(()=>{
    const getbook=async()=>{
      try{
       const res =await axios.get("http://localhost:4001/book")
        console.log(res.data)
        setBook(res.data)
      }catch (error){
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getbook()
  },[])
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading amazing books..." />
      </div>
    )
  }
  
  return (
   <div className='min-h-screen bg-black relative overflow-hidden'>
     {/* Animated Background */}
     <div className="absolute inset-0">
       {/* Grid Pattern */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
       
       {/* Floating Orbs */}
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
       <motion.div 
         className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-white/3 to-gray-600/8 rounded-full blur-3xl"
         animate={{ 
           rotate: [0, 360],
           scale: [1, 1.5, 1]
         }}
         transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
       />
     </div>

     <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 relative z-10'>
       <motion.div 
         className='pt-28 pb-12 items-center justify-center text-center'
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
       >
         {/* Header */}
         <motion.div
           className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-800 to-black border border-gray-700 rounded-2xl mb-6 shadow-2xl"
           initial={{ scale: 0, rotate: -180 }}
           animate={{ scale: 1, rotate: 0 }}
           transition={{ delay: 0.2, type: "spring", damping: 15 }}
         >
           <BookOpen className="text-white" size={32} />
         </motion.div>
         
         <motion.h1 
           className='text-4xl md:text-6xl font-bold mb-6'
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
         >
           <span className="text-white">
             Welcome to Our
           </span>
           <br />
           <span className='bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent flex items-center justify-center gap-3'>
             Book Collection
             <motion.div
               animate={{ rotate: [0, 10, -10, 0] }}
               transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
             >
               <Sparkles className="text-gray-300" size={40} />
             </motion.div>
           </span>
         </motion.h1>
         
         <motion.p 
           className='text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto mb-8'
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
         >
           Discover an amazing collection of books across various genres. From thrilling adventures to 
           educational masterpieces, find your next favorite read in our carefully curated library.
         </motion.p>
         
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
         >
           <Link to="/">
             <motion.button 
               className='inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-3 rounded-2xl hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-700'
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               <ArrowLeft size={18} />
               Back to Home
             </motion.button>
           </Link>
         </motion.div>
       </motion.div>
       
       {/* Books Grid */}
       <motion.div 
         className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20'
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.6, duration: 0.8 }}
       >
         {book.map((item, index) => (
           <motion.div
             key={item.id}
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 * index, duration: 0.5 }}
           >
             <Cards item={item}/>
           </motion.div>
         ))}
       </motion.div>
     </div>
   </div>
  )
}

export default Course

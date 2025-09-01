import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Target, Heart, Star } from 'lucide-react';

function About() {
  const stats = [
    { icon: BookOpen, label: "Books Available", value: "10,000+" },
    { icon: Users, label: "Happy Readers", value: "50,000+" },
    { icon: Award, label: "Awards Won", value: "25+" },
    { icon: Star, label: "5-Star Reviews", value: "15,000+" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      description: "Passionate about connecting readers with amazing stories."
    },
    {
      name: "Michael Chen",
      role: "Head of Curation",
      description: "Expert in discovering hidden literary gems."
    },
    {
      name: "Emily Davis",
      role: "Community Manager",
      description: "Building bridges between authors and readers."
    }
  ];

  return (
    <div className='min-h-screen bg-black'>
      <div className='max-w-6xl container mx-auto px-4 py-20'>
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
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
            <Heart className="text-white" size={32} />
          </motion.div>
          
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
            About BookVerse
          </h1>
          <p className='text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed'>
            We're passionate about connecting readers with extraordinary stories. Our mission is to make 
            quality literature accessible to everyone, everywhere.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          className="grid md:grid-cols-2 gap-12 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center">
                <Target className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              To democratize access to knowledge and stories by providing a platform where readers 
              can discover, purchase, and enjoy books from around the world. We believe every story 
              deserves to be told and every reader deserves to find their perfect book.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center">
                <BookOpen className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Vision</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              To become the world's most trusted and beloved online bookstore, fostering a global 
              community of readers and supporting authors in sharing their creativity with the world. 
              We envision a future where great literature knows no boundaries.
            </p>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center bg-gray-900 border border-gray-700 rounded-2xl p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 border border-gray-700 rounded-xl mb-4">
                <stat.icon className="text-white" size={20} />
              </div>
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Section */}
        <motion.div 
          className="bg-gray-900 border border-gray-700 rounded-2xl p-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-white mb-6 text-center">Our Story</h3>
          <div className="max-w-4xl mx-auto text-gray-400 leading-relaxed space-y-4">
            <p>
              BookVerse was born from a simple idea: everyone deserves access to great books. Founded in 2020 
              by a team of book lovers and technology enthusiasts, we started with a mission to bridge the gap 
              between readers and the stories they love.
            </p>
            <p>
              What began as a small online bookstore has grown into a thriving community of over 50,000 readers 
              worldwide. We've carefully curated our collection to include everything from timeless classics to 
              contemporary bestsellers, ensuring there's something for every reader.
            </p>
            <p>
              Today, we're proud to offer not just books, but a complete reading experience. From personalized 
              recommendations to our vibrant reader community, we're committed to making your literary journey 
              as enriching as possible.
            </p>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h3 className="text-3xl font-bold text-white mb-12 text-center">Meet Our Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-gray-900 border border-gray-700 rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-20 h-20 bg-gray-800 border border-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="text-white" size={32} />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                <p className="text-gray-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
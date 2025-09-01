// src\component\navbar.jsx
import React, { useEffect, useState } from 'react'
import Login from './Login';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sun, Moon, Menu, X, BookOpen, LogIn, Sparkles, LogOut, User, Plus } from 'lucide-react';
import { useAuth } from '../context/Authprovidor';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Navbar() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;
  const [authUser, setAuthUser, isLoading] = useAuth();
  
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const [sticky, setSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [books, setBooks] = useState([]);
  
  const handleLogout = () => {
    try {
      setAuthUser(null);
      localStorage.removeItem("user");
      toast.success("Logged out successfully!");
      setIsMobileMenuOpen(false);
    } catch (error) {
      toast.error("Logout failed!");
    }
  };
  
  // Fetch books data
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:4001/book');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      const filtered = books.filter(book => 
        book.name.toLowerCase().includes(query.toLowerCase()) ||
        book.category.toLowerCase().includes(query.toLowerCase()) ||
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5)); // Show max 5 results
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(false);
      toast.success(`Found ${searchResults.length} results for: ${searchQuery}`);
    }
  };

  const handleSearchResultClick = (book) => {
    setSearchQuery('');
    setShowSearchResults(false);
    toast.success(`Selected: ${book.name}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/course' },
    { name: 'Contact', href: '/contact' },
    { name: 'About', href: '/about' }
  ];

  return (
    <>
      <motion.div 
        className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          sticky 
            ? "bg-black/90 backdrop-blur-xl shadow-lg border-b border-gray-800/50" 
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="navbar py-4">
          {/* Logo */}
          <div className="navbar-start">
            <Link to="/">
              <motion.div 
                className="flex items-center gap-3 text-2xl font-bold text-white cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
              <motion.div
                className="p-2 bg-gray-800 border border-gray-700 rounded-xl shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <BookOpen className="text-white" size={24} />
              </motion.div>
              Book Store
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.li key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={item.href}
                    className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right Side Actions */}
          <div className="navbar-end flex items-center space-x-4">
            {/* Search Bar */}
            <motion.div 
              className='hidden md:block relative'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative">
                <form onSubmit={handleSearch} className="flex">
                  <input 
                    type="text" 
                    placeholder="Search books..." 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => searchQuery && setShowSearchResults(true)}
                    onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                    className="w-64 px-4 py-2 pl-10 bg-gray-900 border border-gray-700 rounded-full outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200 text-sm text-white placeholder-gray-400"
                  />
                </form>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                
                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {showSearchResults && searchResults.length > 0 && (
                    <motion.div
                      className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {searchResults.map((book, index) => (
                        <motion.div
                          key={book._id}
                          className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-b-0"
                          onClick={() => handleSearchResultClick(book)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="w-10 h-12 bg-gray-800 rounded flex items-center justify-center">
                            <BookOpen size={16} className="text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white text-sm font-medium">{book.name}</h4>
                            <p className="text-gray-400 text-xs">{book.category}</p>
                          </div>
                          <span className="text-white text-sm font-semibold">${book.price}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Theme Toggle */}
            <motion.button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {theme === "light" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="text-yellow-500" size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="text-blue-400" size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Login/Logout Button */}
            {authUser ? (
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 text-white">
                  <User size={16} />
                  <span className="text-sm">{authUser.fullname}</span>
                </div>
                <Link to="/add-book">
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={16} />
                    Add Book
                  </motion.button>
                </Link>
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut size={16} />
                  Logout
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={() => document.getElementById("my_modal_3").showModal()}
                className="hidden md:flex items-center gap-2 px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn size={16} />
                Sign In
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              className="absolute top-0 right-0 w-80 h-full bg-black border-l border-gray-800 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-6 pt-20">
                {/* Search Bar Mobile */}
                <div className="mb-8">
                  <div className="relative">
                    <form onSubmit={handleSearch} className="flex">
                      <input 
                        type="text" 
                        placeholder="Search books..." 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => searchQuery && setShowSearchResults(true)}
                        onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                        className="w-full px-4 py-3 pl-10 bg-gray-900 border border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                      />
                    </form>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    
                    {/* Mobile Search Results */}
                    <AnimatePresence>
                      {showSearchResults && searchResults.length > 0 && (
                        <motion.div
                          className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {searchResults.map((book, index) => (
                            <motion.div
                              key={book._id}
                              className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-b-0"
                              onClick={() => handleSearchResultClick(book)}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <div className="w-10 h-12 bg-gray-800 rounded flex items-center justify-center">
                                <BookOpen size={16} className="text-gray-400" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white text-sm font-medium">{book.name}</h4>
                                <p className="text-gray-400 text-xs">{book.category}</p>
                              </div>
                              <span className="text-white text-sm font-semibold">${book.price}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-4 mb-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl transition-all duration-200 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Sparkles size={18} className="text-white" />
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Login/Logout Button Mobile */}
                {authUser ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-xl">
                      <User size={18} className="text-white" />
                      <span className="text-white font-medium">{authUser.fullname}</span>
                    </div>
                    <Link to="/add-book" onClick={() => setIsMobileMenuOpen(false)}>
                      <motion.button
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Plus size={18} />
                        Add Book
                      </motion.button>
                    </Link>
                    <motion.button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <LogOut size={18} />
                      Logout
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    onClick={() => {
                      document.getElementById("my_modal_3").showModal();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <LogIn size={18} />
                    Sign In
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Login/>
    </>
  )
}

export default Navbar
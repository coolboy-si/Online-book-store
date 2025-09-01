import Home from './Home/home';
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Signup from './component/signup';
import Courses from './courses/Courses';
import Contact from './component/Contact';
import About from './component/About';
import PaymentPage from './component/PaymentPage';
import BookDetail from './component/BookDetail';
import AddBook from './component/AddBook';
import PageLoader from './component/PageLoader';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/Authprovidor';
import { useState, useEffect } from 'react';

function App() {
  const [authUser, setAuthUser, isLoading] = useAuth();
  const [pageLoading, setPageLoading] = useState(false);
  const location = useLocation();
  console.log(authUser);

  // Handle page transitions
  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Show page loader during transitions
  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className='dark:bg-slate-900 dark:text-white'>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={authUser ? <Courses /> : <Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/book-detail" element={<BookDetail />} />
          <Route path="/add-book" element={authUser ? <AddBook /> : <Navigate to="/signup" />} />
        </Routes>
      </div>
    </>
  )
}

export default App;

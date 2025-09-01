import React from 'react'
import Navbar from '../component/navbar';
import Course from '../component/Course';
import Footer from '../component/footer';
function Courses() {
  return (
  <>

    <Navbar/>
    <div className='min-h-screen flex flex-col flex-grow'>
     <Course/>
    </div>
    <Footer/>
  
  </>
  );
}

export default Courses;

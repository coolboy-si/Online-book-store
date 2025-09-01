import React from 'react'
import Navbar from '../component/navbar'
import Banner from '../component/banner'
import Freebook from '../component/freebook'
import Footer from '../component/footer'

function home() {
  return (
   <>
   <div>
    <Navbar />
   <Banner/>
   <Freebook/>
   <Footer/>
   </div>
   </>
  )
}

export default home

import React, { useEffect, useState } from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from "./Cards";
import axios from "axios";

function freebook() {

  const[book,setBook]=useState([])
  useEffect(()=>{
    const getbook=async()=>{
      try{
       const res =await axios.get("http://localhost:4001/book")
        console.log(res.data)
        setBook(res.data.filter((data) =>data.category ==="free"))
      }catch (error){
        console.log(error)

      }
    }
    getbook()
  },[])

   var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
   <>
   <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
   <div>
     <h1 className='font-semibold text-xl scroll my-5'>free offered course
    </h1>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod quisquam pariatur id aspernatur a unde, qui perferendis maiores amet quibusdam perspiciatis consequuntur blanditiis quia deleniti error quis!</p>
   
   </div>

    <div>
      <Slider {...settings}>
       {book.map((item)=>(
        <Cards item={item} key={item.id}/>
       ))}
      </Slider>
      </div>
      </div>   
   </>
  )
}

export default freebook

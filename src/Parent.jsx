import React from 'react'
import List from './Data'
import video from './photos/video2.mp4';
export const Parent = () => {
  return (
    <>
    

    <div className='bg-transparent'> 
       
    <div id="test" className="bg-transparent flex justify-around items-center relative z-10">
  <div id="firstdiv" className="w-400 bg-transparent">
    {/* Content on left here */} left
  </div>
        <div className="flex">
          <List />
         
        </div>
        <video id="video" className=" h-full fixed  left-0" autoPlay loop muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>
    </div>
    </>
  )
}

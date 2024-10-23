import React from 'react'
import video from '../assets/AdobeStock.mov'

const HeroSection = () => {
    return (
        <>
            <div className='flex flex-col items-center mt-6 lg:mt-20'>
                <h1 className='text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide'>
                    Seamlessly extract text from images using our <span className='px-3 py-2 bg-gradient-to-r from-blue-300 to-blue-600 text-transparent bg-clip-text'>{" "}OCR tool</span>
                </h1>
            </div>
            <div className="flex justify-center my-10">
                <a href="/upload" className='bg-gradient-to-r from-blue-500 to-blue-800 py-3 px-4 mx-3 rounded-md text-white font-semibold'>Get Started</a>
            </div>
            <div className="flex mt-10 justify-center">
                <video 
                  autoPlay
                  loop
                  muted
                  className='rounded-lg w-1/2 border boorder-blue-700 shadow-blue-400 mx-2 my-4'
                >
                 <source src={video} type='video/mp4'/>
                </video>
            </div>
        </>
    )
}

export default HeroSection
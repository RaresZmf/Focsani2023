import React from 'react';
import Lottie from "lottie-react";
import Ld from './animations/Loader.json'

const Loading = () => (
  <div className="flex flex-row justify-center content-center absolute items-center h-screen w-screen" data-testid="loading">
    <div className='max-w-md md:flex hidden'><Lottie animationData={Ld} loop={true} /></div>
    <div className='max-w-sm md:hidden flex'><Lottie animationData={Ld} loop={true} /></div>
  </div>
);

export default Loading;

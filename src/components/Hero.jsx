import React from 'react';
import { assetss } from '../assets/frontend_assets/assetss';

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Hero Left side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141] flex flex-col gap-4 px-6'>
          {/* Bestseller line */}
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>

          {/* Main heading */}
          <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>

          {/* SHOP NOW section */}
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>
        {/* Hero Right side */}
        <img className='w-full sm:w-1/2'  src={assetss.hero_img}/>
    </div>
  );
};

export default Hero;

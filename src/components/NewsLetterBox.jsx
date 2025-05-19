import React from 'react'

const NewsLetterBox = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <div className='text-center py-8'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
           Lorem ipsum is simply dummy text of the printing and typesetting industry. 
        </p>
        
        <form  className='mt-5 flex items-center  sm:w-1/2 mx-auto my-6 border pl-3'  onSubmit={handleSubmit}>
            <input className="w-full sm:flex-1 outline-none border-black"  type="email"   placeholder='Enter Your Email' />
            <button className='bg-black text-white px-4 py-2 sm:ml-2 sm:mt-0' type='submit' >Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetterBox
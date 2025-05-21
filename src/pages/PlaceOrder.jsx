import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assetss } from '../assets/frontend_assets/assetss'
import CartTotal from './../components/CartTotal';

const PlaceOrder = () => {
  const{navigate } = useContext(ShopContext)
  const [method, setMethod] = React.useState("cod onClick={()=>setMethod()}");


  return (
    <div className="flex flex-col  sm:flex-row  justify-between  gap-4 pt-5 sm:pt-15 min-h-[80vh] border-t ">
      {/* Left SIde */}
      <div className="flex flex-col gap-4  w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"}></Title>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="ZipCode"
            className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
          />
        </div>
        <input
          type="number"
          placeholder="Phone"
          className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
            <CartTotal/>
        </div>

        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"}></Title>
              {/* Payment Method Selection*/ }
           <div className='flex gap-2 flex-col lg:flex-row'>
              <div onClick={()=>setMethod('stript')} className='flex items-center gap-3 border p-1 px-3 cursor pointer'>
                 <p className={`min-w-3.5 h-3.5  rounded-full ${method ==='stript' ? 'bg-green-400' :'' } `}></p>
                  <img src={assetss.stripe_logo} alt="card" className='h-5 mx-4' />
              </div>
                <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border  p-1 px-3 cursor pointer'>
                 <p className={`min-w-3.5 h-3.5  rounded-full ${method ==='razorpay' ? 'bg-green-400' :'' }  `}></p>
                  <img src={assetss.razorpay_logo} alt="card" className='h-5 mx-4' />
              </div>
                <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-1 px-3 cursor pointer'>
                 <p className={`min-w-3.5 h-3.5  rounded-full } ${method ==='cod' ? 'bg-green-400' :'' }   `}></p>
                 <p className='text-gray-500 text-sm font-medium m-4 '>CASH ON DELIVERY</p>
              </div>
           </div>
           
              <div className='w-full flex justify-end mt-8 '>
                <button onClick={()=>navigate("/orders")} className='bg-black text-white px-16 py-3 text-sm '>PLACE ORDER</button>

              </div>

        </div>
      </div>
    </div>
  );
}

export default PlaceOrder
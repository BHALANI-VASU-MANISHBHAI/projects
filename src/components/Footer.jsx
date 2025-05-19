import React from 'react'
import { assetss } from '../assets/frontend_assets/assetss'

const Footer = () => {
  return (
    <div>
        {/* anathi small ane moto screen ma display grid hase ane grid ma display hase atle 3:1:1 ratio ma display hase
        //pan small thi pan nana screen ma display flex hase atle responcive thase */}
        <div className='flex flex-col sm:grid  grid-cols-[3fr_1fr_1fr]  gap-14 my-10 text-sm'>
            <div>
                <img src={assetss.logo}  className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Private policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>CONTACT</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 1234567890</li>
                    <li>contact@thomas.com</li>
                    </ul>
            </div>
        </div>
        <div>
            <hr />
                <p className='text-center text-gray-600 mt-5 mb-5'>Copyright © 2023. All rights reserved.</p>
            </div>
    </div>
  )
}

export default Footer
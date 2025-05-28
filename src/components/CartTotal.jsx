import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import { get } from 'lodash';


const CartTotal = () => {
    const {currency , delivery_fee,getCartAmount,getCartCount} = useContext(ShopContext);
  return (
    <div className='w-full'>
        <div className='text-2xl '>
            <Title text1={"CART"} text2={"TOTAL"}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency} {getCartAmount()}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Fee</p>

                { getCartCount() === 0 ? <p>0</p> :
                    <p>{currency} {delivery_fee}</p>}
            </div>
            <hr />
            <div className='flex justify-between'>
                <b className='font-semibold'>Total</b>
                <b className='font-semibold'>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() +delivery_fee}</b>
            </div>
        </div>

    </div>
  )
}

export default CartTotal
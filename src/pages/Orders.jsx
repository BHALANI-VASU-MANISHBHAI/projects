import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'


const Orders = () => {
  const {products , currency } = useContext(ShopContext)


  return (
    <div className="border-t pt-16">
      <div className="text-2xl  ">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-black flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />

              <div className="flex-1">
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency} {item.price}
                  </p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className="mt-2">
                  Date: <span className="text-gray">25, Jul, 2024</span>
                </p>
              </div>

              {/* This column stays fixed width and aligns vertically with others */}
              <div className="w-40 flex items-center gap-2 self-start sm:self-center">
                <p className="w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">Ready to ship</p>
              </div>

              <button className='border py-4 px-2 text-sm font-medium rounded-sm'>Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders
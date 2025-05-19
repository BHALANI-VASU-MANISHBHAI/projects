import React, { use } from 'react'
import{ useContext } from 'react'
import { useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
const LatestCollection = () => {
    const {products } = useContext(ShopContext);
    // console.log(products);
    const [latestProducts, setLatestProducts] = React.useState([]);

    useEffect(() => {
      setLatestProducts(products.slice(0, 10));
    }, []);
    // console.log(products);
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
           <Title text1="Latest" text2="Collection"/>
           <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, dignissimos sequi. Officia non vero dolorem minima neque adipisci natus laborum quasi et molestiae, saepe voluptate repellat veritatis odio eius sit
           </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6'>
        {latestProducts.map((item, index) => (
            <ProductItem key={index} id={item.id} image={item.image} name={item.name} price={item.price} />
        ))}
        </div>
    </div>
  )
}

export default LatestCollection
import { useContext, useEffect, useState } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';
import { ProductContext } from "../context/ProductContext.jsx";
import ShimmerCard from './ShimmerCard'; // You must create this component

const BestSeller = () => {
  const { products } = useContext(ProductContext);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
    const bestProducts = products.filter(item => item.bestseller === true);
    console.log("Best Seller Products:", bestProducts);
    const countToShow = Math.max(4, Math.min(6, bestProducts.length));
    setBestSellerProducts(bestProducts.slice(0, countToShow));
    setLoading(false);
    },500);
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="Best" text2="Seller" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our most-loved fashion picks — the perfect blend of comfort, style, and quality. From everyday essentials to trend-setting designs, shop the pieces everyone’s talking about.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6 px-4'>
        {loading
          ? Array(6).fill().map((_, idx) => ( <ShimmerCard key={idx} /> )) // Use ShimmerCard for loading state
          : bestSellerProducts.map((item, index) => (
              <ProductItem
                key={item._id || index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))
        }
      </div>
    </div>
  );
};

export default BestSeller;

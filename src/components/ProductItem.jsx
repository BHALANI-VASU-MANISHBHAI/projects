import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  console.log("ProductItem", id, image, name, price, currency);
  return (
<Link to={`/product/${id}`} prefetch="intent" className="text-gray-700 cursor-pointer">
        {/* ovelow hidden because image go outside in zoom */}
      <div className="overflow-hidden">
        <img
          src={image[0]}
          className="hover:scale-110 transition ease-in-out"
          alt={name}
          loading="lazy"
          width="100%"
          height="auto"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency} {price}
      </p>
    </Link>
  );
};

export default ProductItem;

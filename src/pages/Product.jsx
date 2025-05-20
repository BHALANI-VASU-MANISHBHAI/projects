import React, { use } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assetss } from "../assets/frontend_assets/assetss";
const Product = () => {
  const { id } = useParams();
  console.log("ProductId", id);
  const { products ,currency} = useContext(ShopContext);
  const [productData, setProductData] = React.useState(false);
  const [image, setImage] = React.useState("");
  const fetchProductData = () => {
    const product = products.find((item) => item._id === id);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    } else {
      setProductData(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id, products]);

  return productData ? (
    <div className=" border-t-2 pt-19 transition-opacity ease-in duration-500 opacity-100">
      {/*--------------------------------Product Data--------------------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*--------------------------------------Product Image--------------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-center sm:justify-normal sm:w-[18.7%] w-full sm:mb-3 flex-shrink-0  cursor-pointer">
            {productData.image.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                className="flex w-[24%] sm:w-full flex-shrink-0 sm:mb-3  cursor-pointer"
                src={item}
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] ">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/*--------------------Product Details--------------- */}

        <div className="flex-1 ">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assetss.star_icon} alt="" className="w-3 5" />
            <img src={assetss.star_icon} alt="" className="w-3 5" />
            <img src={assetss.star_icon} alt="" className="w-3 5" />
            <img src={assetss.star_icon} alt="" className="w-3 5" />
            <img src={assetss.star_dull_icon} alt="" className="w-3 5" />
            <p className="p1-2">(122)</p>
          </div>
           <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
           <p className="text-sm text-gray-500 mt-5 md:w-4/5">{productData.description}</p>
        </div>

        
       
      </div>
    </div>
  ) : (
    <div className="opacity-0 "></div>
  );
};

export default Product;

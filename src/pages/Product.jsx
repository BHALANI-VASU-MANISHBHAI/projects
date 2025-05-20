import React, { use } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assetss } from "../assets/frontend_assets/assetss";
import ReletedProducts from "../components/ReletedProducts";
import Title from "../components/Title";

const Product = () => {
  const { id } = useParams();
  
  const { products, currency ,addToCart} = useContext(ShopContext);

  const [productData, setProductData] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [Size, setSizes] = React.useState("");
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
          <div className="flex thumbnails  sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-center sm:justify-normal sm:w-[18.7%] w-full sm:mb-3 flex-shrink-0  cursor-pointer">
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
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="text-sm text-gray-500 mt-5 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            {/*--------------------Product Details SIZE--------------- */}
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSizes(item)}
                  className={`border pt-2 pb-2 px-4 bg-gray-100 text-center ${
                    item == Size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
            {/*--------------------Product Details SIZE end--------------- */}
            <button onClick={()=>addToCart(productData._id,Size)} className="bg-black text-white py-2 px-4 w-[33%] active:bg-gray-700 text-SM">
              ADD TO CART
            </button>
            <hr className="mt-8 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Orignal Product</p>
              <p>Cash On delivary is available on this product</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      </div>
      {/* ------------Description and Review Section ----------- */}
        <div className="mt-20">
          <div className="flex">
            <b className="border border-gray-300  px-5 py-3 text-sm">Description</b>
            <p className="border   border-gray-300  px-5 py-3 text-sm">Reviews(122)</p>
          </div>  
          <div className="flex flex-col gap-4 border  border-gray-400  ">
              <p className="mx-2 my-2"> an e-commarce website is a website that allows customers to buy and sell producs-to-consumer), B2B (business-to-business), or C2C (consumer-to-consumer) platforms. They can also offer various payment options, including credit cards, digital wallets, and cash on delivery. E-commerce websites are designed to provide a seamless shopping experience for customers, allowing them to browse products, compare prices, and make purchases from the comfort of their own homes.
              </p>
              <p className="mx-2 my-2">an e-commarce website is a website that allows customers to buy and sell 
              </p>
          </div>
        </div>
      {/* ------------Description and Review Section end ----------- */}
      {/* ------------display related products ----------- */}
        <ReletedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0 "></div>
  );
};

export default Product;

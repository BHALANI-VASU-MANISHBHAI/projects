  import React, { useEffect, useContext, useState } from "react";
  import { useParams } from "react-router-dom";
  import { ShopContext } from "../context/ShopContext";
  import { assetss } from "../assets/frontend_assets/assetss";
  import ReletedProducts from "../components/ReletedProducts";
  import Title from "../components/Title";
  import axios from "axios";
  import { toast } from "react-toastify";
  import Rating from "@mui/material/Rating";
  import ReviewCard from "../components/ReviewCard";

  const Product = () => {
    const { id } = useParams();
    const { products, currency, addToCart, backendUrl, token } = useContext(ShopContext);

    const [productData, setProductData] = useState(false);
    const [userData, setUserData] = useState({});
    const [image, setImage] = useState("");
    const [Size, setSizes] = useState("");
    const [Reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const [activeTab, setActiveTab] = useState("description"); // ⬅️ NEW: Tab state

    const fetchProductData = () => {
      const product = products.find((item) => item._id === id);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      } else {
        setProductData(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/review/get/${id}`);
        if (response.data.success) {
          setReviews(response.data.reviews);
          const ratings = response.data.reviews.map((r) => r.rating);
          const sum = ratings.reduce((acc, val) => acc + val, 0);
          const avg = ratings.length > 0 ? sum / ratings.length : 5;
          setAvgRating(avg);
        } else {
          setReviews([]);
          setAvgRating(0);
        }
      } catch (error) {
        toast.error("Failed to load reviews. Please try again later.");
      }
    };

    const addReview = async (rating, comment) => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/review/add`,
          {
            productId: id,
            userId: userData._id,
            rating,
            comment,
          },
          {
            headers: { token },
          }
        );
        if (response.data.success) {
          toast.success("Review added successfully");
          fetchReviews();
        } else {
          toast.error("Failed to add review.");
        }
      } catch (e) {
        toast.error("Failed to add review. Please try again later.");
      }
    };

    useEffect(() => {
      fetchProductData();
      fetchReviews();
    }, [id, products]);

    return productData ? (
      <div className="border-t-2 pt-19 transition-opacity ease-in duration-500 opacity-100">
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          {/* Images */}
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex thumbnails sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-center sm:w-[18.7%] w-full flex-shrink-0 cursor-pointer">
              {productData.image.map((item, index) => (
                <img
                  key={index}
                  onClick={() => setImage(item)}
                  className="flex w-[24%] sm:w-full flex-shrink-0 sm:mb-3 cursor-pointer"
                  src={item}
                  alt=""
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <img className="w-full h-auto" src={image} alt="" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <Rating name="read-only" value={avgRating} precision={0.5} readOnly />
              <p className="pl-2">({avgRating.toFixed(1)})</p>
            </div>
            <p className="mt-5 text-3xl font-medium">
              {currency}
              {productData.price}
            </p>
            <p className="text-sm text-gray-500 mt-5 md:w-4/5">{productData.description}</p>
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSizes(item)}
                    className={`border pt-2 pb-2 px-4 bg-gray-100 text-center ${
                      item === Size ? "border-orange-500" : ""
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <button
                onClick={() => addToCart(productData._id, Size)}
                className="bg-black text-white py-2 px-4 w-[33%] active:bg-gray-700 text-sm"
              >
                ADD TO CART
              </button>
              <hr className="mt-8 sm:w-4/5" />
              <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p>100% Original Product</p>
                <p>Cash On Delivery available</p>
                <p>Easy return and exchange within 7 days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Reviews Tabs */}
        <div className="mt-20 max-w-4xl px-4">
          <div className="flex border border-gray-300 rounded-t-lg overflow-hidden">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-6 py-3 text-sm font-semibold border-r border-gray-300 ${
                activeTab === "description"
                  ? "bg-gray-100"
                  : "text-gray-600 hover:text-black hover:bg-gray-100"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-3 text-sm font-semibold ${
                activeTab === "reviews"
                  ? "bg-gray-100"
                  : "text-gray-600 hover:text-black hover:bg-gray-100"
              }`}
            >
              Reviews ({Reviews.length})
            </button>
          </div>

          {/* Description Panel */}
          {activeTab === "description" && (
            <div className="border border-t-0 border-gray-300 rounded-b-lg shadow-md p-6 bg-white space-y-4 text-gray-700 text-sm leading-relaxed">
              <p>
                An e-commerce website is a platform that allows customers to buy and sell
                products in various models like B2C, B2B, or C2C. These platforms support
                multiple payment options including credit cards, digital wallets, and cash on
                delivery.
              </p>
              <p>
                In short, an e-commerce website provides customers with the tools and
                experience needed to shop online efficiently and securely.
              </p>
            </div>
          )}

          {/* Reviews Panel */}
        {activeTab === "reviews" && (
  <div className="mt-10">
    <div className="text-2xl text-center mb-6">
      <Title className="text-lg" text1={"Customer"} text2={"Reviews"} />
    </div>

    {/* Review Form */}
    {token ? (
      <div className="max-w-xl mx-auto mb-10">
        <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
        <div className="flex flex-col gap-3">
          <Rating
            name="user-rating"
            value={userData.userRating || 0}
            onChange={(event, newValue) =>
              setUserData((prev) => ({ ...prev, userRating: newValue }))
            }
          />
          <textarea
            className="border border-gray-300 p-2 rounded w-full text-sm"
            rows="4"
            placeholder="Write your review..."
            value={userData.comment || ""}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, comment: e.target.value }))
            }
          />
          <button
            onClick={() => {
              if (!userData.userRating || !userData.comment) {
                toast.error("Please provide both rating and comment.");
              } else {
                addReview(userData.userRating, userData.comment);
                setUserData({ userRating: 0, comment: "" });
              }
            }}
           className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"          >
            Submit Review
          </button>
        </div>
      </div>
    ) : (
      <p className="text-center text-gray-600">Please log in to leave a review.</p>
    )}

    {/* Review List */}
    <div className="space-y-4">
      {Reviews.length > 0 ? (
        Reviews.map((review, index) => <ReviewCard key={index} review={review} />)
      ) : (
        <p className="text-center text-gray-500">No reviews yet.</p>
      )}
    </div>
  </div>
)}

        </div>

        {/* Related Products */}
        <ReletedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    ) : (
      <div className="opacity-0"></div>
    );
  };

  export default Product;

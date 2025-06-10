import  { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import ReletedProducts from "../components/ReletedProducts";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";
import Rating from "@mui/material/Rating";
import ReviewCard from "../components/ReviewCard";
import StarLine from "../components/StarLine";
import { assetss } from "../assets/frontend_assets/assetss";
import { GlobalContext } from "../context/GlobalContext.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { ProductContext } from "../context/ProductContext.jsx";


const Product = () => {
  //  products, currency, addToCart, backendUrl, token, userData 
  const { id } = useParams();
  const {products} = useContext(ProductContext);
  const {addToCart} = useContext(CartContext);
  const{userData} = useContext(UserContext);
  const { backendUrl, token, currency } = useContext(GlobalContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [Size, setSizes] = useState("");
  const [Reviews, setReviews] = useState([]);
  const [Ratings, setRatings] = useState();
  const [avgRating, setAvgRating] = useState(0);
  const [addComment ,setaddComment] = useState("");
  const[showAddReview, setShowAddReview] = useState(false);
  const [addRating , setAddRating] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  // Fetch product details from local products state
  const fetchProductData = () => {
    const product = products.find((item) => item._id === id);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    } else {
      setProductData(null);
    }
  };

  // Fetch reviews from backend API
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/review/get/${id}`);
      if (response.data.success) {
        setReviews(response.data.reviews);
 
        const ratings = response.data.reviews.map((r) => r.rating);
        setRatings(ratings);
        const sum = ratings.reduce((acc, val) => acc + val, 0);
        const avg = ratings.length > 0 ? sum / ratings.length : 5;
        setAvgRating(avg);
      } else {
        setReviews([]);
        setAvgRating(0);
      }
    } catch (error) {
      console.log("Error fetching reviews:", error);
    }
  };

  const EditReview = async (reviewId, rating, comment) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/review/update`,
        {
          reviewId,
          rating,
          comment,
        },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        fetchReviews();
      } else {
        toast.error("Failed to edit review.");
      }
    } catch (e) {
      console.log("Error editing review:", e);
      toast.error("Failed to edit review. Please try again later.");
    }
  };

  const CountRating = (rating) => {
    let count = 0;
    for (let i = 0; i < Reviews.length; i++) {
      if (Reviews[i].rating === rating) {
        count++;
      }
    }
    return count;
  };

  const AddReview = async () => {
    try{

      const response = await axios.post(
        `${backendUrl}/api/review/add`,
        {
          productId: id,
          rating: addRating,
          comment: addComment,
        },
        {
          headers: { token },
        }
      );
 

    if (response.data.success) {
      setShowAddReview(false);
      setAddRating(0);
      setaddComment("");
      fetchReviews();
    } else {
      toast.error(response.data.message || "Failed to add review.");
      
    }
    }catch (error) {
     console.log("Error adding review:", error);
      toast.error("Failed to add review. Please try again later.");
    }

  }

  useEffect(() => {
    fetchProductData();
  }, [id, products]);

  useEffect(() => {
    fetchReviews();
  }, [id, , Reviews.length]);

  if (!productData) return <div className="opacity-0">Loading...</div>;

  return (
    <div className="border-t-2 pt-19 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex thumbnails sm:flex-col overflow-x-auto sm:overflow-y-scroll   sm:w-[18.7%] w-full flex-shrink-0 cursor-pointer">
            {productData.image.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                className="flex w-[24%] sm:w-full flex-shrink-0 sm:mb-3 cursor-pointer"
                src={item}
                alt={`${productData.name} thumbnail ${index + 1}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt={productData.name} />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <Rating
              name="read-only"
              value={avgRating}
              precision={0.5}
              readOnly
            />
            <p className="pl-2">({avgRating.toFixed(1)})</p>
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
             {productData.description}
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
              <div className="max-w-2xl  mb-10 ">
                <div className=" ml-0 flex gap-4 md:mb-10 md:ml-8  sm:mb-7 flex-row ">
                  <h2>Reviews</h2>
                  <Rating
                    name="half-rating-read"
                    value={avgRating}
                    precision={1}
                    readOnly
                  />
                  <p>({avgRating.toFixed(1)})</p>
                  <p className="">  <span className="font-bold "> {Reviews.length}</span>  <span className="text-gray-800"> Reviews</span></p>
                </div>
                {/* Average Rating and Add Review Button */}
                <div className="flex  gap-4  flex-col md:flex-row mb-6 mt-4">
                  <div className="md:flex flex-col gap-4 w-1/4 items-center justify-center  hidden ">
                    <p className="text-xl "> {avgRating.toFixed(1)} OUT of 5</p>
                    <button
                      onClick={() => setShowAddReview(true)}
                      className="bg-blue-600 py-2 rounded-xl w-[65%]"
                    >
                      Add Review
                    </button>
                  </div>
                  <div>
                    {[5,4,3,2,1].map((rating) => (
                      <StarLine
                        key={rating}
                        LineNo={rating}
                        totalReviews={Reviews.length}
                        RatingCount={CountRating(rating)}
                      />
                    ))}
                  </div>
                  <button 
                      onClick={ () => setShowAddReview(true)}
                      className="bg-blue-600 py-2 rounded-xl md:w-[35%] sm:w-[30%] w-[50%]  md:hidden  text-white text-sm hover:bg-blue-700 "
                    >
                      Add Review
                    </button>
                </div>
                {/*Show Reviews */}
                {Reviews.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    userData={userData}
                    EditReviewFun={EditReview}
                  />
                ))}

                <div>
                  <div className="h-[1px] w-full bg-gray-200 rounded-full"></div>
                </div>
                {/* Add Review Form */}
                {showAddReview && (
                  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="flex flex-col gap-4 mt-6 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 w-[90%] sm:w-[450px]">
                      <div className="flex flex-col gap-2 mb-2 border-b-2 border-gray-200 pb-4">
                        <div className="flex items-center justify-between gap-2">
                          <p>Add a review for:</p>
                          <img
                            onClick={() => setShowAddReview(false)}
                            className="w-4 h-4 cursor-pointer"
                            src={assetss.cross_icon}
                            alt="Close"
                          />
                        </div>
                        <h2 className="text-lg font-semibold">
                          {productData.name}
                        </h2>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <Rating
                          name="user-rating"
                          value={addRating}
                          precision={1}
                          onChange={(event, newValue) => {
                            setAddRating(newValue);
                          }}
                        />
                        <p className="text-gray-500">({addRating} Out of 5)</p>
                      </div>

                      <textarea
                        className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your review here..."
                        onChange={(e) => setaddComment(e.target.value)}
                      ></textarea>

                      <div className="flex gap-4 mt-4 justify-between">
                        <button  onClick={()=>AddReview()}    className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 w-[48%]">
                          Submit Review
                        </button>
                        <button
                          onClick={() => setShowAddReview(false)}
                          className="bg-gray-300 hover:bg-gray-600 hover:text-white px-4 py-2 rounded-md w-[48%]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                Please log in to leave a review.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Related Products */}
      <ReletedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;

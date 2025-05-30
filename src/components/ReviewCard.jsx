import React, { useState, useContext } from "react";
import Rating from "@mui/material/Rating";
import { assetss } from "../assets/frontend_assets/assetss.js";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { set } from "lodash";

const ReviewCard = ({ review, onEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(review.comment);
  const [editedRating, setEditedRating] = useState(review.rating);

  const { backendUrl, token,userData  } = useContext(ShopContext);

  const isOwner = userData._id === review.userId._id;

  const handleSave = async () => {

    try {
      const responce = await axios.put(
        backendUrl + `/api/review/update/${review._id}`,
        {
          rating: editedRating,
          comment: editedComment,
        },
        {
          headers: {
            token: token,
          }
        }
      );

      if (responce.data.success) {
        setEditMode(false);       
      }else{
        toast.error("Failed to update review. Please try again.");

      }
    } catch (error) {
      toast.error("Failed to update review. Please try again.");
    }
  };

  return (
    <div className="bg-[#fefefe] shadow-md border border-gray-200 rounded-xl p-6 mb-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-start gap-4 mb-2">
        <img
          src={assetss.profile_icon}
          alt="User"
          className="w-12 h-12 rounded-full border border-gray-300"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <span className="font-semibold text-gray-800 text-sm ml-1">
              {review.userId.name}
            </span>
            <span className="text-gray-500 text-xs">
              {review.userId.email || "Customer"}
            </span>
           {isOwner&& <img
              src={assetss.edit_icon}
              alt="Edit"
              className="w-5 cursor-pointer"
              onClick={() => setEditMode(!editMode)}
            />
           }
          </div>

          {/* Rating */}
          {editMode ? (
            <Rating
              name="user-rating"
              value={editedRating}
              onChange={(e, newValue) => setEditedRating(newValue)}
              className="mt-1"
            />
          ) : (
            <Rating name="user-rating" value={review.rating} readOnly  className="mt-1" />
          )}
        </div>
      </div>

      {/* Comment */}
      {editMode ? (
        <div className="mt-2">
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="w-full border rounded-md p-2 text-sm"
          />
          <button
            onClick={handleSave}
            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-md text-sm"
          >
            Save
          </button>
        </div>
      ) : (
        <p className="text-gray-700 text-sm leading-relaxed mt-2">{review.comment}</p>
      )}
    </div>
  );
};

export default ReviewCard;

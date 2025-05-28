// components/ReviewCard.jsx

import React from "react";
import Rating from "@mui/material/Rating";
import { assetss } from "../assets/frontend_assets/assetss";

const ReviewCard = ({ review }) => {
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
            <span className="font-semibold text-gray-800 text-sm ml-1">{review.userId.name}</span>
            <span className="text-gray-500 text-xs">{review.userId.email || "Customer"}</span>
          </div>
          <Rating value={review.rating} readOnly precision={0.5} size="small" className="mt-1" />
        </div>
      </div>

      {/* Comment */}
      <p className="text-gray-700 text-sm leading-relaxed mt-2">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;

import { useState, ReactNode } from "react";
import StarIcon from "../icons/SmallStarIcon";
import "./Rating.css";
import RatingField from "./RatingField";

interface RatingProps {
  rating: number;
  maxRating: number;
}

const Rating = ({ rating, maxRating }: RatingProps) => {
  //<RatingField maxRating={maxRating} />
  //do some rounding
  const roundedRating = Math.round(rating * 10) / 10;
  return (
    <div className="rating-container">
      <StarIcon className="rating-star" filled={true} />
      <label className="rating-label">
        {roundedRating} / {maxRating}
      </label>
    </div>
  );
};

export default Rating;

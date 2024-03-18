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
  return (
    <div className="rating-container">
      <StarIcon filled={true} />
      <label className="rating-label">
        {rating}/{maxRating}
      </label>
    </div>
  );
};

export default Rating;

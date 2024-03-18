import { useState, ReactNode } from "react";
import StarIcon from "../icons/SmallStarIcon";
import "./Rating.css";

interface RatingProps {
  rating: number;
  maxRating: number;
}

const Rating = ({ rating, maxRating }: RatingProps) => {
  const getStarType = (index: number) => {
    const isFilled = index <= rating;
    return <StarIcon key={index} filled={isFilled} />;
  };

  return (
    <div className="rating-container">
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((index) =>
        getStarType(index)
      )}
    </div>
  );
};

export default Rating;

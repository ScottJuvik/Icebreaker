import { useState, ReactNode } from "react";
import StarIcon from "../icons/SmallStarIcon";
import "./RatingField.css";

interface RatingFieldProps {
  maxRating: number;
  onChange: (rating: number) => void;
}

const RatingField = ({ maxRating, onChange }: RatingFieldProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <>
      {[...Array(maxRating)].map((_, index) => {
        const currentRating = index + 1;

        return (
          <StarIcon
            className="star"
            key={index}
            filled={true}
            fill={currentRating <= (hover || rating) ? "#FFD700" : "gray"}
            onClick={() => {
              setRating(currentRating);
              onChange(currentRating);
            }}
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(null)}
          />
        );
      })}
    </>
  );
};

export default RatingField;

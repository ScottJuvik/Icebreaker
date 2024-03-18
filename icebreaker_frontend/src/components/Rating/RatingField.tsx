import { useState, ReactNode } from "react";
import StarIcon from "../icons/SmallStarIcon";
import "./Rating.css";

interface RatingFieldProps {
  maxRating: number;
}

const RatingField = ({ maxRating }: RatingFieldProps) => {
  const getStarType = (index: number) => {
    const isFilled = index <= 0;
    return <StarIcon key={index} filled={isFilled} />;
  };

  // return (
  //   <div className="rating-container">
  //     {Array.from({ length: maxRating }, (_, i) => i + 1).map((index) =>
  //       getStarType(index)
  //     )}
  //   </div>
  // );

  const [hover, setHover] = useState<number | null>(null);

  return (
    <>
      {[...Array(maxRating)].map((_, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <span
              className="star"
              style={{
                color: currentRating <= (hover || 0) ? "#ffc107" : "#e4e5e9",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
              onClick={() => console.log(currentRating)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
    </>
  );
};

export default RatingField;

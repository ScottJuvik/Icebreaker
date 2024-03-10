import './Rating.css';

interface RatingStjernerProps {
  rating: number;
  maxRating: number;
}

const RatingStjerner: React.FC<RatingStjernerProps> = ({ rating, maxRating }) => {
  const getStarType = (index: number) => {
    if (index <= rating) {
      return <span key={index} className="starFilled">★</span>; // Fylt stjerne
    } else if (index - 0.5 <= rating) {
      return <span key={index} className="starHalfFilled"></span>; // Halvfylt stjerne (bruk det symbolet som best representerer en halv stjerne for deg)
    } else {
      return <span key={index} className="starEmpty">☆</span>; // Tom stjerne
    }
  };

  return (
    <div className="rating-container">
      {Array.from({ length: maxRating }, (_, i) => i + 1).map(index => (
        getStarType(index)
      ))}
    </div>
  );
};

export default RatingStjerner;





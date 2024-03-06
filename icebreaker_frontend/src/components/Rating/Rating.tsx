import "./Rating.css"

interface RatingStjernerProps {
  rating: number;
  maxRating: number;
}

const RatingStjerner: React.FC<RatingStjernerProps> = ({ rating, maxRating }) => {
  // Lager en array med størrelse lik maxRating og fyller den med verdier fra 1 opp til maxRating
  const starIndices = Array.from({ length: maxRating }, (_, i) => i + 1);

  return (
    <div className="rating-container">
      {starIndices.map(index => (
        <span key={index} className={`star ${index <= rating ? 'filled' : 'empty'}`}>
          {index <= rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

export default RatingStjerner;






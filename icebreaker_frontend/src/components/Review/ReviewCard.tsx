import "./ReviewCard.css";
import { Review } from "../../types/types";

const ReviewCard = (params: Review) => {

  return (
    <>
      <div className="review-container">
        <h3 className="title">{params.title}</h3>
        <p className="author-text">Bruker: {params.creator.name}</p>
        <p className="text-body">{params.description}</p>
        <button className="report-btn">!</button>
      </div>
    </>
  )
}

export default ReviewCard;

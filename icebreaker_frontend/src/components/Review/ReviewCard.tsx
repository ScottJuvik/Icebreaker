import "./ReviewCard.css";
import { Review } from "../../types/types";
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

const ReviewCard = (params: Review) => {

  return (
    <>
      <div className="review-container">
        <h3 className="title">{params.title}</h3>
        <p className="author-text">Bruker: {params.creator.name}</p>
        <p className="text-body">{params.description}</p>
        <FlagOutlinedIcon className="report-btn" />
      </div>
    </>
  )
}

export default ReviewCard;

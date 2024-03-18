import "./ReviewCard.css";
import { Review } from "../../types/Types";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../../firebase/firebaseConfig";
import { FaTrashAlt } from "react-icons/fa";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getLoggedInType } from "../../api/LoggedInAPI";
import { deleteReview } from "../../api/ReviewAPI";

const ReviewCard = (params: Review) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    getLoggedInType().then((value) => {
      setIsAdmin(value === "admin");
    });
  }, [navigate]);

  return (
    <>
      <div className="review-container">
        <h3 className="title">{params.title}</h3>
        <p className="author-text">Bruker: {params.creator.name}</p>
        <p className="text-body">{params.description}</p>
        <div>
          {isAdmin && (
            <FaTrashAlt
              className="trash-btn"
              onClick={() => deleteReview(params.id)}
            />
          )}
          <FlagOutlinedIcon className="report-btn" />
        </div>
      </div>
    </>
  );
};

export default ReviewCard;

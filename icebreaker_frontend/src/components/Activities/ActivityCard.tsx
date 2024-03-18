import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Activity } from "../../types/Types";
import { getFavorite, updateFavorite } from "../../api/FavoriteAPI";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import "./ActivitiesStyles.css";
import { FaTrashAlt } from "react-icons/fa";
import { reload } from "@firebase/auth";
import { getLoggedIn, getLoggedInType } from "../../api/LoggedInAPI";
import { deleteActivity } from "../../api/ActivitiesAPI";
import RatingStjerner from "../Rating/Rating";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

function ActivityCard(params: Activity) {
  const [styleClass, setClass] = useState("activity");
  const [expandMode, toggleExpand] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isFavorite, setFavorite] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(getLoggedIn());
    getFavorite(params.id).then((value) => {
      setFavorite(value);
    });
    getLoggedInType().then((value) => {
      setIsAdmin(value === "admin");
    });
  }, [navigate]);

  const handleButtonClick = () => {
    navigate("/" + params.id);
  };

  const handleFavoriteChange = () => {
    updateFavorite(params.id, !isFavorite);
    setFavorite(!isFavorite);
  };

  const handleReviewButton = () => {
    navigate("/create_review/" + params.id);
  };
  console.log(params.category.color);
  return (
    <div
      className={styleClass}
      style={{ borderTop: `10px solid ${params.category.color}` }}
    >
      <div className="activity_element" onClick={handleButtonClick}>
        <h3>{params.title}</h3>
        <p id="user_text">{params.creator.name}</p>
        {expandMode && <p>Beskrivelse: {params.description}</p>}
        <RatingStjerner rating={params.rating} maxRating={5} />
        <input
          checked={isFavorite}
          onChange={handleFavoriteChange}
          type="checkbox"
          className="activity_checkbox"
        />
      </div>
      {isLoggedIn && (
        <div className="activity_actions">
          <FlagOutlinedIcon className="report-btn" />
          <div className="rate-div" onClick={handleReviewButton}>
            <StarBorderRoundedIcon className="rate-btn" />
            <span className="rate-span">Rate</span>
          </div>
          <div className="onclickButtons">
            {isAdmin && (
              <FaTrashAlt
                className="trashbtn"
                onClick={() => deleteActivity(params.id)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityCard;

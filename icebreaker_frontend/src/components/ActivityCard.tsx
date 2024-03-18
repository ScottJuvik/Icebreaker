import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Activity } from "../types/Types";
import { getFavorite, updateFavorite } from "../api/FavoriteAPI";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import "../style/ActivitiesStyles.css";
import { FaTrashAlt } from "react-icons/fa";
import { reload } from "@firebase/auth";
import { getLoggedIn, getLoggedInType } from "../api/LoggedInAPI";
import { deleteActivity } from "../api/ActivitiesAPI";

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
  return (
    <div className={styleClass}>
      <div className="activity_element" onClick={handleButtonClick}>
        <h3>{params.title}</h3>
        <p id="user_text">Opprettet av: {params.creator.name}</p>
        {expandMode && <p>Beskrivelse: {params.description}</p>}
        <p id="rating_text">Rating: {params.rating}</p>
      </div>
      {isLoggedIn && (
        <div className="activity_actions">
          <button onClick={handleReviewButton}>Vurder</button>
          <button>Rapporter</button>
          <div className="onclickButtons">
            <input
              checked={isFavorite}
              onChange={handleFavoriteChange}
              type="checkbox"
              className="activity_checkbox"
            />
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

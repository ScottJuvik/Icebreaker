import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Activity } from "../types/Types";
import { getFavorite, updateFavorite } from "../api/FavoriteAPI";

function ActivityCard(params: Activity) {
  const [styleClass, setClass] = useState("activity");
  const [expandMode, toggleExpand] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [isFavorite, setFavorite] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(
      sessionStorage.getItem("user_id") !== "" &&
        sessionStorage.getItem("user_id") !== null
    );
    getFavorite(params.id).then((value) => {
      setFavorite(value);
    });
  }, [navigate]);

  const handleButtonClick = () => {
    navigate("/" + params.id);
  };

  const handleChange = () => {
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
          <input
            checked={isFavorite}
            onChange={handleChange}
            type="checkbox"
            className="activity_checkbox"
          />
        </div>
      )}
    </div>
  );
}

export default ActivityCard;

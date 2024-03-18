import { Activity } from "../../types/Types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ExpandedActivity.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { getFavorite, updateFavorite } from "../../api/FavoriteAPI";

function ExpandedActivity(params: Activity) {
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

  const handleFavorite = () => {
    updateFavorite(params.id, !isFavorite);
    setFavorite(!isFavorite);
  };

  return (
    <div className="expanded-activity">
      <div className="activity_element">
        <h1>{params.title}</h1>
        <p id="user_text">Opprettet av: {params.creator.name}</p>
        <p>Beskrivelse: {params.description}</p>
        <p id="rating_text">Rating: {params.rating}</p>
      </div>
      {isLoggedIn && (
        <div className="activity-actions">
          <button>Rapporter</button>
          <input
            checked={isFavorite}
            onClick={handleFavorite}
            type="checkbox"
            className="activity_checkbox"
          />
        </div>
      )}
    </div>
  );
}

export default ExpandedActivity;

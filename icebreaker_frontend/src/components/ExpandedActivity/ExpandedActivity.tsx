import { Activity } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ExpandedActivity.css";

function ExpandedActivity(params: Activity) {
  //TODO: make review button a floating component
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<String[]>([]);
  const [value, setValue] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem("user_id") !== "" && sessionStorage.getItem("user_id") !== null)
  }, [navigate])


  const handleReviewButton = () => {
    //TODO: params.id is undefined for some reason.
    navigate("/create_review/" + params.id);
  }
  return (
    <div className="expanded-activity" >
      <div className="activity_element">
        <h1>{params.title}</h1>
        <p id="user_text">Opprettet av: {params.creator.name}</p>
        <p>Beskrivelse: {params.description}</p>
        <p id="rating_text">Rating: {params.averageRating}</p>
        <p>{params.id}</p>
      </div>
      {isLoggedIn &&
        <div className="activity-actions" >
          <button onClick={handleReviewButton}>Vurder</button>
          <button>Rapporter</button>
          <input checked={value} type="checkbox" className="activity_checkbox" />
        </div>
      }
    </div>
  );
}

export default ExpandedActivity;

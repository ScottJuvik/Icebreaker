import { useEffect, useState } from "react";
import { Activity } from "../types/types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import RatingStjerner from "./Rating/Rating";
import "./Rating/RatingModal.css";
import { FaStar } from 'react-icons/fa'



function ActivityCard(params: Activity) {
  const [styleClass, setClass] = useState('activity');
  const [expandMode, toggleExpand] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<String[]>([]);
  const [value, setValue] = useState<boolean>(false);


  const navigate = useNavigate()

  // tilstandsvariabler – en for å vise/skjule modalen og en for å holde styr på den valgte ratingen, og hover
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);



  const retrieveFavorites = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (userId === "") {
      return;
    }
    const docRef = doc(db, "users", userId ? userId : "");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFavorites(docSnap.data().favorites);
    }
    else {
      console.log("No such document!")
    }
  }

  const updateFavorites = async () => {
    retrieveFavorites();
    const userId = sessionStorage.getItem("user_id");
    const userRef = doc(db, "users", userId ? userId : "");

    await updateDoc(userRef, {
      favorites: [params.id, ...favorites]
    });
  }

  const deleteFavorites = async () => {
    retrieveFavorites();
    const userId = sessionStorage.getItem("user_id");
    const userRef = doc(db, "users", userId ? userId : "");
    await updateDoc(userRef, {
      favorites: favorites.filter((activityId) => activityId !== params.id)
    });
  }


  useEffect(() => {
    setLoggedIn(sessionStorage.getItem("user_id") !== "" && sessionStorage.getItem("user_id") !== null)
    retrieveFavorites();
  }, [navigate])

  useEffect(() => {
    if (favorites.includes(params.id)) {
      setValue(true);
    }
  }, [favorites, params.id])

  const handleButtonClick = () => {
    toggleExpand(!expandMode);
    setClass(expandMode ? 'activity' : 'expanded_activity')
  }

  const handleChange = () => {
    if (!value) {
      updateFavorites();
    } else {
      deleteFavorites();
    }
    setValue(!value)
  }


  {/* Gjør at man må logge inn for å klikke på rate*/ }
  const handleRateClick = () => {
    if (!isLoggedIn) { //har bare skrevet ! foran for å slippe å logge inn hver gang midlertidig
      setShowRatingModal(true);
    } else {
      alert('You need to log in to give a rating');
    }
  };

  // TODO: Implementer databaselagring 

  const handleSaveRating = async () => {
    setShowRatingModal(false);

    alert("Failed to save rating. Feature not implemented yet.");
  };


  {/* Lagrer rating til databasen 
  const handleSaveRating = async () => {
    try {
      await saveRatingToDatabase(params.id, rating);
      setShowRatingModal(false); // Lukker modalen
      alert('Rating saved successfully!');
    } catch (error) {
      alert('Failed to save rating: ' + error.message);
      console.error('Failed to save rating', error);
    }
  }; */}


  return (
    <div className={styleClass} >
      <div className="activity_element" onClick={handleButtonClick}>
        <h3>{params.title}</h3>
        <p id="user_text">Opprettet av: {params.creator.name}</p>
        {expandMode && <p>Beskrivelse: {params.description}</p>}
        <RatingStjerner rating={params.averageRating} maxRating={5} />

      </div>
      {isLoggedIn &&
        <div className="activity_actions" >
          <button>Vurder</button>
          <button>Rapporter</button>
          <input checked={value} onChange={handleChange} type="checkbox" className="activity_checkbox" />
        </div>
      }

      <button className="rate_button" onClick={handleRateClick}> { }
        Rate
      </button>


      {/* rating av leker */}

      {showRatingModal && (
        <div className="rating_modal">
          <div className="modal_content">
            <span className="close" onClick={() => setShowRatingModal(false)}>
              &times;
            </span>
            <div>
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                    />
                    <FaStar
                      className="star"
                      size={20}
                      color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </label>
                );
              })}
            </div>
            <button onClick={handleSaveRating}>Save Rating</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default ActivityCard;

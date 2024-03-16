import { useEffect, useState } from "react";
import { Activity } from "../types/types";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../style/ActivitiesStyles.css"
import { FaTrashAlt } from "react-icons/fa";
import { reload } from "@firebase/auth";


function ActivityCard(params: Activity) {
  const [styleClass, setClass] = useState('activity');
  const [expandMode, toggleExpand] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<String[]>([]);
  const [value, setValue] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate()

  const deleteActivity = async () => {
    await deleteDoc(doc(db, "activities", params.id));
    navigate(0);
  }

  const retrieveAdmin = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      return;
    }
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setIsAdmin(docSnap.data().type == "admin");
    }
    else {
      console.log("No such document!")
    }
  }


  const retrieveFavorites = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      return;
    }
    const docRef = doc(db, "users", userId);
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
    if (!userId) {
      return;
    }
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      favorites: [params.id, ...favorites]
    });
  }

  const deleteFavorites = async () => {
    retrieveFavorites();
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      return;
    }
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      favorites: favorites.filter((activityId) => activityId !== params.id)
    });
  }


  useEffect(() => {
    setLoggedIn(sessionStorage.getItem("user_id") !== "" && sessionStorage.getItem("user_id") !== null)
    retrieveFavorites();
    retrieveAdmin();
  }, [navigate])

  useEffect(() => {
    if (favorites.includes(params.id)) {
      setValue(true);
    }
  }, [favorites])

  const handleButtonClick = () => {
    navigate("/" + params.id);
  }

  const handleChange = () => {
    if (!value) {
      updateFavorites();
    } else {
      deleteFavorites();
    }
    setValue(!value)
  }

  const handleReviewButton = () => {
    navigate("/create_review/" + params.id);
  }
  return (
    <div className={styleClass} >
      <div className="activity_element" onClick={handleButtonClick}>
        <h3>{params.title}</h3>
        <p id="user_text">Opprettet av: {params.creator.name}</p>
        {expandMode && <p>Beskrivelse: {params.description}</p>}
        <p id="rating_text">Rating: {params.averageRating}</p>
      </div>
      {isLoggedIn &&
        <div className="activity_actions" >
          <button onClick={handleReviewButton}>Vurder</button>
          <button>Rapporter</button>
          <div className="onclickButtons">
            <input checked={value} onChange={handleChange} type="checkbox" className="activity_checkbox" />
            {isAdmin &&
              <FaTrashAlt className="trashbtn" onClick={() => deleteActivity()} />
            }
          </div>
        </div>
      }
    </div>
  );
}

export default ActivityCard;

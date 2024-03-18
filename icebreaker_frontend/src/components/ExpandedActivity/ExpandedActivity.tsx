import { Activity } from "../../types/Types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ExpandedActivity.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { getFavorite, updateFavorite } from "../../api/FavoriteAPI";
import { LinkedinShareButton, FacebookShareButton, TwitterShareButton } from "react-share";
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { useParams } from "react-router-dom";

function ExpandedActivity(params: Activity) {
  const { activityId } = useParams();
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
    setLoggedIn(sessionStorage.getItem("user_id") !== "" && sessionStorage.getItem("user_id") !== null)
  }, [navigate])

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
      favorites: [activityId, ...favorites]
    });
  }, [navigate]);

  const handleFavorite = () => {
    updateFavorite(params.id, !isFavorite);
    setFavorite(!isFavorite);
  };

  return (
    <div className="expanded-activity">
    <div className="expanded-activity" >
      {isLoggedIn &&
        <div className="activity-actions" >
          <FlagOutlinedIcon className="report-btn" />
        </div>
      }

      <div className="activity_element">
        <div className="header-container">
          <h1>{params.title}</h1>
          {isLoggedIn && <input checked={value} onClick={handleFavorite} type="checkbox" className="activity_checkbox" />}
        </div>
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
        <p id="rating_text">Rating: {params.averageRating}</p>
      </div>
      <div className="socials">
        <TwitterShareButton url={"www.icebreaker.no/" + activityId}>
          <XIcon />
        </TwitterShareButton>
        <FacebookShareButton url={"www.icebreaker.no/" + activityId}>
          <FacebookIcon />
        </FacebookShareButton>
        <LinkedinShareButton url={"www.icebreaker.no/" + activityId}>
          <LinkedInIcon />
        </LinkedinShareButton>

      </div>

    </div>
  );
}

export default ExpandedActivity;

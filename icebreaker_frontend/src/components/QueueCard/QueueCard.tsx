import { useEffect, useState } from "react";
import { Queue } from "../../types/Types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import PlayIcon from "../icons/PlayIcon";
import { QueueData } from "../../types/DatabaseTypes";
import "../../style/QueueStyles.css";
import FavoriteIcon from '@mui/icons-material/Favorite';

function QueueCard(params: QueueData) {
  const navigate = useNavigate();

  const navigateToQueue = () => {
    navigate(`/queue/${params.id}`);
  };

  const navigateToPlay = () => {
    navigate("/");
  };

  const isMyPage = params.id == "";
  return (
    <div className="queue" onClick={navigateToQueue}>

      <h3 className="queue-element">{params.title}</h3>
      {!isMyPage && (
        <p className="queue-element">
          {params.dateCreated.toDate().toDateString()}
        </p>
      )}

      {isMyPage && <FavoriteIcon className="heart" fontSize="large" />}
      <button className="play-button" onClick={navigateToPlay}>
        <PlayIcon />
      </button>
    </div>
  );
}

export default QueueCard;

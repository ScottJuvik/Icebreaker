import { useEffect, useState } from "react";
import { Queue } from "../types/types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import PlayIcon from "./icons/PlayIcon";

function QueueCard(params: Queue) {
  return (
    <div className="queue">
      <h3 className="queue-element">{params.title}</h3>
      <button className="play-button">
        <PlayIcon />
      </button>
    </div>
  );
}

export default QueueCard;

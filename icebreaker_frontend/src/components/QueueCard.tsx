import { useEffect, useState } from "react";
import { Queue } from "../types/types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

function QueueCard(params: Queue) {
  let totalTime = 1;
  return (
    <div className="queue">
      <h3 className="queue-element">{params.title}</h3>
      <p className="queue-element" id="rating_text">
        Expected time: {totalTime} minute{totalTime != 1 && "s"}
      </p>
    </div>
  );
}

export default QueueCard;

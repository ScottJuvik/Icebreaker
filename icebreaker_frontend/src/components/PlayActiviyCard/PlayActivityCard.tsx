import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity } from "../../types/Types";
import Timer from "../Timer/Timer";
import "./PlayActivityCard.css";

interface PlayActivityCardProps {
  activity: Activity;
  selected: boolean;
}
function PlayActivityCard({ activity, selected }: PlayActivityCardProps) {
  const navigate = useNavigate();


  const handleButtonClick = () => {
    navigate("/" + activity.id);
  };

  return (
    <div className={selected ? "play-activity" : "unselected-activity"}>
      <div className="activity_element" onClick={handleButtonClick}>
        <h3>{activity.title}</h3>
        <p id="user_text">Opprettet av: {activity.creator.name}</p>
        <p id="desc">{activity.description}</p>
      </div>
      {selected ? <Timer /> : null}
    </div>
  );
}

export default PlayActivityCard;

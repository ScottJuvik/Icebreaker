import { useState } from "react";
import { Activity } from "../types";

function ActivityCard(params: Activity) {
    const [styleClass, setClass] = useState('activity');
    const [expandMode, toggleExpand] = useState(false);

    const handleButtonClick= () => {
        toggleExpand(!expandMode);
        setClass(expandMode ? 'activity' : 'expanded_activity')
        
    }
  return (
    <div className={styleClass} >
      <div className="activity_element" onClick={handleButtonClick}>
        <h3>{params.title}</h3>
        <p id="user_text">Opprettet av: {params.creator.name}</p>
        {expandMode && <p>Beskrivelse: {params.description}</p>}
        <p id="rating_text">Rating: {params.averageRating}</p>
      </div>
      <div className="activity_actions" >
        <button>Vurder</button>
        <button>Rapporter</button>
        <input type="checkbox" className="activity_checkbox" />
      </div>
    </div>
  );
}

export default ActivityCard;

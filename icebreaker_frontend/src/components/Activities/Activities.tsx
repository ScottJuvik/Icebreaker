import React, { useState, useEffect } from "react";
import "./ActivitiesStyles.css";
import ActivityCard from "./ActivityCard";
import { Activity } from "../../types/Types";

function Activities({ activities }: { activities: Activity[] }) {
  return (
    <li className="activities">
      <ul>
        {activities.map((activity: Activity) => (
          <ActivityCard key={activity.id} {...activity} />
        ))}
      </ul>
    </li>
  );
}

export default Activities;

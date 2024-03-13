import { Activity } from "../types/types";
import React, { useState, useEffect } from "react";
import "../style/ActivitiesStyles.css";
import ActivityCard from "./ActivityCard";

interface ActivitiesProps {
  activities: Activity[];
}

function Activities({ activities }: ActivitiesProps) {
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

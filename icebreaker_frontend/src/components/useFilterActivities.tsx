// useFilteredActivities.tsx
import React, { useState } from "react";
import { Activity, Category } from "../types/types";

interface UseFilteredActivitiesProps {
  initialActivities: Activity[];
  search: string;
}

const useFilteredActivities = ({
  initialActivities,
  search,
}: UseFilteredActivitiesProps) => {
  const [isSortedByRating, setIsSortedByRating] = useState(false);
  const [sortDescending, setSortDescending] = useState(true);

  const filteredActivities = initialActivities
    .filter((activity) =>
      activity.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      isSortedByRating
        ? sortDescending
          ? b.averageRating - a.averageRating
          : a.averageRating - b.averageRating
        : 0
    );

  const toggleSortOrder = () => {
    if (isSortedByRating) {
      setSortDescending(!sortDescending);
    } else {
      setIsSortedByRating(true);
    }
  };

  // Call this function when you want to stop sorting by rating
  const clearSortByRating = () => {
    setIsSortedByRating(false);
  };

  return {
    filteredActivities,
    toggleSortOrder,
    clearSortByRating,
  };
};

export default useFilteredActivities;

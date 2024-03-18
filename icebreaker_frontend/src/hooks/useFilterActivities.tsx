// useFilteredActivities.tsx
import React, { useState } from "react";
import { Activity } from "../types/Types";

interface UseFilteredActivitiesProps {
  initialActivities: Activity[];
  search: string;
  selectedCategory: string | null;
}

const useFilteredActivities = ({
  initialActivities,
  search,
  selectedCategory,
}: UseFilteredActivitiesProps) => {
  const [isSortedByRating, setIsSortedByRating] = useState(true);
  const [sortDescending, setSortDescending] = useState(true);

  const filteredActivities = initialActivities
    .filter((activity) =>
      activity.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((activity) =>
      selectedCategory ? activity.category === selectedCategory : true
    )
    .sort((a, b) =>
      isSortedByRating
        ? sortDescending
          ? b.rating - a.rating
          : a.rating - b.rating
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

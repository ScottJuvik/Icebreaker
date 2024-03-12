// Home.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Activities from "../components/Activities";
import { Activity } from "../types/types";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import useFilteredActivities from "../components/useFilterActivities"; // Make sure the path is correct

const Home = () => {
  const [search, setSearch] = useState(""); // State variable for search
  const [activities, setActivities] = useState<Activity[]>([]); // State variable for activities

  const { filteredActivities, toggleSortOrder, clearSortByRating } =
    useFilteredActivities({ initialActivities: activities, search });

  useEffect(() => {
    const getActivities = async () => {
      const querySnapshot = await getDocs(collection(db, "activities"));
      const activityList: Activity[] = [];
      querySnapshot.forEach((doc) => {
        const data: Activity = {
          ...(doc.data() as Activity),
          id: doc.id,
          categories: doc.data().categories || [],
        };
        activityList.push(data);
      });
      setActivities(activityList);
    };

    getActivities();
  }, []);

  const onSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    if (searchTerm === "") {
      clearSortByRating(); // If the search is cleared, reset the sorting
    }
  };

  return (
    <>
      <Navbar />
      <div className="content_container">
        <h2>Activities</h2>
        <SearchBar onSearch={onSearch} />
        <button onClick={toggleSortOrder}>Toggle Sort by Rating</button>
        <Activities activities={filteredActivities} />
      </div>
    </>
  );
};

export default Home;

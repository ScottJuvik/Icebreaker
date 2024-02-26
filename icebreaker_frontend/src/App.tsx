import React, { useEffect, useState } from "react";
import Activities from "./components/Activities";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import "./App.css";
import ActivityCard from "./components/ActivityCard";
import { Activity } from "./types";
import { getActivities } from './api/ActivitiesAPI'

function App() {
  const [search, setSearch] = useState(""); // State variable for search
  const [activities, setActivities] = useState<Activity[]>([]); // State variable for activities

  useEffect(() => {
    // Fetch activities when the component mounts
    getActivities().then((activities) => setActivities(activities));
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  // Update the search state when search term changes
  const onSearch = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  
  // Filter activities based on the search term
  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="content_container">
        <h2>Activities</h2>
        <SearchBar onSearch={onSearch} />
        <Activities activities={filteredActivities} />
      </div>
    </>
  );
}

export default App;

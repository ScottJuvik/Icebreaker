import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar";
import Activities from "../components/Activities";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

//import activitry api
import { getActivities } from "../api/ActivitiesAPI";
import FabButton from "../components/FabButton/FabButton";
import { useNavigate } from "react-router-dom";
import { Activity } from "../types/Types";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); // State variable for search
  const [activities, setActivities] = useState<Activity[]>([]); // State variable for activities

  useEffect(() => {
    getActivities().then((activities) => {
      setActivities(activities);
    });
  }, []);

  // Update the search state when search term changes
  const onSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    console.log(searchTerm);
  };

  // Filter activities based on the search term
  const filteredActivities = activities.filter(
    (activity) =>
      activity.title &&
      activity.title.toLowerCase().includes(search.toLowerCase())
  );

  const create_activity = () => {
    navigate("/create_activity");
  };

  return (
    <>
      <Navbar />
      <div className="content_container">
        <h2>Activities</h2>
        <SearchBar onSearch={onSearch} />
        <Activities activities={filteredActivities} />
      </div>
      <FabButton handleClick={create_activity} icon="add" />
    </>
  );
};

export default Home;

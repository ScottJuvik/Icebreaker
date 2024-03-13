import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar";
import Activities from "../components/Activities";
import { Activity } from "../types/types";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [search, setSearch] = useState(""); // State variable for search
  const [activities, setActivities] = useState<Activity[]>([]); // State variable for activities

  const getActivities = async () => {
    const querySnapshot = await getDocs(collection(db, "activities"));
    const activityList: Activity[] = [];

    querySnapshot.forEach((doc) => {
      const data: Activity = {
        ...(doc.data() as Activity),
        id: doc.id,
      };
      activityList.push(data);
    })

    setActivities(activityList);
    console.log(activityList);
  };

  useEffect(() => {
    // Fetch activities when the component mounts
    // getActivities().then((activities) => setActivities(activities));

    getActivities();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  // Update the search state when search term changes
  const onSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    console.log(searchTerm);
  };

  // Filter activities based on the search term
  const filteredActivities = activities.filter((activity) =>
    activity.title && activity.title.toLowerCase().includes(search.toLowerCase())
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
};

export default Home;

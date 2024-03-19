import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar";
import Activities from "../components/Activities";
import { db } from "../firebase/firebaseConfig";
import { getActivities } from "../api/ActivitiesAPI";
import { Activity } from "../types/Types";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import FabButton from "../components/FabButton/FabButton";
import { useNavigate } from "react-router-dom";
import useFilteredActivities from "../hooks/useFilterActivities";
import { getCategories } from "../api/CategoriesAPI";
import { CategoryData } from "../types/DatabaseTypes";
import CategorySelect from "../components/CategorySelect/CategorySelect";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) {
      getActivities().then((activities) => {
        setActivities(activities);
        setIsLoading(false);
      });
    }
  });

  const { filteredActivities, toggleSortOrder, clearSortByRating } =
    useFilteredActivities({
      initialActivities: activities,
      search,
      selectedCategory,
    });

  const onSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    if (searchTerm === "") {
      clearSortByRating();
    }
  };

  //(onChange: (category: CategoryData) => void) => {
  const handleCategoryChange = (category: CategoryData | null) => {
    if (!category) {
      setSelectedCategory(null);
      return;
    }
    setSelectedCategory(category.id);
  };

  const createActivity = () => {
    navigate("/create_activity");
  };

  return (
    <>
      <Navbar />
      <div className="content_container">
        <h2>Activities</h2>
        <SearchBar onSearch={onSearch} />
        <button onClick={toggleSortOrder}>Toggle Sort by Rating</button>
        <CategorySelect onChange={handleCategoryChange} />
        <Activities activities={filteredActivities} />
      </div>
      <FabButton handleClick={createActivity} icon="add" />
    </>
  );
};

export default Home;

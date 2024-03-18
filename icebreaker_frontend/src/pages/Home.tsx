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

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    if (isLoading) {
      getActivities().then((activities) => {
        setActivities(activities);
        getCategories().then((categories) => {
          setCategories(categories);
          setIsLoading(false);
        });
      });
    }
    console.log("selectedCategory: ", selectedCategory);
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

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
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
        <select value={selectedCategory || ""} onChange={handleCategoryChange}>
          <option value="">Select a category.</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <Activities activities={filteredActivities} />
      </div>
      <FabButton handleClick={createActivity} icon="add" />
    </>
  );
};

export default Home;

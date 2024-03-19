import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/Searchbar/SearchBar";
import Activities from "../../components/Activities/Activities";
import { db } from "../../firebase/firebaseConfig";
import { getActivities } from "../../api/ActivitiesAPI";
import { Activity } from "../../types/Types";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import FabButton from "../../components/FabButton/FabButton";
import { useNavigate } from "react-router-dom";
import useFilteredActivities from "../../hooks/useFilterActivities";
import { getCategories } from "../../api/CategoriesAPI";
import { CategoryData } from "../../types/DatabaseTypes";
import "./Home.css";

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
        <div className="search_category_container">
          <div className="category_container">
            <select
              value={selectedCategory || ""}
              onChange={handleCategoryChange}
              className="category_dropdown"
            >
              <option value="" className="category_dropdown">
                Velg en kategori
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="activity-button-container">
          <div className="btn-fab-container">
            <button onClick={toggleSortOrder} className="buttonSort">
              Rangering
            </button>
            <FabButton handleClick={createActivity} icon="add" />
          </div>
          <Activities activities={filteredActivities} />
        </div>
      </div>
    </>
  );
};

export default Home;

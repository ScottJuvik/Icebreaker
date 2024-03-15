// Home.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Activities from "../components/Activities";
import { Activity, Category } from "../types/types";
import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import useFilteredActivities from "../hooks/useFilterActivities";

const Home = () => {
  const [search, setSearch] = useState(""); // State variable for search
  const [activities, setActivities] = useState<Activity[]>([]); // State variable for activities
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { filteredActivities, toggleSortOrder, clearSortByRating } =
    useFilteredActivities({
      initialActivities: activities,
      search,
      selectedCategory,
    });

  useEffect(() => {
    const getActivities = async () => {
      const querySnapshot = await getDocs(collection(db, "activities"));
      const activityList: Activity[] = [];
      querySnapshot.forEach((doc) => {
        const data: Activity = {
          ...(doc.data() as Activity),
          id: doc.id,
        };
        activityList.push(data);
      });
      setActivities(activityList);
    };

    getActivities();
  }, []);

  useEffect(() => {
    const getValidCategories = async () => {
      const querySnapshot = await getDoc(
        doc(db, "category", "valid categories")
      );
      if (querySnapshot.exists()) {
        const categoryData = querySnapshot.data() as Category;
        setCategories(categoryData.categories);
      } else {
        console.log("docs not found");
      }
    };
    getValidCategories();
  });

  const onSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    if (searchTerm === "") {
      clearSortByRating(); // If the search is cleared, reset the sorting
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
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
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <Activities activities={filteredActivities} />
      </div>
    </>
  );
};

export default Home;

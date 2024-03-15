import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar";
import Activities from "../components/Activities";
import { Activity } from "../types/types";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import FabButton from "../components/FabButton/FabButton";
import { useNavigate } from "react-router-dom";
import useFilteredActivities from "../hooks/useFilterActivities";

const Home = () => {
  const [search, setSearch] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const navigate = useNavigate();

  const { filteredActivities, toggleSortOrder, clearSortByRating } =
    useFilteredActivities({
      initialActivities: activities,
      search,
      selectedCategory,
    });

  useEffect(() => {
    const fetchActivities = async () => {
      const querySnapshot = await getDocs(collection(db, "activities"));
      const activityList: Activity[] = [];
      querySnapshot.forEach((doc) => {
        const data = { ...(doc.data() as Activity), id: doc.id };
        activityList.push(data);
      });
      setActivities(activityList);
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const docRef = doc(db, "category", "valid categories");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const categoryData = docSnap.data();
        setCategories(categoryData.categories);
      } else {
        console.log("No such document!");
      }
    };

    fetchCategories();
  }, []);

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
            <option key={category} value={category}>
              {category}
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

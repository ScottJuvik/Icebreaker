import React, { useState, ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBarStyles.css";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    onSearch(value); // Call the onSearch function passed as prop
  };

  return (
    <div className="search_bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className="search_input"
        placeholder="Søk på en aktivitiet..."
      />
      <span className="search-icon">
        <i>
          <SearchIcon fontSize="large" />
        </i>
      </span>
    </div>
  );
};

export default SearchBar;

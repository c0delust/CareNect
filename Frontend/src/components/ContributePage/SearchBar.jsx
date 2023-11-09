import styles from "./SearchBar.module.css";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            <SearchIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;

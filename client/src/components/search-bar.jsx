import React, { useState, useEffect, useRef } from "react";
import dropdown from "../assets/imgs/dropdown.svg";
import search from "../assets/imgs/search.svg";
import { useQuery, useQueryClient } from "react-query";

const SearchBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [displaySearches, setDisplaySearches] = useState(false);
  const [newQuery, setNewQuery] = useState("");
  const queryClient = useQueryClient();
  const searchBarRef = useRef();

  const { data: filterBy } = useQuery("filterBy", () =>
    queryClient.getQueryData("filterBy")
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setDisplaySearches(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchTermChange = (event) => {
    setNewQuery(event.target.value);
  };

  function handleSearch(e) {
    if (e.key === "Enter") {
      queryClient.setQueryData("filterBy", (prevFilterBy) => ({
        ...prevFilterBy,
        searchTerm: newQuery,
      }));
      if (newQuery.length) {
        setRecentSearches((prevSearches) => [...prevSearches, newQuery]);
        setDisplaySearches(true);
      }
    }
  }

  function clearRecentSearches() {
    setRecentSearches([]);
  }

  const handleRemoveSearch = (indexToRemove) => {
    setRecentSearches(
      recentSearches.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleOptionChange = (option) => {
    queryClient.setQueryData("filterBy", (prevFilterBy) => ({
      ...prevFilterBy,
      selectedOption: option,
    }));
    setDropdownOpen(false);
  };

  console.log(filterBy);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="search-bar" ref={searchBarRef}>
      <div className="search-container">
        <img src={search} alt="search-icon" className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          value={newQuery}
          onChange={handleSearchTermChange}
          onKeyDown={handleSearch}
          onClick={() => setDisplaySearches(recentSearches.length > 0)}
        />
      </div>
      {displaySearches && recentSearches.length > 0 && (
        <ul>
          <div className="recent-searches-wrapper">
            <p>RECENT SEARCHES</p>
            <p className="clear-searches" onClick={clearRecentSearches}>
              CLEAR
            </p>
          </div>
          {recentSearches.map((search, index) => (
            <li key={index}>
              {search}
              <svg
                onClick={() => handleRemoveSearch(index)}
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.853553 0.146446C0.658291 -0.0488155 0.341709 -0.0488155 0.146447 0.146446C-0.0488155 0.341709 -0.0488155 0.658291 0.146447 0.853554L3.90414 4.61125L0.146521 8.36887C-0.0487413 8.56413 -0.0487413 8.88071 0.146521 9.07597C0.341783 9.27123 0.658365 9.27123 0.853628 9.07597L4.61127 5.31833L8.36892 9.07597C8.56418 9.27123 8.88076 9.27123 9.07603 9.07597C9.27129 8.88071 9.27129 8.56413 9.07603 8.36887L5.31833 4.61117L9.07595 0.853554C9.27121 0.658291 9.27121 0.341709 9.07595 0.146446C8.88069 -0.0488155 8.56411 -0.0488155 8.36884 0.146446L4.6112 3.90409L0.853553 0.146446Z"
                  fill="#5A5A89"
                  fill-opacity="0.5"
                />
              </svg>
            </li>
          ))}
        </ul>
      )}
      <div className="dropdown-container">
        <div className="dropdown-trigger" onClick={toggleDropdown}>
          <span className="selected-option">
            {filterBy.selectedOption || "Top Headlines"}
          </span>
          <img src={dropdown} alt="Drop Down" />
        </div>
        {dropdownOpen && (
          <ul className="dropdown-options">
            <li onClick={() => handleOptionChange("Everything")}>Everything</li>
            <li onClick={() => handleOptionChange("Top Headlines")}>
              Top Headlines
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

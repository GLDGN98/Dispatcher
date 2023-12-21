import React, { useState } from "react";
import dropdown from "../assets/imgs/dropdown.svg";
import search from "../assets/imgs/search.svg";
import { useQuery, useQueryClient } from "react-query";

const SearchBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: filterBy } = useQuery("filterBy", () =>
    queryClient.getQueryData("filterBy")
  );

  console.log(filterBy);

  const handleSearchTermChange = (event) => {
    const newSearchTerm = event.target.value;
    queryClient.setQueryData("filterBy", (prevFilterBy) => ({
      ...prevFilterBy,
      searchTerm: newSearchTerm,
    }));
  };

  const handleOptionChange = (option) => {
    queryClient.setQueryData("filterBy", (prevFilterBy) => ({
      ...prevFilterBy,
      selectedOption: option,
    }));
    setDropdownOpen(false);
  };
  const capitalizedFilterName =
    filterBy.selectedOption.charAt(0).toUpperCase() +
    filterBy.selectedOption.slice(1);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <img src={search} alt="search-icon" className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          value={filterBy.searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
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

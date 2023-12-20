// SearchBar.jsx

import React, { useState } from "react";
import dropdown from "../assets/imgs/dropdown.svg";
import search from "../assets/imgs/search.svg";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("Everything");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

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
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <div className="dropdown-container">
        <div className="dropdown-trigger" onClick={toggleDropdown}>
          <span className="selected-option">{selectedOption}</span>
          <img src={dropdown} alt="" />
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

// NewsFilterInput.jsx

import React from "react";

const NewsFilterInput = ({ filterName, handleChange }) => {
  const capitalizedFilterName =
    filterName.charAt(0).toUpperCase() + filterName.slice(1);
  return (
    <div className="news-filter-input">
      <select
        onChange={(ev) => handleChange(ev, filterName)}
        id="filter-select"
        className="filter-select"
      >
        <option value="">{capitalizedFilterName}</option>
        <option value="il">Israel</option>
        <option value="us">United States</option>
      </select>
    </div>
  );
};

export default NewsFilterInput;

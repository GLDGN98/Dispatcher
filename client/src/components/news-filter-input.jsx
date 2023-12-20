// NewsFilterInput.jsx

import React from "react";

const NewsFilterInput = () => {
  return (
    <div className="news-filter-input">
      <select id="filter-select" className="filter-select">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
    </div>
  );
};

export default NewsFilterInput;

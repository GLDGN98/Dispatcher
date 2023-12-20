import React from "react";
import NewsFilterInput from "./news-filter-input";

const NewsFilter = () => {
  return (
    <div className="news-filter">
      <NewsFilterInput />
      <NewsFilterInput />
      <NewsFilterInput />
    </div>
  );
};

export default NewsFilter;

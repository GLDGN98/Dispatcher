import React, { useState } from "react";
import NewsFilterInput from "./news-filter-input";
import { newsSerivce } from "../services/news-service";

const NewsFilter = ({ filterBy, setFilterBy }) => {
  function handleChange(ev, filterName) {
    setFilterBy((prevFilterBy) => ({
      ...prevFilterBy,
      [filterName]: ev.target.value,
    }));
  }

  return (
    <div className="news-filter">
      <NewsFilterInput
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        filterName={"country"}
        handleChange={handleChange}
      />
      {/* <NewsFilterInput
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        filterName={"Category"}
      />
      <NewsFilterInput
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        filterName={"Sources"}
      /> */}
    </div>
  );
};

export default NewsFilter;

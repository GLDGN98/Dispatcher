import React, { useState } from "react";
import NewsList from "../components/news-list";
import NewsFilter from "../components/news-filter";
import { newsSerivce } from "../services/news-service";
import GraphList from "../components/graph/graph-list";

const MainPage = () => {
  return (
    <div>
      {/* <div className="main-container"> */}
      <NewsFilter />
      <div className="sep"></div>
      <NewsList />
      {/* <GraphList /> */}
    </div>
  );
};

export default MainPage;

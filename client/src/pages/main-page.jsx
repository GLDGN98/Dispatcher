import React, { useState } from "react";
import NewsList from "../components/news-list";
import NewsFilter from "../components/news-filter";
import { newsSerivce } from "../services/news-service";
import GraphList from "../components/graph/graph-list";

const MainPage = () => {
  const [filterBy, setFilterBy] = useState(
    newsSerivce.getEmptyArticleFilters()
  );

  return (
    <div className="main-container">
      <NewsFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      <div className="sep"></div>
      <NewsList filterBy={filterBy} />
      {/* <GraphList /> */}
    </div>
  );
};

export default MainPage;

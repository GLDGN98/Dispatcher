import React, { useEffect, useState } from "react";
import { newsSerivce } from "../services/news-service";
import NewsPreview from "./news-preview";

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    const fetchedNews = await newsSerivce.query();
    setNews(fetchedNews);
  }

  return (
    <div className="news-list">
      <h3>Top Headlines in Israel</h3>
      {news.map((article) => (
        <li key={article.title}>
          <NewsPreview article={article} />
        </li>
      ))}
    </div>
  );
};

export default NewsList;

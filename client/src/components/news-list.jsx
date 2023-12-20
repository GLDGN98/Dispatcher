import React, { useEffect, useState, useRef } from "react";
import { newsSerivce } from "../services/news-service";
import NewsPreview from "./news-preview";
import { useQuery } from "react-query";

const NewsList = (filterBy) => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const { data: searchTerm } = useQuery("searchTerm", () => {}, {
    initialData: "", // Initial value of searchTerm
  });

  useEffect(() => {
    setNews([]);
    setPage(1);
    setHasMore(true);
    fetchInitialNews();
  }, [searchTerm, filterBy]);

  useEffect(() => {
    if (!hasMore || loading) return;

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    };

    observer.current = new IntersectionObserver(handleObserver, options);
    observer.current.observe(document.getElementById("observer-element"));

    return () => observer.current.disconnect();
  }, [hasMore, loading]);

  const fetchInitialNews = async () => {
    try {
      setLoading(true);
      const fetchedNews = await newsSerivce.query(1, searchTerm, filterBy);
      console.log(fetchedNews);
      setNews(fetchedNews);

      if (fetchedNews.length < 10) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreNews = async () => {
    try {
      setLoading(true);
      const fetchedNews = await newsSerivce.query(page, searchTerm, filterBy);
      setNews((prevNews) => [...prevNews, ...fetchedNews]);

      if (fetchedNews.length === 0 || fetchedNews.length < 10) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleObserver = (entries) => {
    const target = entries[0];

    if (target.isIntersecting) {
      fetchMoreNews();
    }
  };

  return (
    <div className="news-list">
      <h3>Top Headlines in {filterBy.filterBy.country}</h3>
      {news.map((article, index) => (
        <li key={index}>
          <NewsPreview article={article} />
        </li>
      ))}
      {loading && <p>Loading...</p>}
      {hasMore && <div id="observer-element"></div>}
    </div>
  );
};

export default NewsList;

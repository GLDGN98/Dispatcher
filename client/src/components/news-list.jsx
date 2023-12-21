import React, { useEffect, useState, useRef } from "react";
import { newsService } from "../services/news-service";
import NewsPreview from "./news-preview";
import { useQuery, useQueryClient } from "react-query";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const queryClient = useQueryClient();
  const { data: filterBy } = useQuery("filterBy", () =>
    queryClient.getQueryData("filterBy")
  );

  useEffect(() => {
    setNews([]);
    setPage(1);
    setHasMore(true);
    fetchInitialNews();
  }, [filterBy]);

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
      const fetchedNews = await newsService.query(1, filterBy);
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
      const fetchedNews = await newsService.query(page);
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
    console.log("Observer triggered!", target);

    if (target.isIntersecting) {
      fetchMoreNews();
    }
  };

  return (
    <div className="news-list">
      <h3>{filterBy.selectedOption || "Top Headlines"} in Israel</h3>
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

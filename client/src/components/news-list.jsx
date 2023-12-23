import React, { useEffect, useRef } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { newsService } from "../services/news-service";
import NewsPreview from "./news-preview";
import { useState } from "react";
import Loader from "./loader";
import NoData from "./no-data";

const NewsList = () => {
  const [results, setResults] = useState(0);
  const observer = useRef();
  const queryClient = useQueryClient();

  const { data: filterBy } = useQuery("filterBy", () =>
    queryClient.getQueryData("filterBy")
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      ["news", filterBy],
      ({ pageParam = 1 }) => newsService.query(pageParam, filterBy),
      {
        getNextPageParam: (lastPage, allPages) => {
          const totalResults = lastPage.totalResults;
          const currentPageNumber = allPages.length;
          const totalPages = Math.ceil(totalResults / 10); // Assuming pageSize is 10

          if (currentPageNumber < totalPages) {
            return currentPageNumber + 1;
          } else {
            return undefined; // No more pages
          }
        },
        onSuccess: (data) => {
          // Update total results when new data is fetched
          setResults(data.pages[0].totalResults);
        },
      }
    );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "200px",
      threshold: 0.05,
    };

    const observerCallback = (entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    observer.current = new IntersectionObserver(observerCallback, options);
    const element = document.getElementById("observer-element");
    if (element) observer.current.observe(element);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  const shouldRenderHeadlinesTitle =
    (filterBy.selectedOption == "Top Headlines" &&
      !filterBy.sources &&
      !filterBy.country) ||
    filterBy.country == "il";

  return (
    <div className="news-list-wrapper">
      {shouldRenderHeadlinesTitle && (
        <h3 className="top-headlines-il">Top Headlines in Israel</h3>
      )}
      {!shouldRenderHeadlinesTitle && (
        <p className="news-total-results">{results} Total Results</p>
      )}
      <ul className="news-list">
        {isLoading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : data?.pages[0]?.articles.length === 0 ? ( // Check if there are no articles
          <div className="no-news-container">
            <NoData />
          </div>
        ) : (
          <>
            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.articles.map((article, index) => (
                  <li key={index}>
                    <NewsPreview article={article} />
                  </li>
                ))}
              </React.Fragment>
            ))}
            {isFetchingNextPage && (
              <div className="loader-container">
                <Loader />
              </div>
            )}
          </>
        )}

        <div id="observer-element" />
      </ul>
    </div>
  );
};

export default NewsList;

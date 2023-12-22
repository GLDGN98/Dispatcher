import React, { useEffect, useRef } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { newsService } from "../services/news-service";
import NewsPreview from "./news-preview";

const NewsList = () => {
  const observer = useRef();
  const queryClient = useQueryClient();

  const { data: filterBy } = useQuery("filterBy", () =>
    queryClient.getQueryData("filterBy")
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
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

  return (
    <div className="news-list">
      <h3>{filterBy?.selectedOption || "Top Headlines"} in Israel</h3>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.articles.map((article, index) => (
            <li key={index}>
              <NewsPreview article={article} />
            </li>
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <p>Loading more news...</p>}
      <div id="observer-element" />
    </div>
  );
};

export default NewsList;

import React from "react";
import { utilService } from "../services/util-service";

const NewsPreview = ({ article }) => {
  const navigateToArticle = () => {
    // Check if the article has a valid URL
    if (article.url) {
      // Open the article URL in a new tab
      window.open(article.url, "_blank");
    } else {
      console.warn("Article does not have a valid URL.");
    }
  };

  return (
    <div className="news-preview">
      {article.urlToImage && (
        <div className="news-image">
          <img
            className="article-image"
            src={article.urlToImage}
            alt="Article Image"
          />
        </div>
      )}
      <div className="news-info">
        <p className="published-at">
          {utilService.formatDateTime(article.publishedAt)}
        </p>
        <h4>{article.title}</h4>
        <p className="news-source">{article.source.name}</p>
        <p className="news-desc">{article.content}</p>
        <button className="news-cta" onClick={navigateToArticle}>
          NAVIGATE TO DISPATCH{" "}
          <i className="cta-arrow">
            <svg
              width="18"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.00027 9.03284L21 9.03284"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.06653 17.0651L0.999969 9.03323L9.06653 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
        </button>
      </div>
    </div>
  );
};

export default NewsPreview;

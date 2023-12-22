import { storageService } from "./storage-service.js";
import axios from "axios";

const STORAGE_KEY = "newsDB";

export const newsService = {
  query,
  getEmptyArticleFilters,
};

async function query(page = 1, filterBy = {}) {
  try {
    const apiData = await fetchNewsFromApi(page, filterBy);
    if (page === 1) {
      storageService.saveToStorage(STORAGE_KEY, apiData);
    }
    return apiData;
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
}

async function fetchNewsFromApi(page, filterBy) {
  const apiKey = "a0549b44b1cd4643b29c4cbd5556a4d0";
  const pageSize = 10;
  const selectedOption =
    filterBy.selectedOption === "Top Headlines"
      ? "top-headlines"
      : "everything";

  let apiUrl = `https://newsapi.org/v2/${selectedOption}?pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

  if (selectedOption === "top-headlines") {
    if (filterBy.sources) {
      // If sources are provided, use only sources
      apiUrl += `&sources=${filterBy.sources}`;
      console.log(apiUrl);
    } else {
      // Otherwise, use country and category
      const country = filterBy.country || "il";
      apiUrl += `&country=${country}`;
      if (filterBy.category) {
        apiUrl += `&category=${filterBy.category}`;
      }
      console.log(apiUrl);
    }
  } else {
    // For 'everything' endpoint, use the search term
    apiUrl += `&q=${filterBy.searchTerm || "news"}`;
  }

  try {
    const response = await axios.get(apiUrl);
    return {
      articles: response.data.articles,
      totalResults: response.data.totalResults,
    };
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
}

function getEmptyArticleFilters() {
  return {
    source: "",
    category: "",
    country: "",
    selectedOption: "Top Headlines",
    searchTerm: "",
  };
}

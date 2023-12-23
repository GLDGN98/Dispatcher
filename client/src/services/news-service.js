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
  const apiKey = "4779edd0ba2744748a189dc7f2303618";
  const pageSize = 10;
  const selectedOption =
    filterBy.selectedOption === "Top Headlines"
      ? "top-headlines"
      : "everything";

  let apiUrl = `https://newsapi.org/v2/${selectedOption}?pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

  if (selectedOption === "top-headlines") {
    if (filterBy.searchTerm) {
      apiUrl += `&q=${filterBy.searchTerm || ""}`;
    }
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
    if (filterBy.from && filterBy.to) {
      apiUrl += `&from=${filterBy.from}&to=${filterBy.to}`;
    }

    // Handle Sources
    if (filterBy.sources) {
      apiUrl += `&sources=${filterBy.sources}`;
    }

    // Handle SortBy
    if (filterBy.sortBy) {
      apiUrl += `&sortBy=${filterBy.sortBy}`;
    }

    // Handle Language
    if (filterBy.language) {
      apiUrl += `&language=${filterBy.language}`;
    }
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
    sources: "",
    category: "",
    country: "",
    selectedOption: "Top Headlines",
    searchTerm: "",
    language: "",
    sortBy: "",
    from: "",
    to: "",
  };
}

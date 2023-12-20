import { storageService } from "./storage-service.js";
import axios from "axios";

const STORAGE_KEY = "newsDB";

export const newsSerivce = {
  query,
  getEmptyArticleFilters,
};

async function query(page = 1, searchTerm = "", filterBy = {}) {
  try {
    const apiData = await fetchNewsFromApi(page, searchTerm, filterBy);
    if (page === 1) {
      // Save to storage only when fetching the first page
      storageService.saveToStorage(STORAGE_KEY, apiData);
    }
    return apiData;
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
}

async function fetchNewsFromApi(page, searchTerm, filterBy) {
  const apiKey = "a2edfe9402db4471b4a844e8ec95734f";
  const country = filterBy.filterBy.country || "il";
  console.log("country", country);
  const pageSize = 10;
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}&q=${searchTerm}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data.articles;
    console.log(data);
    return data;
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
  };
}

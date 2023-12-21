import { storageService } from "./storage-service.js";
import axios from "axios";

const STORAGE_KEY = "newsDB";

export const newsService = {
  query,
  getEmptyArticleFilters,
};

async function query(page = 1, filterBy = {}) {
  try {
    console.log(filterBy);
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
  const apiKey = "0326ea8f01b04c1caaf744b3ef118073";
  const country = filterBy.country || "us";
  const searchTerm = filterBy.searchTerm;
  const pageSize = 10;
  const selectedOption =
    filterBy.selectedOption === "Top Headlines"
      ? "top-headlines"
      : "everything";
  const qParam = searchTerm ? `&q=${searchTerm}` : "";
  const category = filterBy.category || "";

  const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}${qParam}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data.articles;
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
    selectedOption: "",
    searchTerm: "",
  };
}

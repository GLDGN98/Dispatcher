import { storageService } from "./storage-service.js";
import axios from "axios";

const STORAGE_KEY = "newsDB";

export const newsSerivce = {
  query,
};

async function query(page = 1, searchTerm = "") {
  try {
    const apiData = await fetchNewsFromApi(page, searchTerm);
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

async function fetchNewsFromApi(page, searchTerm) {
  const apiKey = "df72873f77ed46779171bdc6721bf2fa";
  const country = "us";
  const pageSize = 10;
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}&q=${searchTerm}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data.articles;
    return data;
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
}

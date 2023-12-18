import { storageService } from "./storage-service.js";
import axios from "axios";

const STORAGE_KEY = "newsDB"

export const newsSerivce = {query}

async function query() {
    // Check if there is data in local storage
    let news = storageService.loadFromStorage(STORAGE_KEY);
    if (!news) {
      // If local storage is empty, fetch data from the API
      try {
        const apiData = await fetchNewsFromApi();
        storageService.saveToStorage(STORAGE_KEY, apiData);
        news = apiData;
      } catch (error) {
        console.error('Error fetching data from the API:', error);
        // Handle error accordingly
      }
    }
    return news;
  }
  

  async function fetchNewsFromApi() {
    const apiKey = 'df72873f77ed46779171bdc6721bf2fa';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
  
      // Check if the response status is 'ok'
      if (data.status === 'ok') {
        const articles = data.articles;
        console.log(articles);
        return articles;
      } else {
        console.error('Error fetching news:', data);
        throw new Error(`News API error: ${data.status}`);
      }
    } catch (error) {
      console.error('Error fetching data from the API:', error);
      throw error; // rethrow the error for the caller to handle
    }
  }
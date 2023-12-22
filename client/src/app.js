// App.js
import React from "react";
import { Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import MainPage from "./pages/main-page";
import AppHeader from "./components/app-header";
import { newsService } from "./services/news-service";

const queryClient = new QueryClient();

queryClient.setQueryData("filterBy", newsService.getEmptyArticleFilters());
queryClient.setQueryData("filterState", { filterState: "Top Headlines" });

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="main-container">
        <AppHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;

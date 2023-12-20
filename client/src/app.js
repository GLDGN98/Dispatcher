// App.js
import React from "react";
import { Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import MainPage from "./pages/main-page";
import AppHeader from "./components/app-header";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <AppHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;

import React from "react";
import { Routes, Route } from "react-router";
import MainPage from "./pages/main-page";
import AppHeader from "./components/app-header";

const App = () => {
  return (
    <div>
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default App;

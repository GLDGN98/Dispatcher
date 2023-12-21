import React from "react";
import SearchBar from "./search-bar";
import logo from "../assets/imgs/Dispatcher Logo.svg";

const AppHeader = () => {
  return (
    <div className="app-header full">
      <div className="logo">
        <img src={logo} alt="Dispatcher Logo" />
      </div>
      <SearchBar />
    </div>
  );
};

export default AppHeader;

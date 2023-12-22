import React, { useState } from "react";
import NewsFilterInput from "./news-filter-input";
import { newsService } from "../services/news-service";
import { useQuery, queryClient, useQueryClient } from "react-query";

const NewsFilter = () => {
  const [openRadioOption, setOpenRadioOption] = useState(null); // Track the open radio option

  const queryClient = useQueryClient();
  const { data: filterBy } = useQuery("filterBy", () =>
    queryClient.getQueryData("filterBy")
  );

  const handleInputClick = (filterName) => {
    setOpenRadioOption(filterName === openRadioOption ? null : filterName);
  };

  const handleChange = (ev) => {
    const { value, name } = ev.target;
    queryClient.setQueryData("filterBy", (prevFilterBy) => ({
      ...prevFilterBy,
      [name]: value,
    }));
  };

  const filterOptions = {
    country: [
      { code: "ae", name: "United Arab Emirates" },
      { code: "ar", name: "Argentina" },
      { code: "at", name: "Austria" },
      { code: "au", name: "Australia" },
      { code: "be", name: "Belgium" },
      { code: "bg", name: "Bulgaria" },
      { code: "br", name: "Brazil" },
      { code: "ca", name: "Canada" },
      { code: "ch", name: "Switzerland" },
      { code: "cn", name: "China" },
      { code: "co", name: "Colombia" },
      { code: "cu", name: "Cuba" },
      { code: "cz", name: "Czech Republic" },
      { code: "de", name: "Germany" },
      { code: "eg", name: "Egypt" },
      { code: "fr", name: "France" },
      { code: "gb", name: "United Kingdom" },
      { code: "gr", name: "Greece" },
      { code: "hk", name: "Hong Kong" },
      { code: "hu", name: "Hungary" },
      { code: "id", name: "Indonesia" },
      { code: "ie", name: "Ireland" },
      { code: "il", name: "Israel" },
      { code: "in", name: "India" },
      { code: "it", name: "Italy" },
      { code: "jp", name: "Japan" },
      { code: "kr", name: "South Korea" },
      { code: "lt", name: "Lithuania" },
      { code: "lu", name: "Luxembourg" },
      { code: "lv", name: "Latvia" },
      { code: "ma", name: "Morocco" },
      { code: "mx", name: "Mexico" },
      { code: "my", name: "Malaysia" },
      { code: "ng", name: "Nigeria" },
      { code: "nl", name: "Netherlands" },
      { code: "no", name: "Norway" },
      { code: "nz", name: "New Zealand" },
      { code: "ph", name: "Philippines" },
      { code: "pl", name: "Poland" },
      { code: "pt", name: "Portugal" },
      { code: "ro", name: "Romania" },
      { code: "rs", name: "Serbia" },
      { code: "sa", name: "Saudi Arabia" },
      { code: "se", name: "Sweden" },
      { code: "sg", name: "Singapore" },
      { code: "sk", name: "Slovakia" },
      { code: "th", name: "Thailand" },
      { code: "tr", name: "Turkey" },
      { code: "tw", name: "Taiwan" },
      { code: "ua", name: "Ukraine" },
      { code: "us", name: "United States" },
      { code: "ve", name: "Venezuela" },
      { code: "za", name: "South Africa" },
    ],
    category: [
      "Business",
      "Entertainment",
      "General",
      "Health",
      "Science",
      "Sports",
      "Technology",
    ].map((cat) => cat.toLowerCase()),
    sources: [
      { id: "abc-news", name: "ABC News" },
      { id: "bbc-news", name: "BBC News" },
      { id: "cnn", name: "CNN" },
      { id: "fox-news", name: "Fox News" },
      { id: "the-huffington-post", name: "The Huffington Post" },
      { id: "the-new-york-times", name: "The New York Times" },
      { id: "reuters", name: "Reuters" },
      { id: "the-wall-street-journal", name: "The Wall Street Journal" },
      { id: "the-washington-post", name: "The Washington Post" },
      { id: "usa-today", name: "USA Today" },
      { id: "mako", name: "Mako" },
    ], // Add your sources here
  };

  return (
    <div className="news-filter">
      {Object.keys(filterOptions).map((filterName) => (
        <NewsFilterInput
          key={filterName}
          filterName={filterName}
          options={filterOptions[filterName]}
          handleChange={handleChange}
          openRadioOption={openRadioOption === filterName}
          onInputClick={() => handleInputClick(filterName)}
        />
      ))}
    </div>
  );
};

export default NewsFilter;

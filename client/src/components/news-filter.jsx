import React, { useState } from "react";
import NewsFilterInput from "./news-filter-input";
import { useQuery, useQueryClient } from "react-query";
import { filterOptions, additionalFilterOptions } from "../utils/data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewsFilter = () => {
  const [openRadioOption, setOpenRadioOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date

  const queryClient = useQueryClient();
  const { data: filterBy } = useQuery("filterBy", () =>
    queryClient.getQueryData("filterBy")
  );
  const { data: filterState } = useQuery("filterState", () =>
    queryClient.getQueryData("filterState")
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

  return (
    <div className="news-filter">
      {filterState.filterState === "Top Headlines" &&
        Object.keys(filterOptions).map((filterName) => (
          <NewsFilterInput
            key={filterName}
            filterName={filterName}
            options={
              filterName === "dates" ? selectedDate : filterOptions[filterName]
            }
            handleChange={handleChange}
            openRadioOption={openRadioOption === filterName}
            onInputClick={() => handleInputClick(filterName)}
            setSelectedDate={setSelectedDate} // Pass setSelectedDate to child
          />
        ))}

      {filterState.filterState === "Everything" &&
        Object.keys(additionalFilterOptions).map((filterName) => (
          <NewsFilterInput
            key={filterName}
            filterName={filterName}
            options={
              filterName === "dates"
                ? selectedDate
                : additionalFilterOptions[filterName]
            }
            handleChange={handleChange}
            openRadioOption={openRadioOption === filterName}
            onInputClick={() => handleInputClick(filterName)}
            setSelectedDate={setSelectedDate} // Pass setSelectedDate to child
          />
        ))}
    </div>
  );
};

export default NewsFilter;

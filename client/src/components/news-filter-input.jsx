import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewsFilterInput = ({
  filterName,
  options,
  handleChange,
  openRadioOption,
  onInputClick,
  setSelectedDate, // Prop to set the selected date in parent
  selectedValue,
}) => {
  const [localDate, setLocalDate] = useState(new Date());

  const handleDateChange = (date) => {
    setLocalDate(date); // Update local state
    setSelectedDate(date); // Update the date in the parent component
    // If necessary, format the date and update the filter
    // Example: handleChange({ target: { name: 'date', value: formattedDate } });
  };

  console.log(filterName, "filter name");

  if (filterName === "dates" && openRadioOption) {
    return (
      <div className="news-filter-input">
        <div className="input-title" onClick={onInputClick}>
          Dates
        </div>
        <DatePicker
          selected={localDate}
          onChange={handleDateChange}
          // Additional props like dateFormat, minDate, maxDate can be added here
        />
      </div>
    );
  }
  const capitalizedFilterName =
    filterName.charAt(0).toUpperCase() + filterName.slice(1);

  return (
    <div className="news-filter-input">
      <div className="input-title" onClick={onInputClick}>
        {capitalizedFilterName}
      </div>
      {openRadioOption && (
        <div className="radio-open">
          <div className="reset-option">
            <input
              type="radio"
              id={`${filterName}-empty`}
              name={filterName}
              value=""
              onChange={handleChange}
            />
            <label htmlFor={`${filterName}-empty`}>Reset</label>
          </div>
          {options.map((option) => {
            const isObjectOption = typeof option === "object";
            const optionValue = isObjectOption ? option.id : option;
            const optionDisplay = isObjectOption
              ? option.name
              : option.charAt(0).toUpperCase() + option.slice(1);
            const isSelected = optionValue === selectedValue;

            return (
              <div className="radio-select-option" key={optionValue}>
                <input
                  type="radio"
                  id={`${filterName}-${optionValue}`}
                  name={filterName}
                  value={optionValue}
                  onChange={handleChange}
                />
                <label
                  style={{
                    backgroundColor: isSelected
                      ? "rgba(223, 224, 235, 0.41)"
                      : "",
                  }}
                  htmlFor={`${filterName}-${optionValue}`}
                >
                  {optionDisplay}
                </label>
                <br />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NewsFilterInput;

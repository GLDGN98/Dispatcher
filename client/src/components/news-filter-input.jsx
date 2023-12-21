import React from "react";
import dropdown from "../assets/imgs/dropdown.svg";

const NewsFilterInput = ({
  filterName,
  options,
  handleChange,
  openRadioOption,
  onInputClick,
}) => {
  const capitalizedFilterName =
    filterName.charAt(0).toUpperCase() + filterName.slice(1);

  return (
    <div className="news-filter-input">
      <div className="input-title" onClick={onInputClick}>
        {capitalizedFilterName}
      </div>
      {openRadioOption && (
        <div className="radio-open">
          {/* Add an empty option for reset */}
          <input
            type="radio"
            id={`${filterName}-empty`}
            name={filterName}
            value=""
            onChange={(ev) => handleChange(ev)}
            checked={options.length === 0}
          />
          <label htmlFor={`${filterName}-empty`}>Reset</label>
          <br />
          {options.map((option) => (
            <div className="radio-select-option" key={option.code || option}>
              <input
                type="radio"
                id={`${filterName}-${option.code || option}`}
                name={filterName}
                value={option.code || option}
                onChange={(ev) => handleChange(ev)}
              />
              <label htmlFor={`${filterName}-${option.code || option}`}>
                {typeof option === "string"
                  ? option.charAt(0).toUpperCase() + option.slice(1)
                  : option.name ||
                    (typeof option === "object" && option.toString()) ||
                    option}
              </label>
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFilterInput;

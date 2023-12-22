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
          <div className="reset-option">
            <input
              type="radio"
              id={`${filterName}-empty`}
              name={filterName}
              value=""
              onChange={handleChange}
              checked={options.length === 0}
            />
            <label htmlFor={`${filterName}-empty`}>Reset</label>
          </div>
          {options.map((option) => {
            const isStringOption = typeof option === "string";
            const optionValue = isStringOption ? option : option.id;
            const optionDisplay = isStringOption
              ? option.charAt(0).toUpperCase() + option.slice(1)
              : option.name;

            return (
              <div className="radio-select-option" key={optionValue}>
                <input
                  type="radio"
                  id={`${filterName}-${optionValue}`}
                  name={filterName}
                  value={optionValue}
                  onChange={handleChange}
                />
                <label htmlFor={`${filterName}-${optionValue}`}>
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

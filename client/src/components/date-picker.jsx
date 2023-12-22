import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyComponent = () => {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
    // Update your API call or state with the selected date
  };

  return (
    <div>
      <DatePicker selected={startDate} onChange={handleDateChange} />
    </div>
  );
};

export default MyComponent;

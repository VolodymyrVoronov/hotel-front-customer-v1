import { useState } from "react";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";

import "react-datepicker/dist/react-datepicker.css";

import styles from "./DatePicker.module.css";

const DatePickerComponent = (): JSX.Element => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const onDatePickerChange = (dates: [Date, Date]) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };

  console.log(startDate.toISOString(), endDate?.toISOString());

  return (
    <DatePicker
      className={styles["date-picker"]}
      calendarClassName={styles["date-picker-calendar"]}
      dateFormat="dd/MM/yyyy"
      minDate={new Date()}
      todayButton="Today"
      selected={startDate}
      onChange={onDatePickerChange}
      startDate={startDate}
      endDate={endDate}
      excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
      selectsRange

      // inline
    />
  );
};

export default DatePickerComponent;

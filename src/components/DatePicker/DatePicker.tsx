import { memo, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import cn from "classnames";

import "react-datepicker/dist/react-datepicker.css";

import styles from "./DatePicker.module.css";

interface IDatePickerComponentProps {
  excludeDates?: [string, string][];
  endDate?: Date | null;
  onDatePickerChange?: (dates: [Date, Date]) => void;

  className?: string;
}

const DatePickerComponent = memo(
  ({
    excludeDates: excludeDatesProp,
    endDate: endDateProp = null,
    onDatePickerChange: onDatePickerChangeProp,

    className,
  }: IDatePickerComponentProps): JSX.Element => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState<Date | null>(() => {
      if (endDateProp) {
        return new Date(endDateProp);
      } else {
        return null;
      }
    });
    const [excludedDates, setExcludedDates] = useState<Date[]>([]);

    const onDatePickerChange = (dates: [Date, Date]) => {
      const [start, end] = dates;

      setStartDate(start);
      setEndDate(end);

      if (start && end) {
        onDatePickerChangeProp?.(dates);
      }
    };

    useEffect(() => {
      if (endDateProp === null) {
        setEndDate(null);
      }
    }, [endDateProp]);

    useEffect(() => {
      if (excludeDatesProp) {
        const excludedDatesTemp: Date[] = [];

        for (const element of excludeDatesProp) {
          const [startDate, endDate] = element;

          const differenceInDays = differenceInCalendarDays(
            new Date(endDate),
            new Date(startDate)
          );

          for (let i = 0; i <= differenceInDays; i++) {
            excludedDatesTemp.push(addDays(new Date(startDate), i));
          }
        }

        setExcludedDates(excludedDatesTemp);
      }
    }, [excludeDatesProp]);

    return (
      <DatePicker
        className={cn(styles["date-picker"], className)}
        wrapperClassName={styles["date-picker-wrapper"]}
        calendarClassName={styles["date-picker-calendar"]}
        calendarIconClassname={styles["date-picker-icon"]}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        todayButton="Today"
        selected={startDate}
        onChange={onDatePickerChange}
        startDate={startDate}
        endDate={endDate}
        excludeDates={excludedDates}
        selectsRange
        required
      />
    );
  }
);

export default DatePickerComponent;

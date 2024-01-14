import { ChangeEvent, useEffect, useState } from "react";
import cn from "classnames";

import { checkEmptyFields } from "../../helpers";

import DatePickerComponent from "../../components/DatePicker/DatePicker";
import Input from "../Input/Input";
import Button from "../Button/Button";

import styles from "./BookingForm.module.css";
import IconButton from "../IconButton/IconButton";

interface IBookingFormProps {
  roomId: string;
  excludeDates: [string, string][];
  className?: string;
}

interface IFormData {
  name: string;
  email: string;
  message: string;
  phone: string;
  startDate: Date;
  endDate: Date | null;
}

const initialFormData = {
  name: "",
  email: "",
  message: "",
  phone: "",
  startDate: new Date(),
  endDate: null,
};

const BookingForm = ({
  roomId,
  excludeDates: excludeDatesProp,
  className,
}: IBookingFormProps): JSX.Element => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [excludeDates, setExcludeDates] = useState<[string, string][]>([]);

  const [formData, setFormData] = useState<IFormData>(initialFormData);

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onDatePickerChange = (dates: [Date, Date]): void => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  };

  const onClearButtonClick = (): void => {
    setStartDate(new Date());
    setEndDate(null);
    setFormData(initialFormData);
  };

  useEffect(() => {
    setExcludeDates(excludeDatesProp);
  }, [excludeDatesProp]);

  useEffect(() => {
    if (startDate && endDate) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        startDate,
        endDate,
      }));
    }
  }, [startDate, endDate]);

  console.log(formData);

  return (
    <div className={cn(styles["booking-form-wrapper"], className)}>
      <div className={styles["booking-form-left"]}>
        <p className={styles["booking-form-left-text"]}>
          Chose start date and end date
        </p>

        <DatePickerComponent
          className={styles["booking-form-date-picker"]}
          onDatePickerChange={onDatePickerChange}
          excludeDates={excludeDates}
          endDate={endDate}
        />

        <form className={styles["booking-form"]}>
          <label className={styles["booking-form-label"]}>
            Name{" "}
            <Input
              inputType="text"
              name="name"
              classNameInput={styles["booking-form-input"]}
              required
              value={formData.name}
              onChange={onInputChange}
            />
          </label>

          <label className={styles["booking-form-label"]}>
            Email{" "}
            <Input
              inputType="email"
              name="email"
              classNameInput={styles["booking-form-input"]}
              required
              value={formData.email}
              onChange={onInputChange}
            />
          </label>

          <label className={styles["booking-form-label"]}>
            Phone{" "}
            <Input
              inputType="tel"
              name="phone"
              classNameInput={styles["booking-form-input"]}
              required
              value={formData.phone}
              onChange={onInputChange}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            />
            <small>Format: 123-456-7890</small>
          </label>

          <label className={styles["booking-form-label"]}>
            Message{" "}
            <textarea
              name="message"
              className={styles["booking-form-area"]}
              rows={5}
              required
              value={formData.message}
              onChange={onInputChange}
            />
          </label>

          <div className={styles["booking-form-buttons"]}>
            <Button
              className={styles["booking-form-button"]}
              disabled={!checkEmptyFields(formData, "every")}
              hasIcon={false}
              type="submit"
            >
              Submit
            </Button>

            <IconButton
              onClick={onClearButtonClick}
              type="button"
              title="clear"
              iconSrc="/icons/plus-icon.svg"
              iconAlt="close"
              className={styles["booking-form-button-clear"]}
            />
          </div>
        </form>
      </div>

      <div className={styles["booking-form-right"]}>
        {/* <BookingDetails
          roomId={roomId}
          startDate={startDate}
          endDate={endDate}
          className={styles["booking-form-details"]}
        /> */}
      </div>
    </div>
  );
};

export default BookingForm;

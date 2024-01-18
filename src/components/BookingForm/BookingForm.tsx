import {
  ChangeEvent,
  useEffect,
  useState,
  Suspense,
  lazy,
  useCallback,
} from "react";
import cn from "classnames";
import { useLocalStorageState } from "ahooks";
import useSWRMutation from "swr/mutation";

import { checkEmptyFields } from "../../helpers";
import { API_URL } from "../../constants";

import Input from "../Input/Input";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import Loader from "../Loader/Loader";

const DatePickerComponent = lazy(
  () => import("../../components/DatePicker/DatePicker")
);
const BookingDetails = lazy(
  () => import("../../components/BookingDetails/BookingDetails")
);

import styles from "./BookingForm.module.css";

interface IBookingFormProps {
  roomId: string | undefined;
  roomTitle: string | undefined;
  roomPrice: number | undefined;
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

async function checkRoomAvailability(url: string, { arg }: { arg: unknown }) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

const BookingForm = ({
  roomId,
  roomTitle,
  roomPrice,
  excludeDates,
  className,
}: IBookingFormProps): JSX.Element => {
  const { trigger, data, isMutating } = useSWRMutation(
    `${API_URL}/availability`,
    checkRoomAvailability
  );

  // console.log(data, isMutating);

  const [formDataLocalStorage, setFormDataLocalStorage] =
    useLocalStorageState<IFormData>("form-data-state", {
      defaultValue: initialFormData,
    });

  const [formData, setFormData] = useState<IFormData>(() => {
    if (formDataLocalStorage) {
      return formDataLocalStorage;
    } else {
      return initialFormData;
    }
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isRoomAvailable, setIsRoomAvailable] = useState(false);

  const onFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
  };

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    setFormDataLocalStorage({ ...formData, [name]: value });
  };

  const onDatePickerChange = useCallback(
    (dates: [Date, Date]): void => {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    },
    [setStartDate, setEndDate]
  );

  const onClearButtonClick = (): void => {
    setStartDate(new Date());
    setEndDate(null);
    setFormData(initialFormData);
    setFormDataLocalStorage(initialFormData);
    setIsRoomAvailable(false);
  };

  useEffect(() => {
    if (data) {
      setIsRoomAvailable(data.available);
    }
  }, [data]);

  useEffect(() => {
    if (startDate && endDate) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        startDate,
        endDate,
      }));

      setFormDataLocalStorage({
        ...formData,
        startDate,
        endDate,
      });

      trigger({
        RoomID: roomId,
        StartDate: startDate,
        EndDate: endDate,
      });
    }
  }, [startDate, endDate]);

  console.log("isRoomAvailable", isRoomAvailable);
  

  return (
    <div className={cn(styles["booking-form-wrapper"], className)}>
      <div className={styles["booking-form-left"]}>
        <p className={styles["booking-form-left-text"]}>
          Chose start date and end date
        </p>

        <Suspense
          fallback={
            <Loader
              type="horizontal"
              className={styles["booking-form-left-loader"]}
            />
          }
        >
          <DatePickerComponent
            className={styles["booking-form-date-picker"]}
            onDatePickerChange={onDatePickerChange}
            excludeDates={excludeDates}
            endDate={formData.endDate}
          />
        </Suspense>

        <form className={styles["booking-form"]} onSubmit={onFormSubmit}>
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
              title="Book"
            >
              Book
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
        <Suspense fallback={<Loader />}>
          <BookingDetails
            price={roomPrice}
            title={roomTitle}
            startDate={formData.startDate}
            endDate={formData.endDate}
            name={formData.name}
            email={formData.email}
            phone={formData.phone}
            message={formData.message}
            className={styles["booking-details"]}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default BookingForm;

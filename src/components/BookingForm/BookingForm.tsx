import {
  ChangeEvent,
  useEffect,
  useState,
  Suspense,
  lazy,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import { useLocalStorageState } from "ahooks";
import useSWRMutation from "swr/mutation";
import { motion } from "framer-motion";
import { ToastOptions, toast } from "react-toastify";

import {
  calculateBookedDays,
  checkEmptyFields,
  postRequest,
} from "../../helpers";
import { API_URL, ROUTES } from "../../constants";

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

interface ICheckAvailabilityRequest {
  RoomID: string | undefined;
  StartDate: Date;
  EndDate: Date | null;
}

interface ICheckAvailabilityResponse {
  available: boolean;
}

interface IBookRoomRequest {
  RoomID: string;
  RoomPrice: number;
  TotalPrice: number;
  TotalBookedDays: number;
  Name: string;
  Email: string;
  Phone: string;
  Message: string;
  StartDate: Date;
  EndDate: Date;
}

interface IBookRoomResponse {
  booked: boolean;
  message: string;
}

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
} satisfies ToastOptions;

const toastSuccess = (message: string): void => {
  toast.success(message, {
    ...toastConfig,
  });
};

const toastError = (message: string): void => {
  toast.error(message, {
    ...toastConfig,
  });
};

const BookingForm = ({
  roomId,
  roomTitle,
  roomPrice,
  excludeDates,
  className,
}: IBookingFormProps): JSX.Element => {
  const {
    trigger: checkAvailability,
    data: availabilityData,
    isMutating: isLoadingAvailability,
  } = useSWRMutation(
    `${API_URL}/availability`,
    postRequest<ICheckAvailabilityRequest, ICheckAvailabilityResponse>
  );

  const { trigger: bookRoom, isMutating: isLoadingBookRoom } = useSWRMutation(
    `${API_URL}/bookings`,
    postRequest<IBookRoomRequest, IBookRoomResponse>
  );

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
  const [showBackToHomeButton, setShowBackToHomeButton] = useState(false);

  const onFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const bookedDays = calculateBookedDays(
      formData.startDate,
      formData.endDate
    );

    const totalCost =
      roomPrice && bookedDays !== 0 ? bookedDays * roomPrice : roomPrice;

    try {
      const newBooking = {
        RoomID: roomId,
        RoomPrice: roomPrice,
        TotalPrice: totalCost,
        TotalBookedDays: bookedDays,
        Name: formData.name,
        Email: formData.email,
        Phone: formData.phone,
        Message: formData.message,
        StartDate: formData.startDate,
        EndDate: formData.endDate,
      } as IBookRoomRequest;

      const res = (await bookRoom(newBooking)) as {
        booked: boolean;
        message: string;
      };

      if (!isLoadingBookRoom && res?.booked) {
        toastSuccess(res.message);
        setFormData(initialFormData);
        setFormDataLocalStorage(initialFormData);
        setStartDate(new Date());
        setEndDate(null);
        setIsRoomAvailable(false);
        setShowBackToHomeButton(true);
      } else {
        toastError(res.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message);
      }
    }
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
    if (availabilityData) {
      setIsRoomAvailable(availabilityData.available);
    }
  }, [availabilityData]);

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

      checkAvailability({
        RoomID: roomId,
        StartDate: startDate,
        EndDate: endDate,
      }).catch(() => {
        toastError("Something went wrong. Please try again later");
      });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      checkAvailability({
        RoomID: roomId,
        StartDate: formData.startDate,
        EndDate: formData.endDate,
      }).catch(() => {
        toastError("Something went wrong. Please try again later");
      });
    }
  }, []);

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
            startDate={formData.startDate}
            endDate={formData.endDate}
          />
        </Suspense>

        {!isRoomAvailable &&
          formData.endDate !== null &&
          !isLoadingAvailability && (
            <motion.span
              className={styles["booking-form-disabled-text"]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              These dates are not available for booking
            </motion.span>
          )}

        <fieldset
          disabled={!isRoomAvailable && !isLoadingAvailability}
          className={cn({
            [styles["booking-form-disabled"]]:
              !isRoomAvailable && !isLoadingAvailability,
          })}
        >
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
                disabled={!isRoomAvailable}
                type="button"
                title="clear"
                iconSrc="/icons/plus-icon.svg"
                iconAlt="close"
                className={styles["booking-form-button-clear"]}
              />
            </div>
          </form>
        </fieldset>
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

      {showBackToHomeButton && (
        <Link to={ROUTES.HOME} className={styles["booking-form-link"]}>
          Back to home
        </Link>
      )}
    </div>
  );
};

export default BookingForm;

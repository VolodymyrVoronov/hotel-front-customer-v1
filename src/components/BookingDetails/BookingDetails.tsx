import { motion } from "framer-motion";
import cn from "classnames";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import format from "date-fns/format";

import styles from "./BookingDetails.module.css";

interface IBookingDetailsProps {
  price: number | undefined;
  title: string | undefined;
  startDate: Date;
  endDate: Date | null;
  name: string;
  email: string;
  phone: string;
  message: string;

  className?: string;
}

const animation = {
  initial: { opacity: 0, filter: "blur(5px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  transition: { duration: 1 },
};

const BookingDetails = ({
  price,
  title,
  startDate: startDateProp,
  endDate: endDateProp,
  name,
  email,
  phone,
  message,

  className,
}: IBookingDetailsProps): JSX.Element => {
  const bookedDays =
    endDateProp === null
      ? 0
      : differenceInCalendarDays(endDateProp ?? new Date(), startDateProp) + 1;
  const totalCost = price && bookedDays === 0 ? bookedDays * price : price;

  const startDate = format(startDateProp, "dd/MM/yyyy");
  const endDate = endDateProp && format(endDateProp, "dd/MM/yyyy");

  return (
    <div className={cn(styles["booking-details"], className)}>
      <span className={styles["booking-details-title"]}>Summary</span>

      <table className={styles["booking-details-table"]}>
        <tbody>
          <tr className={styles["booking-details-row"]}>
            <td className={styles["booking-details-cell"]}>Room</td>
            <td className={styles["booking-details-cell"]}>{title ?? "N/A"}</td>
          </tr>

          <tr className={styles["booking-details-row"]}>
            <td className={styles["booking-details-cell"]}>Price</td>
            <td className={styles["booking-details-cell"]}>
              {price ? price : "N/A"}$ / night
            </td>
          </tr>

          <tr className={styles["booking-details-row"]}>
            <td className={styles["booking-details-cell"]}>Total cost</td>
            <motion.td
              className={styles["booking-details-cell"]}
              key={totalCost}
              {...animation}
            >
              {totalCost ? totalCost + "$" : "N/A"}
            </motion.td>
          </tr>

          <tr className={styles["booking-details-row"]}>
            <td className={styles["booking-details-cell"]}>Check-in</td>
            <motion.td
              className={styles["booking-details-cell"]}
              key={startDate}
              {...animation}
            >
              {startDate ? startDate : "N/A"}
            </motion.td>
          </tr>

          <tr className={styles["booking-details-row"]}>
            <td className={styles["booking-details-cell"]}>Check-out</td>
            <motion.td
              className={styles["booking-details-cell"]}
              key={endDate}
              {...animation}
            >
              {endDate ? endDate : "N/A"}
            </motion.td>
          </tr>

          <tr className={styles["booking-details-row"]}>
            <td className={styles["booking-details-cell"]}>Total Days</td>
            <motion.td
              className={styles["booking-details-cell"]}
              key={bookedDays}
              {...animation}
            >
              {bookedDays ? bookedDays : "0"}
            </motion.td>
          </tr>

          <tr className={styles["booking-details-row"]}>
            <td className={styles["booking-details-cell"]}>Name</td>
            <motion.td
              className={styles["booking-details-cell"]}
              key={name}
              {...animation}
            >
              {name ? name : "N/A"}
            </motion.td>
          </tr>

          <tr className={styles["booking-details-row"]}>
            <td className={styles["booking-details-cell"]}>Email</td>
            <motion.td
              className={styles["booking-details-cell"]}
              key={email}
              {...animation}
            >
              {email ? email : "N/A"}
            </motion.td>
          </tr>

          <tr className={styles["booking-details-row"]}>
            <td className={styles["booking-details-cell"]}>Phone</td>
            <motion.td
              className={styles["booking-details-cell"]}
              key={phone}
              {...animation}
            >
              {phone ? phone : "N/A"}
            </motion.td>
          </tr>

          <tr className={styles["booking-details-row"]}>
            <td className={styles["booking-details-cell"]}>Message</td>
            <motion.td
              className={styles["booking-details-cell"]}
              key={message}
              {...animation}
            >
              {message ? message : "N/A"}
            </motion.td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookingDetails;

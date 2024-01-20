import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

/**
 * Checks if the current pathname matches the pathname to check.
 *
 * @param {string} currentPathname - The current pathname.
 * @param {string} pathnameToCheck - The pathname to check.
 * @returns {boolean} Returns true if the current pathname matches the pathname to check, otherwise returns false.
 */
export const checkPath = (
  currentPathname: string,
  pathnameToCheck: string
): boolean => {
  if (currentPathname === "") {
    throw new Error("Current pathname is empty");
  }

  if (pathnameToCheck === "") {
    throw new Error("Pathname to check is empty");
  }

  return currentPathname === pathnameToCheck;
};

/**
 * Checks if there are any empty fields in an object.
 *
 * @param {object} data - The object to check for empty fields.
 * @param {"some" | "every"} method - The method to use for checking the fields. Default is "some".
 * @return {boolean} True if there are no empty fields, false otherwise.
 */
export const checkEmptyFields = <T extends object>(
  data: T,
  method: "some" | "every" = "some"
): boolean => {
  return Object.values(data)[method]((value) => value !== "");
};

/**
 * Calculates the number of booked days between a start date and an end date.
 *
 * @param {Date} startDate - the start date
 * @param {Date | null} endDate - the end date, can be null if booking is ongoing
 * @return {number} the number of booked days
 */
export const calculateBookedDays = (
  startDate: Date,
  endDate: Date | null
): number => {
  return endDate === null
    ? 0
    : differenceInCalendarDays(endDate ?? new Date(), startDate) + 1;
};

/**
 * Sends a POST request to the specified URL with the provided argument.
 *
 * @param {string} url - The URL to send the POST request to
 * @param {{ arg: T }} arg - The argument to be sent in the request body
 * @return {Promise<T>} The response data from the server
 */
export async function postRequest<T, U>(
  url: string,
  { arg }: { arg: T }
): Promise<U> {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ ...arg }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

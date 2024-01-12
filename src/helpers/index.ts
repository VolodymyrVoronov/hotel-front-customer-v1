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

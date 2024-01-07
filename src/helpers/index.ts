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

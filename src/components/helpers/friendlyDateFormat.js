import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

/**
 * Formats a given date into a friendly date format.
 *
 * @param {string} date - The date to be formatted. It should be in ISO format.
 * @return {string} The formatted date in the "dd MMM, yyyy" format.
 */
export const friendlyDateFormat = (date) => {
  if (!date) return "";
  const dateObj = parseISO(date);
  return format(dateObj, "dd MMM, yyyy", { locale: es });
};

import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

/**
 * Formats a given date into a friendly datetime string.
 *
 * @param {string} date - The date to be formatted.
 * @return {string} The formatted datetime string.
 */
export const friendlyDatetimeFormat = (date) => {
  if (!date) return "";
  const dateObj = parseISO(date);
  return format(dateObj, "hh:mm a - dd MMM, yyyy", { locale: es });
};

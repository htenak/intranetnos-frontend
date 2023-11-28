import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export const friendlyDateFormat = (date) => {
  const dateObj =
    typeof date === "string"
      ? parseISO(date, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date())
      : parseISO(date);

  return format(dateObj, "dd MMM, yyyy", { locale: es });
};

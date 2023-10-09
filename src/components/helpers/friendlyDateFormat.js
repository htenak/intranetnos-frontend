import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export const friendlyDateFormat = (date) => {
  const dateObj = parseISO(date);
  return format(dateObj, "dd 'de' MMMM, yyyy", { locale: es });
};

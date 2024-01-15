export const hourAmPmFormat = (hourString = "00:00") => {
  const hour = hourString.split(":")[0];
  const minute = hourString.split(":")[1];

  if (hour >= 0 && hour < 12) {
    return `${hourString} AM`;
  } else if (hour >= 12 && hour <= 23) {
    const convertedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${convertedHour.toString().padStart(2, "0")}:${minute} PM`;
  } else {
    return hourString;
  }
};

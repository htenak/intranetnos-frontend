export const hourAmPmFormat = (hourString = "00:00") => {
  const hour = hourString.split(":")[0];
  const minute = hourString.split(":")[1];
  if (hour >= 0 && hour < 12) {
    return `${hourString} a.m.`;
  }
  if (hour == 12) {
    return `12:${minute} p.m.`;
  }
  if (hour == 13) {
    return `01:${minute} p.m.`;
  }
  if (hour == 14) {
    return `02:${minute} p.m.`;
  }
  if (hour == 15) {
    return `03:${minute} p.m.`;
  }
  if (hour == 16) {
    return `04:${minute} p.m.`;
  }
  if (hour == 17) {
    return `05:${minute} p.m.`;
  }
  if (hour == 18) {
    return `06:${minute} p.m.`;
  }
  if (hour == 19) {
    return `07:${minute} p.m.`;
  }
  if (hour == 20) {
    return `08:${minute} p.m.`;
  }
  if (hour == 21) {
    return `09:${minute} p.m.`;
  }
  if (hour == 22) {
    return `10:${minute} p.m.`;
  }
  if (hour == 23) {
    return `11:${minute} p.m.`;
  }
  return hourString;
};

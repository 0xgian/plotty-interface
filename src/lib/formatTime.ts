import moment from "moment";

export const formatTime = (time: number): string => {
  const delta = Math.round((+new Date() - time) / 1000);

  const minute = 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7,
    year = day * 365;

  let fuzzy = moment(time).format("MMM D, YYYY");

  if (delta < 30) {
    fuzzy = "just now";
  } else if (delta < minute) {
    fuzzy = delta + "s";
  } else if (delta < 2 * minute) {
    fuzzy = "1m";
  } else if (delta < hour) {
    fuzzy = Math.floor(delta / minute) + "m";
  } else if (Math.floor(delta / hour) == 1) {
    fuzzy = "1h";
  } else if (delta < day) {
    fuzzy = Math.floor(delta / hour) + "h";
  } else if (delta < year) {
    fuzzy = moment(time).format("MMM D");
  }

  return fuzzy;
};

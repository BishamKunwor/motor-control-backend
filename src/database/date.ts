import moment from "moment";

let date = moment(Date.now());

export function getActiveDate() {
  return date.valueOf().toString();
}

export function setActiveDate(minutes: number | null | undefined) {
  if (typeof minutes === "number") {
    date = moment(Date.now()).add(minutes, "m");
  }
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getPattern(type?: string) {
  switch (type) {
    case "email":
      return "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$";
    case "number":
      // number including comma
      return "^[0-9.]*$";
    case "url":
      return "^(http|https)://";
    default:
      return undefined;
  }
}

/**
 * Given a date object, returns a new date object with the same date and time, but with the timezone offset removed.
 * example: date = new Date("2021-08-01T00:00:00-04:00"), considerAsUTC(date) = new Date("2021-08-01T04:00:00Z")
 * @param date
 * @returns
 */
export function considerAsUTC(date: Date) {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
}

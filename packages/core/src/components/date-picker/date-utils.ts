/**
 * @param value date string in Dutch format DD-MM-YYYY
 */
export function parseToValueFormat(value: string | undefined): string | undefined {
  if (!value) {
    return;
  }

  const matches = value.split("-");

  if (
    matches.length === 3 &&
    typeof matches[0] === "string" &&
    typeof matches[1] === "string" &&
    typeof matches[2] === "string" &&
    matches[2].length === 4
  ) {
    return matches
      .map((match) => (match.length === 1 ? `0${match}` : match))
      .reverse()
      .join("-");
  }

  return value;
}

export function createDate(year: string, month: string, day: string): Date | undefined {
  const dayInt = parseInt(day, 10);
  const monthInt = parseInt(month, 10);
  const yearInt = parseInt(year, 10);

  const isValid =
    Number.isInteger(yearInt) && // all parts should be integers
    Number.isInteger(monthInt) &&
    Number.isInteger(dayInt) &&
    monthInt > 0 && // month must be 1-12
    monthInt <= 12 &&
    dayInt > 0 && // day must be 1-31
    dayInt <= 31 &&
    yearInt > 0;

  if (isValid) {
    return new Date(yearInt, monthInt - 1, dayInt);
  }
}

/**
 * @param value date string in format D-M-YYYY
 */
export function parseDate(value: string | undefined): Date | undefined {
  if (!value) {
    return;
  }

  const matches = value.split("-");

  if (
    matches.length === 3 &&
    typeof matches[0] === "string" &&
    typeof matches[1] === "string" &&
    typeof matches[2] === "string" &&
    matches[0].length === 4
  ) {
    return createDate(matches[0], matches[1], matches[2]);
  }
}

/**
 * print date in format DD-MM-YYYY
 * @param date
 */
export function printDutchDate(date: Date | undefined): string {
  if (!date) {
    return "";
  }

  const d = date.getDate().toString(10).padStart(2, "0");
  const m = (date.getMonth() + 1).toString(10).padStart(2, "0");
  const y = date.getFullYear().toString(10).padStart(2, "0");

  return `${d}-${m}-${y}`;
}

/**
 * Ensures date is within range, returns min or max if out of bounds
 */
export function clamp(date: Date, min?: Date, max?: Date): Date {
  const time = date.getTime();

  if (min && min instanceof Date && time < min.getTime()) {
    return min;
  }

  if (max && max instanceof Date && time > max.getTime()) {
    return max;
  }

  return date;
}

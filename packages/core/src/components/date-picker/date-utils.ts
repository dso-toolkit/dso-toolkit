/**
 * dd-mm-yyyy to yyyy-mm-dd
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
    typeof matches[2] === "string"
  ) {
    const [d, m, y] = matches;

    const dd = d.padStart(2, "0");
    const mm = m.padStart(2, "0");
    const yyyy = y.padStart(4, "0");

    return [yyyy, mm, dd].join("-");
  }

  return value;
}

/**
 * yyyy-mm-dd to dd-mm-yyyy
 */
export function parseToDutchFormat(date: Date | null): string {
  if (!date) {
    return "";
  }

  const dd = date.getDate().toString(10).padStart(2, "0");
  const mm = (date.getMonth() + 1).toString(10).padStart(2, "0");
  const yyyy = date.getFullYear().toString(10).padStart(4, "0");

  return [dd, mm, yyyy].join("-");
}

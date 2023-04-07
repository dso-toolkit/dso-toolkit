import defaultLocalization from "../date-localization";

export function monthRange(selectedYear: number, minDate?: Date, maxDate?: Date): string[] {
  if (minDate && maxDate) {
    const { minYear, minMonth } = { minYear: minDate.getFullYear(), minMonth: minDate.getMonth() };
    const { maxYear, maxMonth } = { maxYear: maxDate.getFullYear(), maxMonth: maxDate.getMonth() };

    return defaultLocalization.monthNames.filter((_month, index) => {
      if (minYear === selectedYear && maxYear === selectedYear) {
        return index >= minMonth && index >= maxMonth;
      }

      if (minYear === selectedYear) {
        return index >= minMonth;
      }

      if (maxYear === selectedYear) {
        return index <= maxMonth;
      }

      return true;
    });
  }

  if (minDate) {
    const { minYear, minMonth } = { minYear: minDate.getFullYear(), minMonth: minDate.getMonth() };

    return defaultLocalization.monthNames.filter((_month, index) => minYear === selectedYear && index >= minMonth);
  }

  if (maxDate) {
    const { maxYear, maxMonth } = { maxYear: maxDate.getFullYear(), maxMonth: maxDate.getMonth() };

    return defaultLocalization.monthNames.filter((_month, index) => maxYear === selectedYear && index <= maxMonth);
  }

  return defaultLocalization.monthNames;
}

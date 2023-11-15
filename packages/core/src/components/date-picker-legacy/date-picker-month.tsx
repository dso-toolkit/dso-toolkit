import { h, FunctionalComponent } from "@stencil/core";
import { DsoLocalizedText } from "./date-localization";
import { DatePickerLegacyDay, DatePickerLegacyDayProps } from "./date-picker-day";
import { getViewOfMonth, inRange, DaysOfWeek, isEqual } from "./date-utils";

function chunk<T>(array: T[], chunkSize: number): T[][] {
  const result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}

function mapWithOffset<T, U>(array: T[], startingOffset: number, mapFn: (item: T) => U): U[] {
  return array.map((_, i) => {
    const adjustedIndex = (i + startingOffset) % array.length;
    const item = array[adjustedIndex];
    if (!item) {
      throw new Error("No item found");
    }

    return mapFn(item);
  });
}

type DatePickerLegacyMonthProps = {
  selectedDate: Date | undefined;
  focusedDate: Date;
  labelledById: string;
  localization: DsoLocalizedText;
  firstDayOfWeek: DaysOfWeek;
  min?: Date;
  max?: Date;
  onDateSelect: DatePickerLegacyDayProps["onDaySelect"];
  onKeyboardNavigation: DatePickerLegacyDayProps["onKeyboardNavigation"];
  focusedDayRef: (element: HTMLButtonElement) => void;
  onFocusIn?: (e: FocusEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
};

export const DatePickerLegacyMonth: FunctionalComponent<DatePickerLegacyMonthProps> = ({
  selectedDate,
  focusedDate,
  labelledById,
  localization,
  firstDayOfWeek,
  min,
  max,
  onDateSelect,
  onKeyboardNavigation,
  focusedDayRef,
  onMouseDown,
  onFocusIn,
}) => {
  const today = new Date();
  const days = getViewOfMonth(focusedDate, firstDayOfWeek);

  return (
    <table
      class="dso-date__table"
      role="grid"
      aria-labelledby={labelledById}
      onFocusin={onFocusIn}
      onMouseDown={onMouseDown}
    >
      <thead>
        <tr>
          {mapWithOffset(localization.dayNames, firstDayOfWeek, (dayName) => (
            <th class="dso-date__table-header" scope="col">
              <span aria-hidden="true">{dayName.substr(0, 2)}</span>
              <span class="dso-date__vhidden">{dayName}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {chunk(days, 7).map((week) => (
          <tr class="dso-date__row">
            {week.map((day) => (
              <td
                class="dso-date__cell"
                role="gridcell"
                aria-selected={isEqual(day, selectedDate) ? "true" : undefined}
                aria-current={isEqual(day, today) ? "date" : undefined}
              >
                <DatePickerLegacyDay
                  day={day}
                  today={today}
                  focusedDay={focusedDate}
                  inRange={inRange(day, min, max)}
                  onDaySelect={onDateSelect}
                  onKeyboardNavigation={onKeyboardNavigation}
                  focusedDayRef={focusedDayRef}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

import { h, FunctionalComponent } from "@stencil/core";
import { isEqual, printDutchDate } from "./date-utils";

export type DatePickerDayProps = {
  focusedDay: Date;
  today: Date;
  day: Date;
  inRange: boolean;
  onDaySelect: (event: MouseEvent, day: Date) => void;
  onKeyboardNavigation: (event: KeyboardEvent) => void;
  focusedDayRef?: (element: HTMLButtonElement) => void;
};

export const DatePickerDay: FunctionalComponent<DatePickerDayProps> = ({
  focusedDay,
  today,
  day,
  onDaySelect,
  onKeyboardNavigation,
  focusedDayRef,
  inRange,
}) => {
  const isToday = isEqual(day, today);
  const isFocused = isEqual(day, focusedDay);
  const isDisabled = day.getMonth() !== focusedDay.getMonth();
  const isOutsideRange = !inRange;

  function handleClick(e: MouseEvent) {
    onDaySelect(e, day);
  }

  return (
    <button
      class={{
        "dso-date__day": true,
        "is-outside": isOutsideRange,
        "is-disabled": isDisabled,
        "is-today": isToday,
      }}
      tabIndex={isFocused ? 0 : -1}
      onClick={handleClick}
      onKeyDown={onKeyboardNavigation}
      disabled={isOutsideRange || isDisabled}
      type="button"
      ref={(el) => {
        if (isFocused && el && focusedDayRef) {
          focusedDayRef(el);
        }
      }}
    >
      <span aria-hidden="true">{day.getDate()}</span>
      <span class="dso-date__vhidden">{printDutchDate(day)}</span>
    </button>
  );
};

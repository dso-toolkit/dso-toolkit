import {
  Component,
  ComponentInterface,
  Host,
  Prop,
  Element,
  h,
  Event,
  EventEmitter,
  State,
  Listen,
  Method,
} from "@stencil/core";

import { createIdentifier } from "../../utils/create-identifier";
import {
  addDays,
  startOfWeek,
  endOfWeek,
  setMonth,
  setYear,
  clamp,
  inRange,
  endOfMonth,
  startOfMonth,
  printDutchDate,
  parseDutchDate,
  DaysOfWeek,
} from "./date-utils";
import { DatePickerMonth } from "./date-picker-month";
import defaultLocalization, { DsoLocalizedText } from "./date-localization";
import {
  DsoDatePickerDirection,
  DsoDatePickerChangeEvent,
  DsoDatePickerFocusEvent,
  DsoDatePickerKeyboardEvent,
} from "./date-picker.interfaces";
import { monthRange } from "./utils/month-range";
import { range } from "./utils/range";

const keyCode = {
  TAB: 9,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

const DISALLOWED_CHARACTERS = /[^0-9-]+/g;
const TRANSITION_MS = 300;

function cleanValue(input: HTMLInputElement, regex: RegExp): string {
  const value = input.value;
  const cursor = input.selectionStart;

  if (!cursor) {
    return value;
  }

  const beforeCursor = value.slice(0, cursor);
  const afterCursor = value.slice(cursor, value.length);

  const filteredBeforeCursor = beforeCursor.replace(regex, "");
  const filterAfterCursor = afterCursor.replace(regex, "");

  const newValue = filteredBeforeCursor + filterAfterCursor;
  const newCursor = filteredBeforeCursor.length;

  input.value = newValue;
  input.selectionStart = input.selectionEnd = newCursor;

  return newValue;
}

@Component({
  tag: "dso-date-picker",
  styleUrl: "date-picker.scss",
  shadow: false,
  scoped: true,
})
export class DsoDatePicker implements ComponentInterface {
  /**
   * Own Properties
   */
  private monthSelectId = createIdentifier("DsoDateMonth");
  private yearSelectId = createIdentifier("DsoDateYear");
  private dialogLabelId = createIdentifier("DsoDateLabel");

  private datePickerButton: HTMLButtonElement | undefined;
  private datePickerInput: HTMLInputElement | undefined;
  private firstFocusableElement: HTMLElement | undefined;
  private monthSelectNode: HTMLElement | undefined;
  private focusedDayNode: HTMLButtonElement | undefined;

  private focusTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private hideTimeoutId: ReturnType<typeof setTimeout> | undefined;

  private initialTouchX: number | undefined;
  private initialTouchY: number | undefined;

  private localization: DsoLocalizedText = defaultLocalization;
  private firstDayOfWeek: DaysOfWeek = DaysOfWeek.Monday;

  private previousValue: string | undefined;

  /**
   * Reference to host HTML element.
   */
  @Element()
  element!: HTMLDsoDatePickerElement;

  /**
   * State() variables
   */
  @State()
  activeFocus = false;
  @State()
  focusedDay = new Date();
  @State()
  open = false;
  @State()
  visible = false;

  /**
   * Public Property API
   */

  /**
   * Name of the date picker input.
   */
  @Prop()
  name = "date";

  /**
   * Adds a unique identifier for the date picker input. Use this instead of html `id` attribute.
   */
  @Prop()
  identifier: string | undefined;

  /**
   * Makes the date picker input component disabled. This prevents users from being able to
   * interact with the input, and conveys its inactive state to assistive technologies.
   */
  @Prop({ reflect: true })
  disabled = false;

  /**
   * Defines a specific role attribute for the date picker input.
   */
  @Prop()
  role: string | null = null;

  /**
   * Forces the opening direction of the calendar modal to be always left or right.
   * This setting can be useful when the input is smaller than the opening date picker
   * would be as by default the picker always opens towards right.
   */
  @Prop()
  direction: DsoDatePickerDirection = "right";

  /**
   * Should the input be marked as required?
   */
  @Prop()
  required = false;

  /**
   * Is input invalid?
   */
  @Prop({ reflect: true })
  invalid?: boolean;

  /**
   * ID of element that describes the input element
   */
  @Prop()
  describedBy?: string;

  /**
   * Should the input be focused on load?
   */
  @Prop()
  dsoAutofocus = false;

  /**
   * Date value. Must be in Dutch date format: DD-MM-YYYY.
   */
  @Prop({ reflect: true, mutable: true })
  value = "";

  /**
   * Minimum date allowed to be picked. Must be in Dutch date format: DD-MM-YYYY.
   * This setting can be used alone or together with the max property.
   */
  @Prop()
  min: string | undefined;

  /**
   * Maximum date allowed to be picked. Must be in Dutch date format: DD-MM-YYYY.
   * This setting can be used alone or together with the min property.
   */
  @Prop()
  max: string | undefined;

  /**
   * Events section.
   */

  /**
   * Event emitted when a date is selected.
   */
  @Event()
  dsoDateChange!: EventEmitter<DsoDatePickerChangeEvent>;

  /**
   * Event emitted the date picker input is blurred.
   */
  @Event()
  dsoBlur!: EventEmitter<DsoDatePickerFocusEvent>;

  /**
   * Event emitted on key up in the date picker input.
   */
  @Event()
  dsoKeyUp!: EventEmitter<DsoDatePickerKeyboardEvent>;

  /**
   * Event emitted on key down in the date picker input.
   */
  @Event()
  dsoKeyDown!: EventEmitter<DsoDatePickerKeyboardEvent>;

  /**
   * Event emitted the date picker input is focused.
   */
  @Event()
  dsoFocus!: EventEmitter<DsoDatePickerFocusEvent>;

  /**
   * Component event handling.
   */
  @Listen("click", { target: "document", capture: true })
  handleDocumentClick(e: MouseEvent) {
    if (!this.open) {
      return;
    }

    const path = e.composedPath();

    for (const target of path) {
      if (target instanceof Node && this.element.contains(target)) {
        return;
      }
    }

    this.hide(false);
  }

  /**
   * Sets focus on the date picker's input. Use this method instead of the global `focus()`.
   */
  @Method()
  async setFocus() {
    return this.datePickerInput?.focus();
  }

  /**
   * Public methods API
   */

  /**
   * Show the calendar modal, moving focus to the calendar inside.
   */
  @Method()
  async show() {
    if (typeof this.hideTimeoutId !== "undefined") {
      clearTimeout(this.hideTimeoutId);
    }

    this.visible = true;

    setTimeout(() => {
      this.open = true;
      this.setFocusedDay(parseDutchDate(this.value) || new Date());

      if (typeof this.focusTimeoutId !== "undefined") {
        clearTimeout(this.focusTimeoutId);
      }

      this.focusTimeoutId = setTimeout(() => this.monthSelectNode?.focus(), TRANSITION_MS);
    });
  }

  /**
   * Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus
   * returning to the date picker's button. Default is true.
   */
  @Method()
  async hide(moveFocusToButton = true) {
    this.open = false;

    // in cases where calendar is quickly shown and hidden
    // we should avoid moving focus to the button
    if (typeof this.focusTimeoutId !== "undefined") {
      clearTimeout(this.focusTimeoutId);
    }

    this.hideTimeoutId = setTimeout(() => {
      if (moveFocusToButton && this.datePickerButton) {
        this.datePickerButton.focus();
      }

      this.visible = false;
    }, TRANSITION_MS + 200);
  }

  /**
   * Local methods.
   */
  private enableActiveFocus = () => {
    this.activeFocus = true;
  };

  private disableActiveFocus = () => {
    this.activeFocus = false;
  };

  private addDays(days: number) {
    this.setFocusedDay(addDays(this.focusedDay, days));
  }

  private addMonths(months: number) {
    this.setMonth(this.focusedDay.getMonth() + months);
  }

  private addYears(years: number) {
    this.setYear(this.focusedDay.getFullYear() + years);
  }

  private startOfWeek() {
    this.setFocusedDay(startOfWeek(this.focusedDay, this.firstDayOfWeek));
  }

  private endOfWeek() {
    this.setFocusedDay(endOfWeek(this.focusedDay, this.firstDayOfWeek));
  }

  private setMonth(month: number) {
    const min = setMonth(startOfMonth(this.focusedDay), month);
    const max = endOfMonth(min);
    const date = setMonth(this.focusedDay, month);

    this.setFocusedDay(clamp(date, min, max));
  }

  private setYear(year: number) {
    const min = setYear(startOfMonth(this.focusedDay), year);
    const max = endOfMonth(min);
    const date = setYear(this.focusedDay, year);

    this.setFocusedDay(clamp(date, min, max));
  }

  private setFocusedDay(day: Date) {
    this.focusedDay = clamp(day, parseDutchDate(this.min), parseDutchDate(this.max));
  }

  private toggleOpen = (e: Event) => {
    e.preventDefault();
    this.open ? this.hide(false) : this.show();
  };

  private handleEscKey = (event: KeyboardEvent) => {
    if (event.keyCode === keyCode.ESC) {
      this.hide();
    }
  };

  private handleBlur = (event: Event) => {
    event.stopPropagation();

    this.dsoBlur.emit({
      component: "dso-date-picker",
    });
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    event.stopPropagation();

    this.dsoKeyUp.emit({
      component: "dso-date-picker",
      originalEvent: event,
    });
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();

    this.dsoKeyDown.emit({
      component: "dso-date-picker",
      originalEvent: event,
    });
  };

  private handleFocus = (event: Event) => {
    event.stopPropagation();

    this.dsoFocus.emit({
      component: "dso-date-picker",
    });
  };

  private handleTouchStart = (event: TouchEvent) => {
    const touch = event.changedTouches[0];
    if (!touch) {
      throw new Error("No touch found");
    }

    this.initialTouchX = touch.pageX;
    this.initialTouchY = touch.pageY;
  };

  private handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();
  };

  private handleTouchEnd = (event: TouchEvent) => {
    const touch = event.changedTouches[0];
    if (!touch) {
      throw new Error("No touch found");
    }

    const distX = touch.pageX - (this.initialTouchX ?? 0); // get horizontal dist traveled
    const distY = touch.pageY - (this.initialTouchY ?? 0); // get vertical dist traveled
    const threshold = 70;

    const isHorizontalSwipe = Math.abs(distX) >= threshold && Math.abs(distY) <= threshold;
    const isDownwardsSwipe = Math.abs(distY) >= threshold && Math.abs(distX) <= threshold && distY > 0;

    if (isHorizontalSwipe) {
      this.addMonths(distX < 0 ? 1 : -1);
    } else if (isDownwardsSwipe) {
      this.hide(false);
      event.preventDefault();
    }

    this.initialTouchY = undefined;
    this.initialTouchX = undefined;
  };

  private handleNextMonthClick = (event: MouseEvent) => {
    event.preventDefault();
    this.addMonths(1);
  };

  private handlePreviousMonthClick = (event: MouseEvent) => {
    event.preventDefault();
    this.addMonths(-1);
  };

  private handleFirstFocusableKeydown = (event: KeyboardEvent) => {
    // this ensures focus is trapped inside the dialog
    if (event.keyCode === keyCode.TAB && event.shiftKey) {
      this.focusedDayNode?.focus();
      event.preventDefault();
    }
  };

  private handleKeyboardNavigation = (event: KeyboardEvent) => {
    // handle tab separately, since it needs to be treated
    // differently to other keyboard interactions
    if (event.keyCode === keyCode.TAB && !event.shiftKey) {
      event.preventDefault();
      this.firstFocusableElement?.focus();
      return;
    }

    let handled = true;

    switch (event.keyCode) {
      case keyCode.RIGHT:
        this.addDays(1);
        break;
      case keyCode.LEFT:
        this.addDays(-1);
        break;
      case keyCode.DOWN:
        this.addDays(7);
        break;
      case keyCode.UP:
        this.addDays(-7);
        break;
      case keyCode.PAGE_UP:
        if (event.shiftKey) {
          this.addYears(-1);
        } else {
          this.addMonths(-1);
        }
        break;
      case keyCode.PAGE_DOWN:
        if (event.shiftKey) {
          this.addYears(1);
        } else {
          this.addMonths(1);
        }
        break;
      case keyCode.HOME:
        this.startOfWeek();
        break;
      case keyCode.END:
        this.endOfWeek();
        break;
      default:
        handled = false;
    }

    if (handled) {
      event.preventDefault();
      this.enableActiveFocus();
    }
  };

  private handleDaySelect = (_event: MouseEvent, day: Date) => {
    if (!inRange(day, parseDutchDate(this.min), parseDutchDate(this.max))) {
      return;
    }

    if (day.getMonth() === this.focusedDay.getMonth()) {
      this.setValue(day);
      this.hide();
    } else {
      this.setFocusedDay(day);
    }
  };

  private handleMonthSelect = (e: Event) => {
    // Todo
    if (e.target instanceof HTMLSelectElement) {
      this.setMonth(parseInt(e.target.value, 10));
    }
  };

  private handleYearSelect = (e: Event) => {
    if (e.target instanceof HTMLSelectElement) {
      this.setYear(parseInt(e.target.value, 10));
    }
  };

  private handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;

    const cleanedValue = cleanValue(target, DISALLOWED_CHARACTERS);

    this.setValue(cleanedValue);
  };

  private setValue(value: Date | string) {
    const event = this.prepareEvent(value);

    this.value = typeof value === "string" ? value : event.value;

    if (this.value !== this.previousValue) {
      this.dsoDateChange.emit(event);
      this.previousValue = this.value;
    }
  }

  private prepareEvent = (value: Date | string): DsoDatePickerChangeEvent => {
    const event: DsoDatePickerChangeEvent = {
      component: "dso-date-picker",
      value: "",
      valueAsDate: undefined,
    };

    if (value instanceof Date) {
      event.valueAsDate = value;
    } else {
      event.value = value;
      event.valueAsDate = parseDutchDate(value);
    }

    if (event.valueAsDate) {
      event.value = printDutchDate(event.valueAsDate);
    }

    if (!event.valueAsDate && this.required) {
      event.error = "required";
    }

    if (event.value && !event.valueAsDate) {
      event.error = "invalid";
    }

    if (event.valueAsDate && (this.min || this.max)) {
      const min = parseDutchDate(this.min);
      const max = parseDutchDate(this.max);
      const clampValue = clamp(event.valueAsDate, min, max);

      if (clampValue !== event.valueAsDate && clampValue === min) {
        event.valueAsDate = undefined;
        event.error = "min-range";
      } else if (clampValue !== event.valueAsDate && clampValue === max) {
        event.valueAsDate = undefined;
        event.error = "max-range";
      }
    }

    return event;
  };

  private processFocusedDayNode = (element: HTMLButtonElement) => {
    this.focusedDayNode = element;

    if (this.activeFocus && this.open) {
      setTimeout(() => element.focus(), 0);
    }
  };

  componentWillLoad(): void | Promise<void> {
    const minDate = parseDutchDate(this.min);
    const maxDate = parseDutchDate(this.max);

    if (minDate && minDate > this.focusedDay) {
      this.focusedDay = minDate;
    }

    if (maxDate && maxDate < this.focusedDay) {
      this.focusedDay = maxDate;
    }
  }

  componentDidLoad() {
    const valueAsDate = parseDutchDate(this.value);
    if (valueAsDate) {
      this.previousValue = this.value = printDutchDate(valueAsDate);
    }

    if (this.dsoAutofocus) {
      this.setFocus();
    }
  }

  /**
   * render() function
   * Always the last one in the class.
   */
  render() {
    const valueAsDate = parseDutchDate(this.value);
    const formattedDate = valueAsDate && printDutchDate(valueAsDate);
    const selectedYear = (valueAsDate || this.focusedDay).getFullYear();
    const focusedMonth = this.focusedDay.getMonth();
    const focusedYear = this.focusedDay.getFullYear();

    const minDate = parseDutchDate(this.min);
    const maxDate = parseDutchDate(this.max);
    const prevMonthDisabled = minDate && minDate.getMonth() === focusedMonth && minDate.getFullYear() === focusedYear;
    const nextMonthDisabled = maxDate && maxDate.getMonth() === focusedMonth && maxDate.getFullYear() === focusedYear;

    let minYear = selectedYear - 10;
    let maxYear = selectedYear + 10;
    if (minDate) {
      minYear = Math.max(minYear, minDate.getFullYear());
    }
    if (maxDate) {
      maxYear = Math.min(maxYear, maxDate.getFullYear());
    }

    return (
      <Host>
        <div class={{ "dso-date": true, "dso-visible": this.visible }}>
          <div class="dso-date__input-wrapper">
            <input
              class="dso-date__input"
              value={this.value}
              placeholder={this.localization.placeholder}
              id={this.identifier}
              disabled={this.disabled}
              role={this.role ?? undefined}
              required={this.required ? true : undefined}
              aria-autocomplete="none"
              aria-invalid={this.invalid?.toString()}
              aria-describedby={this.describedBy}
              onInput={this.handleInputChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyUp={this.handleKeyUp}
              onKeyDown={this.handleKeyDown}
              autoComplete="off"
              ref={(element) => (this.datePickerInput = element)}
            />
            <button
              type="button"
              class="dso-date__toggle"
              onClick={this.toggleOpen}
              disabled={this.disabled}
              ref={(element) => (this.datePickerButton = element)}
            >
              <span class="dso-date__toggle-icon">
                <dso-icon icon="calendar"></dso-icon>
              </span>
              <span class="dso-date__vhidden">
                {this.localization.buttonLabel}
                {formattedDate && (
                  <span>
                    , {this.localization.selectedDateMessage} {formattedDate}
                  </span>
                )}
              </span>
            </button>
          </div>

          <div
            class={{
              "dso-date__dialog": true,
              "is-left": this.direction === "left",
              "is-active": this.open,
            }}
            role="dialog"
            aria-modal="true"
            aria-hidden={this.open ? "false" : "true"}
            aria-labelledby={this.dialogLabelId}
            onTouchMove={this.handleTouchMove}
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
          >
            <div class="dso-date__dialog-content" onKeyDown={this.handleEscKey}>
              <div class="dso-date__vhidden dso-date__instructions" aria-live="polite">
                {this.localization.keyboardInstruction}
              </div>
              <div class="dso-date__mobile" onFocusin={this.disableActiveFocus}>
                <label class="dso-date__mobile-heading">{this.localization.calendarHeading}</label>
                <button
                  class="dso-date__close"
                  ref={(element) => (this.firstFocusableElement = element)}
                  onKeyDown={this.handleFirstFocusableKeydown}
                  onClick={() => this.hide()}
                  type="button"
                >
                  <dso-icon icon="times"></dso-icon>
                  <span class="dso-date__vhidden">{this.localization.closeLabel}</span>
                </button>
              </div>
              <div class="dso-date__header" onFocusin={this.disableActiveFocus}>
                <div>
                  <h2 id={this.dialogLabelId} class="dso-date__vhidden" aria-live="polite">
                    {this.localization.monthNames[focusedMonth]} {this.focusedDay.getFullYear()}
                  </h2>

                  <label htmlFor={this.monthSelectId} class="dso-date__vhidden">
                    {this.localization.monthSelectLabel}
                  </label>
                  <div class="dso-date__select">
                    <select
                      id={this.monthSelectId}
                      class="dso-date__select--month"
                      ref={(element) => (this.monthSelectNode = element)}
                      onChange={this.handleMonthSelect}
                    >
                      {monthRange(this.localization, selectedYear, minDate, maxDate).map((month) => {
                        const index = this.localization.monthNames.indexOf(month);

                        return (
                          <option key={month} value={index} selected={index === focusedMonth}>
                            {month}
                          </option>
                        );
                      })}
                    </select>
                    <div class="dso-date__select-label" aria-hidden="true">
                      <span>{this.localization.monthNamesShort[focusedMonth]}</span>
                      <dso-icon icon="chevron-down"></dso-icon>
                    </div>
                  </div>

                  <label htmlFor={this.yearSelectId} class="dso-date__vhidden">
                    {this.localization.yearSelectLabel}
                  </label>
                  <div class="dso-date__select">
                    <select id={this.yearSelectId} class="dso-date__select--year" onChange={this.handleYearSelect}>
                      {range(minYear, maxYear).map((year) => (
                        <option key={year} selected={year === focusedYear}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <div class="dso-date__select-label" aria-hidden="true">
                      <span>{this.focusedDay.getFullYear()}</span>
                      <dso-icon icon="chevron-down"></dso-icon>
                    </div>
                  </div>
                </div>

                <div class="dso-date__nav">
                  <button
                    class="dso-date__prev"
                    onClick={this.handlePreviousMonthClick}
                    disabled={prevMonthDisabled}
                    type="button"
                  >
                    <dso-icon icon="chevron-left"></dso-icon>
                    <span class="dso-date__vhidden">{this.localization.prevMonthLabel}</span>
                  </button>
                  <button
                    class="dso-date__next"
                    onClick={this.handleNextMonthClick}
                    disabled={nextMonthDisabled}
                    type="button"
                  >
                    <dso-icon icon="chevron-right"></dso-icon>
                    <span class="dso-date__vhidden">{this.localization.nextMonthLabel}</span>
                  </button>
                </div>
              </div>
              <DatePickerMonth
                selectedDate={valueAsDate}
                focusedDate={this.focusedDay}
                onDateSelect={this.handleDaySelect}
                onKeyboardNavigation={this.handleKeyboardNavigation}
                labelledById={this.dialogLabelId}
                localization={this.localization}
                firstDayOfWeek={this.firstDayOfWeek}
                focusedDayRef={this.processFocusedDayNode}
                min={minDate}
                max={maxDate}
              />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

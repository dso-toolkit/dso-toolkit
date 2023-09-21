import { Component, ComponentInterface, Prop, Element, h, Event, EventEmitter } from "@stencil/core";

import { DatePickerChangeEvent, DatePickerFocusEvent, DatePickerKeyboardEvent } from "./date-picker.interfaces";
import { clamp, parseDate, parseToValueFormat, printDutchDate } from "./date-utils";

@Component({
  tag: "dso-date-picker",
  styleUrl: "date-picker.scss",
  shadow: false,
  scoped: true,
})
export class DsoDatePicker implements ComponentInterface {
  private previousValue?: string;

  /**
   * Reference to host HTML element.
   */
  @Element()
  element!: HTMLDsoDatePickerElement;

  /**
   * Name of the date picker input.
   */
  @Prop()
  name = "dso-date";

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
   * Should the input be marked as required?
   */
  @Prop({ reflect: true })
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
  @Prop()
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
  dsoDateChange!: EventEmitter<DatePickerChangeEvent>;

  /**
   * Event emitted the date picker input is blurred.
   */
  @Event()
  dsoBlur!: EventEmitter<DatePickerFocusEvent>;

  /**
   * Event emitted on key up in the date picker input.
   */
  @Event()
  dsoKeyUp!: EventEmitter<DatePickerKeyboardEvent>;

  /**
   * Event emitted on key down in the date picker input.
   */
  @Event()
  dsoKeyDown!: EventEmitter<DatePickerKeyboardEvent>;

  /**
   * Event emitted the date picker input is focused.
   */
  @Event()
  dsoFocus!: EventEmitter<DatePickerFocusEvent>;

  private handleBlur = (event: FocusEvent) => {
    event.stopPropagation();

    this.dsoBlur.emit({
      originalEvent: event,
      component: "dso-date-picker",
    });
  };

  private handleFocus = (event: FocusEvent) => {
    event.stopPropagation();

    this.dsoFocus.emit({
      originalEvent: event,
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

  private handleInputChange = (e: Event) => {
    const target = e.target;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    const { value } = target;

    const event: DatePickerChangeEvent = {
      originalEvent: e,
      component: "dso-date-picker",
      value,
      valueAsDate: parseDate(value),
    };

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
      const min = parseDate(this.min);
      const max = parseDate(this.max);
      const clampValue = clamp(event.valueAsDate, min, max);

      if (clampValue !== event.valueAsDate && clampValue === min) {
        event.valueAsDate = undefined;
        event.error = "min-range";
      } else if (clampValue !== event.valueAsDate && clampValue === max) {
        event.valueAsDate = undefined;
        event.error = "max-range";
      }
    }

    this.value = typeof value === "string" ? value : event.value;

    if (this.value !== this.previousValue) {
      this.dsoDateChange.emit(event);
      this.previousValue = this.value;
    }
  };

  render() {
    return (
      <input
        type="date"
        id={this.identifier}
        class="dso-date__input"
        value={parseToValueFormat(this.value)}
        name={this.name}
        min={parseToValueFormat(this.min)}
        max={parseToValueFormat(this.max)}
        disabled={this.disabled || undefined}
        required={this.required || undefined}
        aria-autocomplete="none"
        aria-invalid={this.invalid?.toString()}
        aria-describedby={this.describedBy}
        autoComplete="off"
        autofocus={this.dsoAutofocus || undefined}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleInputChange}
      />
    );
  }
}

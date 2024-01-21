import { Component, ComponentInterface, Prop, Element, h, Event, EventEmitter } from "@stencil/core";

import {
  DatePickerBlurEvent,
  DatePickerChangeEvent,
  DatePickerError,
  DatePickerFocusEvent,
  DatePickerKeyboardEvent,
} from "./date-picker.interfaces";
import { parseToValueFormat, parseToDutchFormat } from "./date-utils";

@Component({
  tag: "dso-date-picker",
  styleUrl: "date-picker.scss",
  shadow: false,
  scoped: true,
})
export class DsoDatePicker implements ComponentInterface {
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
  @Prop({ reflect: true })
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
  dsoBlur!: EventEmitter<DatePickerBlurEvent>;

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

  private handleBlur = (e: FocusEvent) => {
    e.stopPropagation();

    const { target } = e;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    const { validity } = target;
    const { value, valueAsDate } = this.dateValues(target);
    const error = this.validityToError(validity);

    const event: DatePickerBlurEvent = {
      component: "dso-date-picker",
      originalEvent: e,
      validity,
      value,
      valueAsDate,
      error,
    };

    this.dsoBlur.emit(event);
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

    const { validity } = target;
    const { value, valueAsDate } = this.dateValues(target);
    const error = this.validityToError(validity);

    const event: DatePickerChangeEvent = {
      component: "dso-date-picker",
      originalEvent: e,
      validity,
      value,
      valueAsDate,
      error,
    };

    this.dsoDateChange.emit(event);
  };

  private dateValues(target: HTMLInputElement): { value: string; valueAsDate: Date | undefined } {
    const { valueAsDate, validity } = target;

    return {
      value: parseToDutchFormat(valueAsDate),
      valueAsDate: (!validity.rangeOverflow && !validity.rangeUnderflow && valueAsDate) || undefined,
    };
  }

  private validityToError(validity: ValidityState): DatePickerError | undefined {
    if (validity.valueMissing) {
      return "required";
    }

    if (validity.rangeUnderflow) {
      return "min-range";
    }

    if (validity.rangeOverflow) {
      return "max-range";
    }

    if (!validity.valid) {
      return "invalid";
    }

    return undefined;
  }

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

import { Directive, ElementRef, HostListener, input, model, output } from "@angular/core";
import type { FormValueControl } from "@angular/forms/signals";
import type { DatePickerChangeEvent, DsoDatePickerCustomEvent } from "@dso-toolkit/core/dist/components";

import { syncFieldControlProperties } from "./sync-field-control-properties";

/**
 * Adapts `dso-date-picker` to Angular Signal Forms by implementing
 * the `FormValueControl<string>` contract. This enables the component
 * to be used as a Signal Forms field while keeping the existing
 * `ControlValueAccessor`, `ngModel`, and Reactive Forms support unchanged.
 */
@Directive({
  selector: "dso-date-picker",
  standalone: true,
})
export class DsoDatePickerFieldControl implements FormValueControl<string> {
  readonly value = model<string>("");
  readonly disabled = input(false);
  readonly required = input(false);
  readonly invalid = input(false);
  readonly touched = output<boolean>();

  constructor(elementRef: ElementRef<HTMLDsoDatePickerElement>) {
    syncFieldControlProperties(elementRef.nativeElement, "value", {
      value: this.value,
      disabled: this.disabled,
      required: this.required,
      invalid: this.invalid,
    });
  }

  @HostListener("dsoDateChange", ["$event"])
  onDsoDateChange(event: DsoDatePickerCustomEvent<DatePickerChangeEvent>) {
    this.value.set(event.detail.value);
  }

  @HostListener("dsoBlur")
  onDsoBlur() {
    this.touched.emit(true);
  }
}

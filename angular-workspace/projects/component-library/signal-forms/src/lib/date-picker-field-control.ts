import { Directive, ElementRef, HostListener, effect, input, model } from "@angular/core";
import type { FormValueControl } from "@angular/forms/signals";
import type { DatePickerChangeEvent, DsoDatePickerCustomEvent } from "@dso-toolkit/core/dist/components";

import { syncFieldControlProperties } from "./sync-field-control-properties";

/**
 * Adapts `dso-date-picker` to Angular Signal Forms by implementing
 * the `FormValueControl<string>` contract.
 */
@Directive({
  selector: "dso-date-picker[formField]",
  standalone: true,
})
export class DsoDatePickerFieldControl implements FormValueControl<string> {
  readonly value = model<string>("");
  readonly disabled = input(false);
  readonly required = input(false);
  readonly invalid = input(false);
  readonly touched = model(false);
  readonly minDate = input<string>();
  readonly maxDate = input<string>();

  constructor(elementRef: ElementRef<HTMLDsoDatePickerElement>) {
    syncFieldControlProperties(elementRef.nativeElement, "value", {
      value: this.value,
      disabled: this.disabled,
      required: this.required,
      invalid: this.invalid,
    });
    effect(() => {
      elementRef.nativeElement.min = this.minDate();
    });
    effect(() => {
      elementRef.nativeElement.max = this.maxDate();
    });
  }

  @HostListener("dsoDateChange", ["$event"])
  onDsoDateChange(event: DsoDatePickerCustomEvent<DatePickerChangeEvent>) {
    this.value.set(event.detail.value);
  }

  @HostListener("dsoBlur")
  onDsoBlur() {
    this.touched.set(true);
  }
}

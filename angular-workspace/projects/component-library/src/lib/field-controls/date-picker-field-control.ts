import { Directive, ElementRef, HostListener, afterEveryRender, input, model, output } from "@angular/core";
import { FormValueControl } from "@angular/forms/signals";
import { DatePickerChangeEvent, DsoDatePickerCustomEvent } from "@dso-toolkit/core/dist/components";

import { syncFieldControlProperties } from "./sync-field-control-properties";

/**
 * Adapts `dso-date-picker` to Angular Signal Forms by implementing
 * the `FormValueControl<string>` contract.
 *
 * @example
 * <dso-date-picker
 *   [formField]="myForm.datum"
 *   minDate="01-01-2024"
 *   maxDate="31-12-2024"
 * />
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
  readonly touch = output<void>();
  readonly minDate = input<string>();
  readonly maxDate = input<string>();
  readonly inputError = model<DatePickerChangeEvent["error"]>();

  constructor(elementRef: ElementRef<HTMLDsoDatePickerElement>) {
    syncFieldControlProperties(elementRef.nativeElement, "value", {
      value: this.value,
      disabled: this.disabled,
      required: this.required,
      invalid: this.invalid,
    });
    // FormField may overwrite the element's min/max through the generated Angular component.
    // Reapply minDate/maxDate after rendering so form constraints cannot replace the date limits.
    afterEveryRender({
      write: () => {
        elementRef.nativeElement.min = this.minDate();
        elementRef.nativeElement.max = this.maxDate();
      },
    });
  }

  @HostListener("dsoDateChange", ["$event"])
  onDsoDateChange(event: DsoDatePickerCustomEvent<DatePickerChangeEvent>) {
    this.inputError.set(event.detail.error);
    this.value.set(event.detail.value);
  }

  @HostListener("dsoBlur", ["$event"])
  onDsoBlur(event: DsoDatePickerCustomEvent<DatePickerChangeEvent>) {
    this.inputError.set(event.detail.error);
    this.value.set(event.detail.value);
    this.touched.set(true);
    this.touch.emit();
  }
}

import { Directive, ElementRef, HostListener, input, model, output } from "@angular/core";
import { FormCheckboxControl } from "@angular/forms/signals";
import type { DsoSelectableCustomEvent, SelectableChangeEvent } from "@dso-toolkit/core/dist/components";

import { syncFieldControlProperties } from "./sync-field-control-properties";

/**
 * Adapts `dso-selectable[type=checkbox]` to Angular Signal Forms by implementing
 * the `FormCheckboxControl` contract. This enables the component to be used
 * as a Signal Forms field while keeping the existing `ControlValueAccessor`,
 * `ngModel`, and Reactive Forms support unchanged.
 */
@Directive({
  selector: "dso-selectable[type=checkbox]",
  standalone: true,
})
export class DsoSelectableCheckboxFieldControl implements FormCheckboxControl {
  readonly checked = model<boolean>(false);
  readonly disabled = input(false);
  readonly required = input(false);
  readonly invalid = input(false);
  readonly touched = output<boolean>();

  constructor(elementRef: ElementRef<HTMLDsoSelectableElement>) {
    syncFieldControlProperties(elementRef.nativeElement, "checked", {
      value: this.checked,
      disabled: this.disabled,
      required: this.required,
      invalid: this.invalid,
    });
  }

  @HostListener("dsoChange", ["$event"])
  onDsoChange(event: DsoSelectableCustomEvent<SelectableChangeEvent>) {
    this.checked.set(event.detail.checked);
  }

  @HostListener("focusout")
  onFocusOut() {
    this.touched.emit(true);
  }
}

import { Directive, ElementRef, HostListener, effect, input, model, output } from "@angular/core";
import { FormCheckboxControl } from "@angular/forms/signals";
import type { DsoSelectableCustomEvent, SelectableChangeEvent } from "@dso-toolkit/core/dist/components";

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

  constructor(private elementRef: ElementRef<HTMLDsoSelectableElement>) {
    effect(() => {
      this.elementRef.nativeElement.checked = this.checked();
    });
    effect(() => {
      this.elementRef.nativeElement.disabled = this.disabled();
    });
    effect(() => {
      this.elementRef.nativeElement.required = this.required();
    });
    effect(() => {
      this.elementRef.nativeElement.invalid = this.invalid();
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

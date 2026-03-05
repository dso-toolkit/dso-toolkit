import { Directive, ElementRef, HostListener, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Directive({
  selector: "dso-selectable[type=checkbox]",
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BooleanValueAccessor),
      multi: true,
    },
  ],
})
export class BooleanValueAccessor implements ControlValueAccessor {
  private onChange = (_: boolean) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef) {}

  @HostListener("dsoChange", ["$event"])
  onDsoChange(event: CustomEvent) {
    const checked = event.detail?.checked ?? false;
    this.el.nativeElement.checked = checked;
    this.onChange(checked);
    this.onTouched();
  }

  writeValue(value: unknown) {
    this.el.nativeElement.checked = value ?? false;
  }

  registerOnChange(fn: (value: boolean) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.el.nativeElement.disabled = isDisabled;
  }
}

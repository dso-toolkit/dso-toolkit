import { Directive, ElementRef, HostListener, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Directive({
  selector: "dso-selectable[type=radio]",
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioValueAccessor),
      multi: true,
    },
  ],
})
export class RadioValueAccessor implements ControlValueAccessor {
  private onChange = (_: string) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef) {}

  @HostListener("dsoChange")
  onDsoChange() {
    this.el.nativeElement.checked = true;
    this.onChange(this.el.nativeElement.value);
    this.onTouched();
  }

  writeValue(value: unknown) {
    this.el.nativeElement.checked = value === this.el.nativeElement.value;
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.el.nativeElement.disabled = isDisabled;
  }
}

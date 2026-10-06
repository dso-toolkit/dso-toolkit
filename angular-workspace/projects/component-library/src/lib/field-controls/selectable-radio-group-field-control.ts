import { Directive, ElementRef, HostListener, afterRenderEffect, contentChildren, input, model } from "@angular/core";
import { FormValueControl } from "@angular/forms/signals";
import { SelectableChangeEvent } from "@dso-toolkit/core/dist/components";

import { DsoSelectable } from "../stencil-generated/components";

@Directive({
  selector: "fieldset[dsoSelectableRadioGroup][formField]",
  standalone: true,
})
export class DsoSelectableRadioGroupFieldControl implements FormValueControl<string> {
  readonly value = model<string>("");
  readonly disabled = input(false);
  readonly required = input(false);
  readonly invalid = input(false);
  readonly touched = model(false);

  private readonly options = contentChildren(DsoSelectable, { descendants: true, read: ElementRef });

  constructor(private readonly elementRef: ElementRef<HTMLFieldSetElement>) {
    afterRenderEffect({
      write: () => {
        const selectedValue = this.value();
        const disabled = this.disabled();
        const required = this.required();
        const invalid = this.invalid();
        const options = this.options();

        this.elementRef.nativeElement.disabled = disabled;
        this.elementRef.nativeElement.setAttribute("aria-invalid", String(invalid));
        this.elementRef.nativeElement.setAttribute("aria-required", String(required));
        const values = new Set<string>();
        let name: string | undefined;
        for (const option of options) {
          const element = option.nativeElement as HTMLDsoSelectableElement;
          if (
            element.type === "radio" &&
            element.closest("fieldset[dsoSelectableRadioGroup]") === this.elementRef.nativeElement
          ) {
            if (!element.name || !element.value || (name !== undefined && element.name !== name)) {
              throw new Error("Radio Selectable options must have the same name and a non-empty value");
            }
            if (values.has(element.value)) {
              throw new Error(`Duplicate radio Selectable value: ${element.value}`);
            }
            name = element.name;
            values.add(element.value);
            element.checked = selectedValue !== "" && element.value === selectedValue;
            element.required = required;
            element.invalid = invalid;
          }
        }
      },
    });
  }

  @HostListener("dsoChange", ["$event"])
  onDsoChange(event: Event) {
    if (!(event instanceof CustomEvent)) {
      throw new TypeError("Expected a Selectable change event");
    }

    const detail = event.detail as SelectableChangeEvent;
    if (!detail.checked || this.disabled()) {
      return;
    }

    const option = event.target;
    if (
      !(option instanceof HTMLElement) ||
      option.tagName !== "DSO-SELECTABLE" ||
      option.closest("fieldset[dsoSelectableRadioGroup]") !== this.elementRef.nativeElement
    ) {
      return;
    }

    const radio = option as HTMLDsoSelectableElement;
    if (radio.type !== "radio") {
      return;
    }

    if (!radio.value) {
      throw new Error("Radio Selectable options must have a non-empty value");
    }

    this.value.set(radio.value);
  }

  @HostListener("focusout", ["$event"])
  onFocusOut(event: FocusEvent) {
    if (!this.elementRef.nativeElement.contains(event.relatedTarget as Node | null)) {
      this.touched.set(true);
    }
  }

  focus(options?: FocusOptions): void {
    const group = this.elementRef.nativeElement;
    const radios = Array.from(group.querySelectorAll<HTMLInputElement>('input[type="radio"]:not(:disabled)')).filter(
      (radio) => radio.closest("fieldset[dsoSelectableRadioGroup]") === group,
    );
    (radios.find((radio) => radio.checked) ?? radios[0])?.focus(options);
  }
}

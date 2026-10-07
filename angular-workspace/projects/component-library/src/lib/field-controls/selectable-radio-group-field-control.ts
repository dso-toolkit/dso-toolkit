import { Directive, ElementRef, HostListener, afterRenderEffect, contentChildren, input, model } from "@angular/core";
import { FormValueControl } from "@angular/forms/signals";
import { DsoSelectableCustomEvent, SelectableChangeEvent } from "@dso-toolkit/core/dist/components";

import { DsoSelectable } from "../stencil-generated/components";

function isDsoSelectableElement(element: unknown): element is HTMLDsoSelectableElement {
  return element instanceof HTMLElement && element.tagName === "DSO-SELECTABLE";
}

function isSelectableChangeEvent(event: Event): event is DsoSelectableCustomEvent<SelectableChangeEvent> {
  return (
    event instanceof CustomEvent &&
    typeof event.detail === "object" &&
    event.detail !== null &&
    "checked" in event.detail &&
    typeof event.detail.checked === "boolean"
  );
}

/**
 * Connects a group of radio Selectables to one Angular Signal Forms field.
 *
 * Apply `[formField]` and `dsoSelectableRadioGroup` to their enclosing `fieldset`,
 * not to the individual `dso-selectable` elements. Each radio must have the same
 * `name` and a unique, non-empty `value`. This directive implements
 * `FormValueControl<string>`: it synchronizes the selected option and the group's
 * disabled, required, and invalid states, updates the form on `dsoChange`, and
 * marks the field as touched when focus leaves the fieldset.
 *
 * @example
 * <fieldset dsoSelectableRadioGroup [formField]="myForm.keuze">
 *   <legend>Maak een keuze</legend>
 *   <dso-selectable type="radio" name="keuze" value="ja">Ja</dso-selectable>
 *   <dso-selectable type="radio" name="keuze" value="nee">Nee</dso-selectable>
 * </fieldset>
 */
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
          const element: unknown = option.nativeElement;
          if (
            isDsoSelectableElement(element) &&
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
    const radio = event.target;
    if (
      !isDsoSelectableElement(radio) ||
      radio.type !== "radio" ||
      radio.closest("fieldset[dsoSelectableRadioGroup]") !== this.elementRef.nativeElement
    ) {
      return;
    }

    if (!isSelectableChangeEvent(event)) {
      throw new TypeError("Expected a Selectable change event");
    }

    if (!event.detail.checked || this.disabled()) {
      return;
    }

    if (!radio.value) {
      throw new Error("Radio Selectable options must have a non-empty value");
    }

    this.value.set(radio.value);
  }

  @HostListener("focusout", ["$event"])
  onFocusOut(event: FocusEvent) {
    const relatedTarget = event.relatedTarget;
    if (!(relatedTarget instanceof Node) || !this.elementRef.nativeElement.contains(relatedTarget)) {
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

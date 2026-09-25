import { type Signal, effect } from "@angular/core";

export function syncFieldControlProperties<
  Element extends { disabled?: boolean; required?: boolean; invalid?: boolean },
  ValueProperty extends keyof Element,
>(
  element: Element,
  valueProperty: ValueProperty,
  signals: {
    value: Signal<Element[ValueProperty]>;
    disabled: Signal<boolean>;
    required: Signal<boolean>;
    invalid: Signal<boolean>;
  },
): void {
  effect(() => {
    element[valueProperty] = signals.value();
  });
  effect(() => {
    element.disabled = signals.disabled();
  });
  effect(() => {
    element.required = signals.required();
  });
  effect(() => {
    element.invalid = signals.invalid();
  });
}

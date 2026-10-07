import { Component, ErrorHandler, signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormField, disabled, form, required } from "@angular/forms/signals";
import { By } from "@angular/platform-browser";
import { SelectableChangeEvent } from "@dso-toolkit/core/dist/components";

import { DsoSelectableRadioGroupFieldControl, RadioValueAccessor } from "../../public-api";
import { DsoSelectable } from "../stencil-generated/components";

@Component({
  selector: "dso-test-radio-group",
  standalone: true,
  imports: [DsoSelectable, DsoSelectableRadioGroupFieldControl, FormField, RadioValueAccessor],
  template: `
    <fieldset dsoSelectableRadioGroup [formField]="myForm.keuze">
      <legend>Maak een keuze</legend>
      @for (option of options(); track option) {
        <dso-selectable type="radio" name="keuze" [value]="option">{{ option }}</dso-selectable>
      }
    </fieldset>
  `,
})
class TestRadioGroupComponent {
  model = signal({ keuze: "ja" });
  options = signal(["ja", "nee"]);
  isDisabled = signal(false);
  myForm = form(this.model, (path) => {
    disabled(path.keuze, () => this.isDisabled());
    required(path.keuze);
  });
}

function createRadioChangeEvent(value: string, checked = true): CustomEvent<SelectableChangeEvent> {
  return new CustomEvent("dsoChange", {
    bubbles: true,
    detail: { checked, value, originalEvent: new Event("change") },
  });
}

describe("DsoSelectableRadioGroupFieldControl", () => {
  let fixture: ComponentFixture<TestRadioGroupComponent>;
  let component: TestRadioGroupComponent;
  let group: HTMLFieldSetElement;
  let control: DsoSelectableRadioGroupFieldControl;

  function options(): HTMLDsoSelectableElement[] {
    return Array.from(group.querySelectorAll<HTMLDsoSelectableElement>("dso-selectable"));
  }

  function checkedOptions(): boolean[] {
    return options().map((option) => option.checked ?? false);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestRadioGroupComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    group = fixture.nativeElement.querySelector("fieldset");
    control = fixture.debugElement
      .query(By.directive(DsoSelectableRadioGroupFieldControl))
      .injector.get(DsoSelectableRadioGroupFieldControl);
  });

  it("binds the form field on a fieldset and selects the model value", () => {
    expect(control.value()).toBe("ja");
    expect(options().map((option) => option.value)).toEqual(["ja", "nee"]);
    expect(checkedOptions()).toEqual([true, false]);
  });

  it("updates the form value when a radio is selected", () => {
    const option = options()[1];
    if (!option) {
      throw new Error("Expected a second radio option");
    }
    option.dispatchEvent(createRadioChangeEvent("nee"));
    fixture.detectChanges();
    expect(component.model().keuze).toBe("nee");
    expect(checkedOptions()).toEqual([false, true]);
    expect(options().map((radio) => radio.value)).toEqual(["ja", "nee"]);
  });

  it("selects options when the form value changes programmatically", () => {
    component.model.set({ keuze: "nee" });
    fixture.detectChanges();
    expect(checkedOptions()).toEqual([false, true]);

    component.model.set({ keuze: "" });
    fixture.detectChanges();
    expect(checkedOptions()).toEqual([false, false]);
  });

  it("updates newly added and removed options", () => {
    component.model.set({ keuze: "misschien" });
    component.options.set(["ja", "nee", "misschien"]);
    fixture.detectChanges();
    expect(checkedOptions()).toEqual([false, false, true]);

    component.options.set(["misschien"]);
    fixture.detectChanges();
    expect(checkedOptions()).toEqual([true]);
  });

  it("works with a single radio option", () => {
    component.options.set(["ja"]);
    fixture.detectChanges();

    expect(checkedOptions()).toEqual([true]);
  });

  it("rejects radio options with different names", () => {
    const handleError = vi.spyOn(TestBed.inject(ErrorHandler), "handleError").mockImplementation(() => {});
    const second = options()[1];
    if (!second) {
      throw new Error("Expected a second radio option");
    }
    second.name = "anders";
    component.model.set({ keuze: "nee" });
    fixture.detectChanges();

    expect(handleError).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Radio Selectable options must have the same name and a non-empty value" }),
    );
  });

  it("rejects duplicate radio values", () => {
    const handleError = vi.spyOn(TestBed.inject(ErrorHandler), "handleError").mockImplementation(() => {});
    const second = options()[1];
    if (!second) {
      throw new Error("Expected a second radio option");
    }
    second.value = "ja";
    component.model.set({ keuze: "nee" });
    fixture.detectChanges();

    expect(handleError).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Duplicate radio Selectable value: ja" }),
    );
  });

  it("applies form disabled, required and invalid state to the group", () => {
    expect(group.disabled).toBe(false);
    expect(group.getAttribute("aria-required")).toBe("true");
    expect(options().map((option) => option.required)).toEqual([true, true]);

    component.model.set({ keuze: "" });
    fixture.detectChanges();
    expect(group.getAttribute("aria-invalid")).toBe("true");
    expect(options().map((option) => option.invalid)).toEqual([true, true]);

    component.isDisabled.set(true);
    fixture.detectChanges();
    expect(group.disabled).toBe(true);
    expect(options().map((option) => option.querySelector("input")?.matches(":disabled"))).toEqual([true, true]);
    expect(options().map((option) => option.querySelector("input")?.hasAttribute("disabled"))).toEqual([false, false]);

    options()[1]?.dispatchEvent(createRadioChangeEvent("nee"));
    fixture.detectChanges();
    expect(component.model().keuze).toBe("");

    component.isDisabled.set(false);
    component.model.set({ keuze: "nee" });
    fixture.detectChanges();
    expect(group.disabled).toBe(false);
    expect(options().map((option) => option.querySelector("input")?.matches(":disabled"))).toEqual([false, false]);
    expect(group.getAttribute("aria-invalid")).toBe("false");
    expect(options().map((option) => option.invalid)).toEqual([false, false]);
  });

  it("marks the group touched only when focus leaves it", () => {
    expect(component.myForm.keuze().touched()).toBe(false);
    const inputs = group.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    const first = inputs[0];
    const second = inputs[1];
    if (!first || !second) {
      throw new Error("Expected two native radio inputs");
    }

    first.focus();
    second.focus();
    fixture.detectChanges();
    expect(component.myForm.keuze().touched()).toBe(false);

    const outside = document.createElement("button");
    group.after(outside);
    outside.focus();
    fixture.detectChanges();
    expect(component.myForm.keuze().touched()).toBe(true);
  });

  it("ignores unchecking a radio", () => {
    options()[0]?.dispatchEvent(createRadioChangeEvent("ja", false));
    fixture.detectChanges();
    expect(component.model().keuze).toBe("ja");
  });

  it("ignores changes from a nested radio group", () => {
    const nestedGroup = document.createElement("fieldset");
    nestedGroup.setAttribute("dsoSelectableRadioGroup", "");
    const nestedRadio = document.createElement("dso-selectable");
    nestedRadio.type = "radio";
    nestedRadio.value = "anders";
    nestedGroup.append(nestedRadio);
    group.append(nestedGroup);

    nestedRadio.dispatchEvent(createRadioChangeEvent("anders"));
    fixture.detectChanges();

    expect(component.model().keuze).toBe("ja");
  });

  it("focuses the selected native radio input", () => {
    const input = options()[0]?.querySelector<HTMLInputElement>('input[type="radio"]');
    if (!input) {
      throw new Error("Expected a native radio input");
    }

    control.focus();

    expect(document.activeElement).toBe(input);
  });

  it("retains native radio inputs and handles their change events", () => {
    const inputs = Array.from(group.querySelectorAll<HTMLInputElement>('input[type="radio"]'));
    expect(inputs.map((input) => input.name)).toEqual(["keuze", "keuze"]);
    const second = inputs[1];
    if (!second) {
      throw new Error("Expected a second native radio input");
    }

    second.checked = true;
    second.dispatchEvent(new Event("change", { bubbles: true }));
    fixture.detectChanges();

    expect(component.model().keuze).toBe("nee");
    expect(checkedOptions()).toEqual([false, true]);
  });
});

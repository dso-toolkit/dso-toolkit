import { Component, signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormField, disabled, form, required } from "@angular/forms/signals";
import type { SelectableChangeEvent } from "@dso-toolkit/core/dist/components";

import { DsoSelectable } from "../stencil-generated/components";

import { DsoSelectableCheckboxFieldControl } from "./selectable-checkbox-field-control";

@Component({
  selector: "dso-test-checkbox",
  standalone: true,
  imports: [DsoSelectableCheckboxFieldControl, DsoSelectable, FormField],
  template: `<dso-selectable type="checkbox" [formField]="myForm.akkoord"></dso-selectable>`,
})
class TestCheckboxComponent {
  model = signal({ akkoord: false });
  isDisabled = signal(false);
  myForm = form(this.model, (path) => {
    required(path.akkoord);
    disabled(path.akkoord, () => this.isDisabled());
  });
}

function createSelectableChangeEvent(checked: boolean): CustomEvent<SelectableChangeEvent> {
  return new CustomEvent("dsoChange", {
    detail: {
      originalEvent: new Event("change"),
      checked,
      value: "check",
    },
  });
}

describe("DsoSelectableCheckboxFieldControl", () => {
  let fixture: ComponentFixture<TestCheckboxComponent>;
  let component: TestCheckboxComponent;
  let element: HTMLDsoSelectableElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCheckboxComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    element = fixture.nativeElement.querySelector("dso-selectable");
  });

  it("should sync model to control", () => {
    expect(element.checked).toBe(false);

    component.model.set({ akkoord: true });
    fixture.detectChanges();

    expect(element.checked).toBe(true);
  });

  it("should sync control to model", () => {
    element.dispatchEvent(createSelectableChangeEvent(true));
    fixture.detectChanges();

    expect(component.model().akkoord).toBe(true);
  });

  it("should update touched state on focusout", () => {
    expect(component.myForm.akkoord().touched()).toBe(false);

    element.dispatchEvent(new Event("focusout"));
    fixture.detectChanges();

    expect(component.myForm.akkoord().touched()).toBe(true);
  });

  it("should sync disabled state", () => {
    expect(element.disabled).toBe(false);

    component.isDisabled.set(true);
    fixture.detectChanges();

    expect(element.disabled).toBe(true);

    component.isDisabled.set(false);
    fixture.detectChanges();

    expect(element.disabled).toBe(false);
  });

  it("should sync required state", () => {
    expect(element.required).toBe(true);
  });

  it("should sync invalid state", () => {
    expect(element.invalid).toBe(true);

    component.model.set({ akkoord: true });
    fixture.detectChanges();

    expect(element.invalid).toBe(false);
  });
});

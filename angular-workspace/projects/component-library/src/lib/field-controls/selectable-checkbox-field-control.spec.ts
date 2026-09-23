import { Component, signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import type { DsoSelectableCustomEvent, SelectableChangeEvent } from "@dso-toolkit/core/dist/components";

import { DsoSelectable } from "../stencil-generated/components";

import { DsoSelectableCheckboxFieldControl } from "./selectable-checkbox-field-control";

@Component({
  selector: "dso-test-checkbox",
  standalone: true,
  imports: [DsoSelectableCheckboxFieldControl, DsoSelectable],
  template: `
    <dso-selectable
      type="checkbox"
      value="check"
      [checked]="isChecked()"
      [disabled]="isDisabled()"
      [required]="isRequired()"
      [invalid]="isInvalid()"
      (dsoChange)="onChange($event)"
      (focusout)="onBlur()"
    ></dso-selectable>
  `,
})
class TestCheckboxComponent {
  isChecked = signal(false);
  isDisabled = signal(false);
  isRequired = signal(false);
  isInvalid = signal(false);
  touched = signal(false);

  onChange(event: DsoSelectableCustomEvent<SelectableChangeEvent>) {
    this.isChecked.set(event.detail.checked);
  }

  onBlur() {
    this.touched.set(true);
  }
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

    component.isChecked.set(true);
    fixture.detectChanges();

    expect(element.checked).toBe(true);
  });

  it("should sync control to model", () => {
    element.dispatchEvent(createSelectableChangeEvent(true));
    fixture.detectChanges();

    expect(component.isChecked()).toBe(true);
  });

  it("should update touched state on focusout", () => {
    expect(component.touched()).toBe(false);

    element.dispatchEvent(new Event("focusout"));
    fixture.detectChanges();

    expect(component.touched()).toBe(true);
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
    component.isRequired.set(true);
    fixture.detectChanges();

    expect(element.required).toBe(true);
  });

  it("should sync invalid state", () => {
    component.isInvalid.set(true);
    fixture.detectChanges();

    expect(element.invalid).toBe(true);
  });
});

import { Component, signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import type { DatePickerChangeEvent, DsoDatePickerCustomEvent } from "@dso-toolkit/core/dist/components";

import { DsoDatePicker } from "../stencil-generated/components";

import { DsoDatePickerFieldControl } from "./date-picker-field-control";

@Component({
  selector: "dso-test-date-picker",
  standalone: true,
  imports: [DsoDatePickerFieldControl, DsoDatePicker],
  template: `
    <dso-date-picker
      [value]="dateValue()"
      [disabled]="isDisabled()"
      [required]="isRequired()"
      [invalid]="isInvalid()"
      (dsoDateChange)="onDateChange($event)"
      (dsoBlur)="onBlur()"
    ></dso-date-picker>
  `,
})
class TestDatePickerComponent {
  dateValue = signal("01-01-2024");
  isDisabled = signal(false);
  isRequired = signal(false);
  isInvalid = signal(false);
  touched = signal(false);

  onDateChange(event: DsoDatePickerCustomEvent<DatePickerChangeEvent>) {
    this.dateValue.set(event.detail.value);
  }

  onBlur() {
    this.touched.set(true);
  }
}

function createDateChangeEvent(value: string): CustomEvent<DatePickerChangeEvent> {
  return new CustomEvent("dsoDateChange", {
    detail: {
      component: "dso-date-picker",
      originalEvent: new Event("change"),
      value,
      valueAsDate: undefined,
      validity: document.createElement("input").validity,
    },
  });
}

describe("DsoDatePickerFieldControl", () => {
  let fixture: ComponentFixture<TestDatePickerComponent>;
  let component: TestDatePickerComponent;
  let element: HTMLDsoDatePickerElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDatePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDatePickerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    element = fixture.nativeElement.querySelector("dso-date-picker");
  });

  it("should sync model to control", () => {
    expect(element.value).toBe("01-01-2024");

    component.dateValue.set("15-03-2024");
    fixture.detectChanges();

    expect(element.value).toBe("15-03-2024");
  });

  it("should sync control to model", () => {
    element.dispatchEvent(createDateChangeEvent("20-05-2024"));
    fixture.detectChanges();

    expect(component.dateValue()).toBe("20-05-2024");
  });

  it("should update touched state on blur", () => {
    expect(component.touched()).toBe(false);

    element.dispatchEvent(new CustomEvent("dsoBlur"));
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

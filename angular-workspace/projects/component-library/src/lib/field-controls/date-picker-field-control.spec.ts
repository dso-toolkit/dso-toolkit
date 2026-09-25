import { Component, signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormField, disabled, form, required } from "@angular/forms/signals";
import type { DatePickerChangeEvent } from "@dso-toolkit/core/dist/components";

import { DsoToolkitModule } from "../component-library.module";

@Component({
  selector: "dso-test-date-picker",
  standalone: true,
  imports: [DsoToolkitModule, FormField],
  template: `
    <dso-date-picker [formField]="myForm.datum" [minDate]="minimumDate()" [maxDate]="maximumDate()"></dso-date-picker>
  `,
})
class TestDatePickerComponent {
  model = signal({ datum: "01-01-2024" });
  isDisabled = signal(false);
  minimumDate = signal("01-01-2024");
  maximumDate = signal("31-12-2024");
  myForm = form(this.model, (path) => {
    required(path.datum);
    disabled(path.datum, () => this.isDisabled());
  });
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

    component.model.set({ datum: "15-03-2024" });
    fixture.detectChanges();

    expect(element.value).toBe("15-03-2024");
  });

  it("should sync control to model", () => {
    element.dispatchEvent(createDateChangeEvent("20-05-2024"));
    fixture.detectChanges();

    expect(component.model().datum).toBe("20-05-2024");
  });

  it("should update touched state on blur", () => {
    expect(component.myForm.datum().touched()).toBe(false);

    element.dispatchEvent(new CustomEvent("dsoBlur"));
    fixture.detectChanges();

    expect(component.myForm.datum().touched()).toBe(true);
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

  it("should sync date boundaries", () => {
    expect(element.min).toBe("01-01-2024");
    expect(element.max).toBe("31-12-2024");

    component.minimumDate.set("15-01-2024");
    component.maximumDate.set("15-12-2024");
    fixture.detectChanges();

    expect(element.min).toBe("15-01-2024");
    expect(element.max).toBe("15-12-2024");
  });

  it("should sync invalid state", () => {
    expect(element.invalid).toBe(false);

    component.model.set({ datum: "" });
    fixture.detectChanges();

    expect(element.invalid).toBe(true);

    component.model.set({ datum: "01-01-2024" });
    fixture.detectChanges();

    expect(element.invalid).toBe(false);
  });
});

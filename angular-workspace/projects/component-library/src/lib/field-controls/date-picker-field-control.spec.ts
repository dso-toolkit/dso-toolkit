import { Component, signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormField, disabled, form, max, min, required, validate } from "@angular/forms/signals";
import { DatePickerChangeEvent } from "dso-toolkit/dist/components";

import { DsoDatePickerFieldControl } from "../../public-api";
import { DsoDatePicker } from "../stencil-generated/components";

@Component({
  selector: "dso-test-date-picker",
  standalone: true,
  imports: [DsoDatePicker, DsoDatePickerFieldControl, FormField],
  template: `
    <dso-date-picker
      [formField]="myForm.datum"
      [minDate]="minimumDate()"
      [maxDate]="maximumDate()"
      [(inputError)]="dateInputError"
    ></dso-date-picker>
  `,
})
class TestDatePickerComponent {
  model = signal({ datum: "01-01-2024" });
  isDisabled = signal(false);
  minimumDate = signal<string | undefined>("01-01-2024");
  maximumDate = signal<string | undefined>("31-12-2024");
  numericMinimum = signal(1);
  numericMaximum = signal(100);
  dateInputError = signal<DatePickerChangeEvent["error"]>(undefined);
  myForm = form(this.model, (path) => {
    required(path.datum, { when: () => this.dateInputError() !== "invalid" });
    disabled(path.datum, () => this.isDisabled());
    min(path.datum, () => this.numericMinimum());
    max(path.datum, () => this.numericMaximum());
    validate(path.datum, ({ value }) =>
      !value() && this.dateInputError() === "invalid" ? { kind: "invalid" } : undefined,
    );
  });
}

function createDateEvent(
  type: "dsoDateChange" | "dsoBlur",
  value: string,
  error?: DatePickerChangeEvent["error"],
): CustomEvent<DatePickerChangeEvent> {
  return new CustomEvent(type, {
    detail: {
      component: "dso-date-picker",
      originalEvent: new Event("change"),
      value,
      valueAsDate: undefined,
      validity: document.createElement("input").validity,
      error,
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
    element.dispatchEvent(createDateEvent("dsoDateChange", "20-05-2024"));
    fixture.detectChanges();

    expect(component.model().datum).toBe("20-05-2024");
  });

  it("should update touched state on blur", () => {
    expect(component.myForm.datum().touched()).toBe(false);

    element.dispatchEvent(createDateEvent("dsoBlur", "01-01-2024"));
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

    component.numericMinimum.set(2);
    component.numericMaximum.set(200);
    fixture.detectChanges();

    expect(element.min).toBe("15-01-2024");
    expect(element.max).toBe("15-12-2024");

    component.minimumDate.set(undefined);
    component.maximumDate.set(undefined);
    fixture.detectChanges();

    expect(element.min).toBeUndefined();
    expect(element.max).toBeUndefined();

    component.numericMinimum.set(3);
    component.numericMaximum.set(300);
    fixture.detectChanges();

    expect(element.min).toBeUndefined();
    expect(element.max).toBeUndefined();
  });

  it("should retain out-of-range dates and expose their input errors", () => {
    element.dispatchEvent(createDateEvent("dsoDateChange", "31-12-2023", "min-range"));
    fixture.detectChanges();

    expect(component.model().datum).toBe("31-12-2023");
    expect(component.dateInputError()).toBe("min-range");

    element.dispatchEvent(createDateEvent("dsoDateChange", "01-01-2025", "max-range"));
    fixture.detectChanges();

    expect(component.model().datum).toBe("01-01-2025");
    expect(component.dateInputError()).toBe("max-range");
  });

  it("should distinguish invalid input from an empty field", () => {
    element.dispatchEvent(createDateEvent("dsoDateChange", "", "invalid"));
    fixture.detectChanges();

    expect(component.dateInputError()).toBe("invalid");
    expect(
      component.myForm
        .datum()
        .errors()
        .map((error) => error.kind),
    ).toContain("invalid");
    expect(
      component.myForm
        .datum()
        .errors()
        .map((error) => error.kind),
    ).not.toContain("required");

    element.dispatchEvent(createDateEvent("dsoDateChange", ""));
    fixture.detectChanges();

    expect(component.dateInputError()).toBeUndefined();
    expect(
      component.myForm
        .datum()
        .errors()
        .map((error) => error.kind),
    ).toContain("required");
    expect(
      component.myForm
        .datum()
        .errors()
        .map((error) => error.kind),
    ).not.toContain("invalid");
  });

  it("should update input errors on blur and clear them after a valid date", () => {
    element.dispatchEvent(createDateEvent("dsoBlur", "", "invalid"));
    fixture.detectChanges();

    expect(
      component.myForm
        .datum()
        .errors()
        .map((error) => error.kind),
    ).toContain("invalid");

    element.dispatchEvent(createDateEvent("dsoDateChange", "29-02-2024"));
    fixture.detectChanges();

    expect(component.myForm.datum().errors()).toEqual([]);
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

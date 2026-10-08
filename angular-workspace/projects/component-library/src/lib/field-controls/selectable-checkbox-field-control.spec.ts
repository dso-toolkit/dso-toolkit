import { Component, signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { FormField, disabled, form, required } from "@angular/forms/signals";
import { By } from "@angular/platform-browser";
import { SelectableChangeEvent } from "@dso-toolkit/core/dist/components";

import { BooleanValueAccessor, DsoSelectableCheckboxFieldControl, DsoToolkitModule } from "../../public-api";
import { DsoSelectable } from "../stencil-generated/components";

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

@Component({
  selector: "dso-test-module-checkbox",
  standalone: true,
  imports: [DsoToolkitModule, FormField],
  template: `<dso-selectable type="checkbox" [formField]="myForm.akkoord"></dso-selectable>`,
})
class TestModuleCheckboxComponent {
  model = signal({ akkoord: true });
  myForm = form(this.model);
}

@Component({
  selector: "dso-test-reactive-checkbox",
  standalone: true,
  imports: [DsoToolkitModule, ReactiveFormsModule],
  template: `<dso-selectable type="checkbox" [formControl]="control"></dso-selectable>`,
})
class TestReactiveCheckboxComponent {
  control = new FormControl(true);
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
    const control = fixture.debugElement
      .query(By.directive(DsoSelectableCheckboxFieldControl))
      .injector.get(DsoSelectableCheckboxFieldControl);
    const onTouch = vi.fn();
    control.touch.subscribe(onTouch);
    expect(component.myForm.akkoord().touched()).toBe(false);

    element.dispatchEvent(new Event("focusout"));
    fixture.detectChanges();

    expect(component.myForm.akkoord().touched()).toBe(true);
    expect(onTouch).toHaveBeenCalledOnce();
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

describe("DsoSelectableCheckboxFieldControl via DsoToolkitModule", () => {
  it("uses the Signal Forms adapter for the initial value and subsequent changes", async () => {
    await TestBed.configureTestingModule({ imports: [TestModuleCheckboxComponent] }).compileComponents();
    const fixture = TestBed.createComponent(TestModuleCheckboxComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const selectable = fixture.debugElement.query(By.directive(DsoSelectableCheckboxFieldControl));
    const element: HTMLDsoSelectableElement = selectable.nativeElement;
    expect(selectable.injector.get(BooleanValueAccessor, null)).toBeNull();
    expect(element.checked).toBe(true);

    component.model.set({ akkoord: false });
    fixture.detectChanges();
    expect(element.checked).toBe(false);

    element.dispatchEvent(createSelectableChangeEvent(true));
    fixture.detectChanges();
    expect(component.model().akkoord).toBe(true);
  });
});

describe("BooleanValueAccessor via DsoToolkitModule", () => {
  it("still binds checkboxes without formField to reactive forms", async () => {
    await TestBed.configureTestingModule({ imports: [TestReactiveCheckboxComponent] }).compileComponents();
    const fixture = TestBed.createComponent(TestReactiveCheckboxComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const selectable = fixture.debugElement.query(By.directive(BooleanValueAccessor));
    const element: HTMLDsoSelectableElement = selectable.nativeElement;
    expect(element.checked).toBe(true);

    component.control.setValue(false);
    fixture.detectChanges();
    expect(element.checked).toBe(false);

    element.dispatchEvent(createSelectableChangeEvent(true));
    fixture.detectChanges();
    expect(component.control.value).toBe(true);
  });
});

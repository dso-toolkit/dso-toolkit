import { NgModule } from "@angular/core";

import {
  DsoDatePickerFieldControl,
  DsoSelectableCheckboxFieldControl,
  DsoSelectableRadioGroupFieldControl,
} from "./field-controls";
import { DIRECTIVES } from "./stencil-generated";
import { BooleanValueAccessor, RadioValueAccessor } from "./value-accessors";

const VALUE_ACCESSORS = [BooleanValueAccessor, RadioValueAccessor];
const FIELD_CONTROLS = [
  DsoDatePickerFieldControl,
  DsoSelectableCheckboxFieldControl,
  DsoSelectableRadioGroupFieldControl,
];

@NgModule({
  imports: [...DIRECTIVES, ...VALUE_ACCESSORS, ...FIELD_CONTROLS],
  exports: [...DIRECTIVES, ...VALUE_ACCESSORS, ...FIELD_CONTROLS],
})
export class DsoToolkitModule {}

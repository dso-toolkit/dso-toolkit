import { DatePickerLegacy } from "../../date-picker-legacy/date-picker-legacy.models.js";

import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupDatePickerLegacy<TemplateFnReturnType>
  extends Omit<FormGroupBase<TemplateFnReturnType>, "label"> {
  group: "date-picker-legacy";
  datePickerLegacy: DatePickerLegacy;
}

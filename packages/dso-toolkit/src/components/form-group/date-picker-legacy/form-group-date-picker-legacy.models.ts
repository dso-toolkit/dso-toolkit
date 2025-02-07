import { DatePickerLegacy } from "../../date-picker-legacy/date-picker-legacy.models";

import { FormGroupBase } from "../form-group.base-model";

export interface FormGroupDatePickerLegacy<TemplateFnReturnType>
  extends Omit<FormGroupBase<TemplateFnReturnType>, "label"> {
  group: "date-picker-legacy";
  datePickerLegacy: DatePickerLegacy;
}

import { DatePickerLegacy } from "../../date-picker-legacy";
import { FormGroupBase } from "../form-group.base-model";

export interface FormGroupDatePickerLegacy<TemplateFnReturnType>
  extends Omit<FormGroupBase<TemplateFnReturnType>, "label"> {
  group: "date-picker-legacy";
  datePickerLegacy: DatePickerLegacy;
}

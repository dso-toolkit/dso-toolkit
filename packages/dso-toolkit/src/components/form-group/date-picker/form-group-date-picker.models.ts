import { DatePicker } from "../../date-picker";
import { FormGroupBase } from "../form-group.base-model";

export interface FormGroupDatePicker<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "date-picker";
  datePicker?: DatePicker;
}

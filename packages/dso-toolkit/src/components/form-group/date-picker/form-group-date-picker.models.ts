import { DatePicker } from "../../date-picker/date-picker.models";

import { FormGroupBase } from "../form-group.base-model";

export interface FormGroupDatePicker<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "date-picker";
  datePicker?: DatePicker;
}

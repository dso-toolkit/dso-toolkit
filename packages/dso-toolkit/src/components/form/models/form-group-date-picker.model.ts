import { DatePicker } from "../../date-picker/date-picker.models.js";

import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupDatePicker<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "date-picker";
  datePicker?: DatePicker;
}

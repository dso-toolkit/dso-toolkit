import { DatePicker } from "../../date-picker/date-picker.models.js";

import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupDatePicker<TemplateFnReturnType> extends Omit<FormGroupBase<TemplateFnReturnType>, "label"> {
  group: "date-picker";
  datePicker: DatePicker;
}

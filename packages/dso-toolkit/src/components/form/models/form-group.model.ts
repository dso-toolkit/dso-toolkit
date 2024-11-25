import { FormGroupCheckboxes } from "./form-group-checkboxes.model.js";
import { FormGroupConfirm } from "./form-group-confirm.model.js";
import { FormGroupDatePicker } from "./form-group-date-picker.model.js";
import { FormGroupDatePickerLegacy } from "./form-group-date-picker-legacy.model.js";
import { FormGroupFiles } from "./form-group-files.model.js";
import { FormGroupInput, FormGroupInputDate } from "./form-group-input.model.js";
import { FormGroupRadios } from "./form-group-radios.model.js";
import { FormGroupSearchBar } from "./form-group-search-bar.model.js";
import { FormGroupSelect } from "./form-group-select.model.js";
import { FormGroupStatic } from "./form-group-static.model.js";
import { FormGroupTextarea } from "./form-group-textarea.model.js";

export type FormGroup<TemplateFnReturnType> =
  | FormGroupCheckboxes<TemplateFnReturnType>
  | FormGroupConfirm<TemplateFnReturnType>
  | FormGroupDatePicker<TemplateFnReturnType>
  | FormGroupFiles<TemplateFnReturnType>
  | FormGroupInput<TemplateFnReturnType>
  | FormGroupInputDate<TemplateFnReturnType>
  | FormGroupDatePickerLegacy<TemplateFnReturnType>
  | FormGroupRadios<TemplateFnReturnType>
  | FormGroupSearchBar<TemplateFnReturnType>
  | FormGroupSelect<TemplateFnReturnType>
  | FormGroupStatic<TemplateFnReturnType>
  | FormGroupTextarea<TemplateFnReturnType>;

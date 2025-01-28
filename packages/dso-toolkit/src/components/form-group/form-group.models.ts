import { FormGroupCheckboxes } from "./models/form-group-checkboxes.model.js";
import { FormGroupConfirm } from "./models/form-group-confirm.model.js";
import { FormGroupDatePicker } from "./models/form-group-date-picker.model.js";
import { FormGroupDatePickerLegacy } from "./models/form-group-date-picker-legacy.model.js";
import { FormGroupFiles } from "./models/form-group-files.model.js";
import { FormGroupInput, FormGroupInputDate } from "./models/form-group-input.model.js";
import { FormGroupRadios } from "./models/form-group-radios.model.js";
import { FormGroupSearchBar } from "./models/form-group-search-bar.model.js";
import { FormGroupSelect } from "./models/form-group-select.model.js";
import { FormGroupStatic } from "./models/form-group-static.model.js";
import { FormGroupTextarea } from "./models/form-group-textarea.model.js";

export { FormGroupCheckboxes } from "./models/form-group-checkboxes.model.js";
export { FormGroupConfirm } from "./models/form-group-confirm.model.js";
export { FormGroupDatePicker } from "./models/form-group-date-picker.model.js";
export { FormGroupDatePickerLegacy } from "./models/form-group-date-picker-legacy.model.js";
export { FormGroupFiles, FormGroupFilesFile } from "./models/form-group-files.model.js";
export { FormGroupInput, FormGroupInputDate } from "./models/form-group-input.model.js";
export { FormGroupRadios } from "./models/form-group-radios.model.js";
export { FormGroupSearchBar } from "./models/form-group-search-bar.model.js";
export { FormGroupSelect, SelectOption, SelectOptionGroup } from "./models/form-group-select.model.js";
export { FormGroupStatic } from "./models/form-group-static.model.js";
export { FormGroupTextarea } from "./models/form-group-textarea.model.js";
export { FormGroupBase } from "./models/form-group.base-model.js";

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

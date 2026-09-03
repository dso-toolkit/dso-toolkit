import { FormGroupCheckboxes } from "./form-group-checkboxes.models.js";
import { FormGroupConfirm } from "./form-group-confirm.models.js";
import { FormGroupDatePicker } from "./form-group-date-picker.models.js";
import { FormGroupFiles } from "./form-group-files.models.js";
import { FormGroupInput, FormGroupInputDate } from "./form-group-input.models.js";
import { FormGroupRadios } from "./form-group-radios.models.js";
import { FormGroupSearchBar } from "./form-group-search-bar.models.js";
import { FormGroupSelect } from "./form-group-select.models.js";
import { FormGroupStatic } from "./form-group-static.models.js";
import { FormGroupTextarea } from "./form-group-textarea.models.js";

export { FormGroupCheckboxes } from "./form-group-checkboxes.models.js";
export { FormGroupConfirm } from "./form-group-confirm.models.js";
export { FormGroupDatePicker } from "./form-group-date-picker.models.js";
export { FormGroupFiles, FormGroupFilesFile } from "./form-group-files.models.js";
export { FormGroupInput, FormGroupInputDate } from "./form-group-input.models.js";
export { FormGroupRadios } from "./form-group-radios.models.js";
export { FormGroupSearchBar } from "./form-group-search-bar.models.js";
export { FormGroupSelect, SelectOption, SelectOptionGroup } from "./form-group-select.models.js";
export { FormGroupStatic } from "./form-group-static.models.js";
export { FormGroupTextarea } from "./form-group-textarea.models.js";
export { FormGroupBase } from "./form-group.base-model.js";

export type FormGroup<TemplateFnReturnType> =
  | FormGroupCheckboxes<TemplateFnReturnType>
  | FormGroupConfirm<TemplateFnReturnType>
  | FormGroupDatePicker<TemplateFnReturnType>
  | FormGroupFiles<TemplateFnReturnType>
  | FormGroupInput<TemplateFnReturnType>
  | FormGroupInputDate<TemplateFnReturnType>
  | FormGroupRadios<TemplateFnReturnType>
  | FormGroupSearchBar<TemplateFnReturnType>
  | FormGroupSelect<TemplateFnReturnType>
  | FormGroupStatic<TemplateFnReturnType>
  | FormGroupTextarea<TemplateFnReturnType>;

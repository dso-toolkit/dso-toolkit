import { FormGroupCheckboxes } from "./checkboxes/form-group-checkboxes.models";
import { FormGroupConfirm } from "./confirm/form-group-confirm.models";
import { FormGroupDatePicker } from "./date-picker/form-group-date-picker.models";
import { FormGroupDatePickerLegacy } from "./date-picker-legacy/form-group-date-picker-legacy.models";
import { FormGroupFiles } from "./files/form-group-files.models";
import { FormGroupInput, FormGroupInputDate } from "./input/form-group-input.models";
import { FormGroupRadios } from "./radios/form-group-radios.models";
import { FormGroupSearchBar } from "./search-bar/form-group-search-bar.models";
import { FormGroupSelect } from "./select/form-group-select.models";
import { FormGroupStatic } from "./static/form-group-static.models";
import { FormGroupTextarea } from "./textarea/form-group-textarea.models";

export { FormGroupCheckboxes } from "./checkboxes/form-group-checkboxes.models";
export { FormGroupConfirm } from "./confirm/form-group-confirm.models";
export { FormGroupDatePicker } from "./date-picker/form-group-date-picker.models";
export { FormGroupDatePickerLegacy } from "./date-picker-legacy/form-group-date-picker-legacy.models";
export { FormGroupFiles, FormGroupFilesFile } from "./files/form-group-files.models";
export { FormGroupInput, FormGroupInputDate } from "./input/form-group-input.models";
export { FormGroupRadios } from "./radios/form-group-radios.models";
export { FormGroupSearchBar } from "./search-bar/form-group-search-bar.models";
export { FormGroupSelect, SelectOption, SelectOptionGroup } from "./select/form-group-select.models";
export { FormGroupStatic } from "./static/form-group-static.models";
export { FormGroupTextarea } from "./textarea/form-group-textarea.models";
export { FormGroupBase } from "./form-group.base-model";

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

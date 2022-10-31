import { FormGroupCheckboxes } from "./form-group-checkboxes.model";
import { FormGroupConfirm } from "./form-group-confirm.model";
import { FormGroupFiles } from "./form-group-files.model";
import { FormGroupInput, FormGroupInputDate } from "./form-group-input.model";
import { FormGroupInputNumber } from "./form-group-input-number.model";
import { FormGroupRadios } from "./form-group-radios.model";
import { FormGroupSearchBar } from "./form-group-search-bar.model";
import { FormGroupSelect } from "./form-group-select.model";
import { FormGroupStatic } from "./form-group-static.model";
import { FormGroupTextarea } from "./form-group-textarea.model";

export type FormGroup<TemplateFnReturnType> =
  | FormGroupCheckboxes<TemplateFnReturnType>
  | FormGroupConfirm<TemplateFnReturnType>
  | FormGroupFiles<TemplateFnReturnType>
  | FormGroupInput<TemplateFnReturnType>
  | FormGroupInputNumber<TemplateFnReturnType>
  | FormGroupInputDate<TemplateFnReturnType>
  | FormGroupRadios<TemplateFnReturnType>
  | FormGroupSearchBar<TemplateFnReturnType>
  | FormGroupSelect<TemplateFnReturnType>
  | FormGroupStatic<TemplateFnReturnType>
  | FormGroupTextarea<TemplateFnReturnType>;

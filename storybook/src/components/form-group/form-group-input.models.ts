import { FormButtons } from "../form-buttons/form-buttons.models.js";
import { Icon } from "../icon/icon.models.js";

import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupInput extends FormGroupBase {
  group: "input";
  type: "text" | "email" | "password" | "url" | "tel";
  value?: string;
  placeholder?: string;
  size?: number;
  autocomplete?: boolean;
  feedback?: Icon;
  formButtons?: FormButtons;
}

export interface FormGroupInputDate extends Omit<FormGroupInput, "type"> {
  type: "date";
  min?: string;
  max?: string;
}

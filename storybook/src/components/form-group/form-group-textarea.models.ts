import { Icon } from "../icon/icon.models.js";

import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupTextarea extends FormGroupBase {
  group: "textarea";
  value?: string;
  placeholder?: string;
  rows?: number;
  feedback?: Icon;
}

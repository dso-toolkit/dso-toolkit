import { Icon } from "../../icon/icon.models.js";

import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupTextarea<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "textarea";
  value?: string;
  placeholder?: string;
  rows?: number;
  feedback?: Icon;
}

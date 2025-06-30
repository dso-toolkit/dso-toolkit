import { Icon } from "../../icon/icon.models";
import { FormGroupBase } from "../form-group.base-model";

export interface FormGroupTextarea<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "textarea";
  value?: string;
  placeholder?: string;
  rows?: number;
  feedback?: Icon;
}

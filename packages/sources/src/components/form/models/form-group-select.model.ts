import { Icon } from "../../..";

import { FormGroupBase } from "./form-group.base-model";

export interface FormGroupSelect<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "select";
  value?: string;
  multiple?: boolean;
  feedback?: Icon;
  items: SelectOptionGroup[] | SelectOption[];
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
  disabled?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  selected?: boolean;
}

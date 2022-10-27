import { Info } from "../info/info.models";

export interface Selectable<TemplateFnReturnType> {
  type: "radio" | "checkbox";
  id: string;
  name?: string;
  label: string | TemplateFnReturnType;
  value: string;
  required?: boolean;
  invalid?: boolean;
  describedById?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  dsoChange?: (e: Event) => void;
  info?: Info<TemplateFnReturnType>;
  slot?: string;
}

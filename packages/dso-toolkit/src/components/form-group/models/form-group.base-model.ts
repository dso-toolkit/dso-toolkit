import { Info } from "../../info/info.models.js";
import { InfoButton } from "../../info-button/info-button.models.js";

export interface FormGroupBase<TemplateFnReturnType> {
  group: string;
  label: string;
  id: string;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  infoButton?: InfoButton;
  info?: Info<TemplateFnReturnType>;
  state?: "invalid" | "valid";
  errorText?: string;
  helpText?: string;
}

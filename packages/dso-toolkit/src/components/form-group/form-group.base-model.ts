import { Info } from "../info/info.models";
import { InfoButton } from "../info-button/info-button.models";

export interface FormGroupBase<TemplateFnReturnType> {
  group: string;
  label: string;
  id: string;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  infoButton?: InfoButton<TemplateFnReturnType>;
  info?: Info<TemplateFnReturnType>;
  state?: "invalid" | "valid";
  errorText?: string;
  helpText?: string;
}

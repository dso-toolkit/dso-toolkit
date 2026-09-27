import { Info } from "../info/info.models.js";
import { InfoButton } from "../info-button/info-button.models.js";

export interface FormGroupBase {
  group: string;
  label: string;
  id: string;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  infoButton?: InfoButton;
  info?: Info;
  state?: "invalid" | "valid";
  errorText?: string;
  helpText?: string;
}

import { Info } from '../../..';
import { InfoButton } from '../../info-button/info-button.models';

export interface FormGroupBase<TemplateFnReturnType> {
  group: string;
  label: string;
  id: string;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  infoButton?: InfoButton;
  info?: Info<TemplateFnReturnType>;
  inline?: boolean;
  state?: 'invalid' | 'valid';
  errorText?: string;
  helpText?: string;
}

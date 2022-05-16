import { Icon } from '../../..';

import { FormGroupBase } from './form-group.base-model';

export interface FormGroupInput<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: 'input',
  type: 'text' | 'email' | 'password' | 'url' | 'tel';
  value?: string;
  placeholder?: string;
  size?: number;
  autocomplete?: boolean;
  feedback?: Icon;
}

export interface FormGroupInputDate<TemplateFnReturnType> extends Omit<FormGroupInput<TemplateFnReturnType>, 'type'> {
  type: 'date';
  min?: string;
  max?: string;
}

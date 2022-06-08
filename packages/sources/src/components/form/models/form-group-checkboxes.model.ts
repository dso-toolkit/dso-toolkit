import { Icon } from '../../..';

import { FormGroupBase } from './form-group.base-model';

export interface FormGroupCheckboxes<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: 'checkboxes',
  type: 'text' | 'email' | 'password' | 'url' | 'tel';
  value?: string;
  placeholder?: string;
  size?: number;
  autocomplete?: boolean;
  feedback?: Icon;
}

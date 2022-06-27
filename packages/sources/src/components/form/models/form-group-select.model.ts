import { Icon } from '../../..';

import { FormGroupBase } from './form-group.base-model';

export interface FormGroupSelect<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: 'select',
  value?: string;
  multiple?: boolean;
  feedback?: Icon;
}

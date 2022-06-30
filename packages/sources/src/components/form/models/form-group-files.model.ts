import { Icon } from '../../..';

import { FormGroupBase } from './form-group.base-model';

export interface FormGroupFiles<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: 'files';
  addFileButtonVariant: 'primary' | 'secondary';
  files: FormGroupFilesFile[];
  warning: string;
}

export interface FormGroupFilesFile {
  filename: string;
  confidential?: boolean;
}

// --

// interface Persoon {
//   naam: string;
//   leeftijd: number;
// }

// const pieter: Persoon = {
//   naam: 'pieter',
//   leeftijd: 23
// };

// const thomas: Persoon = {

// }

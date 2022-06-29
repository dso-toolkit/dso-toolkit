import { HandlerFunction } from '@storybook/addon-actions';
import { ArgTypes, noControl } from '../../../../stories-helpers';

import { FormGroupFiles } from '../../form.models';

export interface FormGroupFilesArgs {
}

export const formGroupFilesArgTypes: ArgTypes<FormGroupFilesArgs> = {

};

export function formGroupFilesArgsMapper(a: FormGroupFilesArgs): FormGroupFiles<any> {
  return {
  };
}

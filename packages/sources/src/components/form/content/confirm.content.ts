import { FormGroupConfirmArgs } from '../form-groups/confirm/form-group-confirm.args';

export const confirmContent: Omit<FormGroupConfirmArgs, 'infoButtonHandler' | 'infoCloseHandler'> = {
  id: 'mijn-id',
  required: false,
  disabled: false,
  errorText: 'Dit moet u verplicht aanvinken'
};

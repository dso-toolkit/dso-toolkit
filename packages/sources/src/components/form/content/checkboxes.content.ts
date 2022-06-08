import { FormGroupCheckboxesArgs } from '../form-groups/checkboxes/form-group-checkboxes.args';

export const checkboxesContent: Omit<FormGroupCheckboxesArgs, 'infoButtonHandler' | 'infoCloseHandler'> = {
  id: 'mijn-id',
  type: 'text',
  label: 'Vul "een waarde" in',
  value: 'een waarde',
  required: false,
  disabled: false,
  readonly: false,
  infoButtonLabel: 'Toelichting bij veld',
  infoActive: false,
  infoText: '<div class="dso-rich-content"><p>Rich text</p></div>',
  infoFixed: false
};

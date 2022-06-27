import { FormGroupSelectArgs } from '../form-groups/select/form-group-select.args';

export const selectContent: Omit<FormGroupSelectArgs, 'infoButtonHandler' | 'infoCloseHandler'> = {
  id: 'mijn-id',
  label: 'Vul "een waarde" in',
  required: false,
  disabled: false,
  multiple: false,
  infoButtonLabel: 'Toelichting bij veld',
  infoActive: false,
  infoText: '<div class="dso-rich-content"><p>Rich text</p></div>',
  infoFixed: false
};

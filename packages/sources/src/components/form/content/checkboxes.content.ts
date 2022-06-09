import { FormGroupCheckboxesArgs } from '../form-groups/checkboxes/form-group-checkboxes.args';

import { v4 as uuidv4 } from 'uuid';

export const checkboxesContent: Omit<FormGroupCheckboxesArgs, 'infoButtonHandler' | 'infoCloseHandler'> = {
  id: 'mijn-id',
  label: 'Checkboxes',
  required: false,
  disabled: false,
  infoButtonLabel: 'Toelichting bij veld',
  infoActive: false,
  infoText: '<div class="dso-rich-content"><p>Rich text</p></div>',
  infoFixed: false,
  errorText: 'Maak een keuze'
};

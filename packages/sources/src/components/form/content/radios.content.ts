import { FormGroupRadiosArgs } from '../form-groups/radios/form-group-radios.args';

export const radiosContent: Omit<FormGroupRadiosArgs, 'infoButtonHandler' | 'infoCloseHandler'> = {
  id: 'mijn-id',
  label: 'Radios',
  required: false,
  disabled: false,
  infoButtonLabel: 'Toelichting bij veld',
  infoActive: false,
  infoText: '<div class="dso-rich-content"><p>Rich text</p></div>',
  infoFixed: false,
  errorText: 'Maak een keuze'
};

import { FormGroupStaticArgs } from '../form-groups/static/form-group-static.args';

export const staticContent: Omit<FormGroupStaticArgs, 'infoButtonHandler' | 'infoCloseHandler'> = {
  id: 'mijn-id',
  label: 'Kleur van object',
  value: 'rood',
  edit: false,
  infoButtonLabel: 'Toelichting bij veld',
  infoActive: false,
  infoText: '<div class="dso-rich-content"><p>Rich text</p></div>',
  infoFixed: false
};

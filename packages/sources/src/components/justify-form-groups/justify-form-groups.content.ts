import { JustifyFormGroups } from './justify-form-groups.models';

export const content: JustifyFormGroups<unknown> = {
  formGroups: [
    {
      group: 'select',
      label: 'Type',
      id: 'type',
      items: [
        {
          value: 'rd',
          label: 'RD'
        },
        {
          value: 'wgs84',
          selected: true,
          label: 'WGS84'
        }
      ]
    },
    {
      group: 'input',
      label: 'Lattitude',
      type: 'text',
      id: 'lattitude',
      value: '52.07066496'
    },
    {
      group: 'input',
      label: 'Longitude',
      type: 'text',
      id: 'lattitude',
      value: '4.26389251'
    }
  ],
  buttons: [
    {
      type: 'button',
      modifier: 'dso-secondary btn-sm',
      variant: null,
      label: 'Zoeken'
    }
  ]
};
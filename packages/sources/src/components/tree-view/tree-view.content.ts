import { TreeViewItem } from './tree-view.models';

export const items: TreeViewItem<string>[] = [
  {
    reference: 'item.1',
    label: 'Bebouwde omgeving',
    open: true,
    hasItems: true,
    items: [
      {
        reference: 'item.1.1',
        label: 'bouwelementen',
        hasItems: true,
        items: [
          {
            reference: 'item.1.1.1',
            label: 'afvoerbuizen',
            hasItems: false
          },
          {
            reference: 'item.1.1.2',
            label: 'ankers',
            hasItems: true,
            items: [
              {
                reference: 'item.1.1.2.1',
                label: 'balkankers',
                hasItems: false
              }
            ]
          },
        ]
      },
      {
        reference: 'item.1.2',
        label: 'bouwonderdelen',
        hasItems: true,
        items: [
          {
            reference: 'item.1.2.1',
            label: 'aanbouwsels',
            hasItems: false
          },
          {
            reference: 'item.1.2.2',
            label: 'balkons',
            hasItems: false
          },
          {
            reference: 'item.1.2.3',
            label: 'binnenplaatsen',
            hasItems: true,
            items: [
              {
                reference: 'item.1.2.3.1',
                label: 'hofjes',
                hasItems: false
              },
              {
                reference: 'item.1.2.3.2',
                label: 'patio\'s',
                hasItems: false
              },
            ]
          }
        ]
      },
      {
        reference: 'item.1.3',
        label: 'bouwwerken',
        hasItems: true
      },
    ]
  },
  {
    reference: 'item.2',
    label: 'Woninginrichting',
    hasItems: true,
    items: [
      {
        reference: 'item.2.1',
        label: 'Beddengoed',
        hasItems: true,
        items: [
          {
            reference: 'item.2.1.1',
            label: 'Lakens',
            hasItems: false
          },
        ]
      },
      {
        reference: 'item.2.2',
        label: 'Doeken',
        hasItems: false
      }
    ]
  },
];

export const subItems: TreeViewItem<string>[] = [
  {
    reference: 'item.1.3.1',
    label: 'bebouwing',
    hasItems: true,
    items: [
      {
        reference: 'item.1.3.1.1',
        label: 'hoogbouw',
        hasItems: false
      },
      {
        reference: 'item.1.3.1.2',
        label: 'laagbouw',
        hasItems: false
      },
    ]
  },
  {
    reference: 'item.1.3.2',
    label: 'begraafplaatsen',
    hasItems: false
  },
  {
    reference: 'item.1.3.3',
    label: 'bouwvallen',
    hasItems: false
  },
  {
    reference: 'item.1.3.4',
    label: 'communicatiemasten',
    hasItems: false
  },
];

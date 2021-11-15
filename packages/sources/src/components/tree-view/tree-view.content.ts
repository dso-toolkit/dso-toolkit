import { TreeViewItem } from './tree-view.models';

export const items: TreeViewItem<string>[] = [
  {
    reference: 'item.1',
    label: 'Bebouwde omgeving',
    open: true,
    hasItems: true,
    icons: [
      {
        icon: 'municipality',
        label: 'gemeente'
      },
      {
        icon: 'eye',
        label: 'Toonbare activiteit'
      }
    ],
    items: [
      {
        reference: 'item.1.1',
        label: 'bouwelementen',
        hasItems: true,
        items: [
          {
            reference: 'item.1.1.1',
            label: 'afvoerbuizen',
            href: 'https://nl.wikipedia.org/wiki/afvoerbuizen',
            hasItems: false,
            icons: [
              {
                icon: 'water',
                label: 'waterschap'
              }
            ]
          },
          {
            reference: 'item.1.1.2',
            label: 'ankers',
            hasItems: true,
            items: [
              {
                reference: 'item.1.1.2.1',
                label: 'brugankers',
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
        icons: [
          {
            icon: 'crown',
            label: 'koninklijk'
          }
        ],
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
          },
          {
            reference: 'item.1.2.4',
            label: 'binnenplaatsen',
            hasItems: false
          },
          {
            reference: 'item.1.2.5',
            label: 'boxen',
            hasItems: false
          },
          {
            reference: 'item.1.2.6',
            label: 'eetzalen',
            hasItems: false
          },
          {
            reference: 'item.1.2.7',
            label: 'flieringen',
            hasItems: false
          },
          {
            reference: 'item.1.2.8',
            label: 'gangen',
            hasItems: false
          },
          {
            reference: 'item.1.2.9',
            label: 'hallen',
            hasItems: false
          },
          {
            reference: 'item.1.2.10',
            label: 'kamers',
            hasItems: false
          },
          {
            reference: 'item.1.2.11',
            label: 'kelders',
            hasItems: false
          },
        ]
      },
      {
        reference: 'item.1.3',
        label: 'bouwwerken',
        hasItems: true,
        icons: [
          {
            icon: 'buildings',
            label: 'gebouwen'
          },
          {
            icon: 'cultural',
            label: 'cultuur'
          }
        ],
      },
      {
        reference: 'item.1.4',
        label: 'complexen',
        hasItems: true,
      },
    ]
  },
  {
    reference: 'item.2',
    label: 'Woninginrichting',
    hasItems: true,
    icons: [
      {
        icon: 'eye',
        label: 'Toonbare activiteit'
      }
    ],
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

export const subItems: Record<string, TreeViewItem<string>[]> = {
  ['item.1.3']: [
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
      hasItems: false,
      icons: [
        {
          icon: 'parking',
          label: 'provincie'
        }
      ]
    },
  ],
  ['item.1.4']: [
    {
      reference: 'item.1.4.1',
      label: 'buurten',
      hasItems: true,
      items: [
        {
          reference: 'item.1.4.1.1',
          label: 'achterbuurten',
          hasItems: false
        },
        {
          reference: 'item.1.4.1.2',
          label: 'volksbuurten',
          hasItems: false
        },
      ]
    },
    {
      reference: 'item.1.4.2',
      label: 'campussen',
      hasItems: false
    },
    {
      reference: 'item.1.4.3',
      label: 'stadsdelen',
      hasItems: false
    },
    {
      reference: 'item.1.4.4',
      label: 'woonwijken',
      hasItems: false,
      icons: [
        {
          icon: 'house',
          label: 'wonen'
        }
      ]
    },
  ]
};


import { TreeViewItem } from "./tree-view.models.js";

export const items: TreeViewItem[] = [
  {
    id: "item.1",
    label: "Bebouwde omgeving",
    open: true,
    hasItems: true,
    icons: [
      {
        icon: "municipality",
        label: "gemeente",
      },
      {
        icon: "eye",
        label: "Toonbare activiteit",
      },
    ],
    items: [
      {
        id: "item.1.1",
        label: "bouwelementen",
        hasItems: true,
        items: [
          {
            id: "item.1.1.1",
            label: "afvoerbuizen",
            href: "https://nl.wikipedia.org/wiki/afvoerbuizen",
            hasItems: false,
            icons: [
              {
                icon: "water",
                label: "waterschap",
              },
            ],
          },
          {
            id: "item.1.1.2",
            label: "ankers",
            hasItems: true,
            items: [
              {
                id: "item.1.1.2.1",
                label: "brugankers",
                href: "wiki:Muuranker",
                hasItems: false,
              },
            ],
          },
        ],
      },
      {
        id: "item.1.2",
        label: "bouwonderdelen",
        hasItems: true,
        icons: [
          {
            icon: "crown",
            label: "koninklijk",
          },
        ],
        items: [
          {
            id: "item.1.2.1",
            label: "aanbouwsels",
            hasItems: false,
          },
          {
            id: "item.1.2.2",
            label: "balkons",
            hasItems: false,
          },
          {
            id: "item.1.2.3",
            label: "binnenplaatsen",
            hasItems: true,
            items: [
              {
                id: "item.1.2.3.1",
                label: "hofjes",
                hasItems: false,
              },
              {
                id: "item.1.2.3.2",
                label: "patio's",
                hasItems: false,
              },
            ],
          },
          {
            id: "item.1.2.4",
            label:
              "binnenplaatsen met buitengewoon grote open plekken waar je lekker kunt zitten en van de zon kunt genieten",
            hasItems: true,
            items: [
              {
                id: "item.1.2.4.1",
                label: "zonnehofjes",
                hasItems: false,
              },
            ],
          },
          {
            id: "item.1.2.5",
            label: "boxen",
            hasItems: false,
          },
          {
            id: "item.1.2.6",
            label: "eetzalen",
            hasItems: false,
          },
          {
            id: "item.1.2.7",
            label: "flieringen",
            hasItems: false,
          },
          {
            id: "item.1.2.8",
            label: "gangen",
            hasItems: false,
          },
          {
            id: "item.1.2.9",
            label: "hallen",
            hasItems: false,
          },
          {
            id: "item.1.2.10",
            label: "kamers",
            hasItems: false,
          },
          {
            id: "item.1.2.11",
            label: "kelders",
            hasItems: false,
          },
        ],
      },
      {
        id: "item.1.3",
        label: "bouwwerken",
        hasItems: true,
        icons: [
          {
            icon: "buildings",
            label: "gebouwen",
          },
          {
            icon: "cultural",
            label: "cultuur",
          },
        ],
      },
      {
        id: "item.1.4",
        label: "complexen",
        hasItems: true,
      },
    ],
  },
  {
    id: "item.2",
    label: "Woninginrichting",
    hasItems: true,
    icons: [
      {
        icon: "eye",
        label: "Toonbare activiteit",
      },
    ],
    items: [
      {
        id: "item.2.1",
        label: "Beddengoed",
        hasItems: true,
        items: [
          {
            id: "item.2.1.1",
            label: "Lakens",
            hasItems: false,
          },
        ],
      },
      {
        id: "item.2.2",
        label: "Doeken",
        hasItems: false,
      },
    ],
  },
];

export const subItems: Record<string, TreeViewItem[]> = {
  ["item.1.3"]: [
    {
      id: "item.1.3.1",
      label: "bebouwing",
      hasItems: true,
      items: [
        {
          id: "item.1.3.1.1",
          label: "hoogbouw",
          hasItems: false,
        },
        {
          id: "item.1.3.1.2",
          label: "laagbouw",
          hasItems: false,
        },
      ],
    },
    {
      id: "item.1.3.2",
      label: "begraafplaatsen",
      hasItems: false,
    },
    {
      id: "item.1.3.3",
      label: "bouwvallen",
      hasItems: false,
    },
    {
      id: "item.1.3.4",
      label: "communicatiemasten",
      hasItems: false,
      icons: [
        {
          icon: "parking",
          label: "provincie",
        },
      ],
    },
  ],
  ["item.1.4"]: [
    {
      id: "item.1.4.1",
      label: "buurten",
      hasItems: true,
      items: [
        {
          id: "item.1.4.1.1",
          label: "achterbuurten",
          hasItems: false,
        },
        {
          id: "item.1.4.1.2",
          label: "volksbuurten",
          hasItems: false,
        },
      ],
    },
    {
      id: "item.1.4.2",
      label: "campussen",
      hasItems: false,
    },
    {
      id: "item.1.4.3",
      label: "stadsdelen",
      hasItems: false,
    },
    {
      id: "item.1.4.4",
      label: "woonwijken",
      hasItems: false,
      icons: [
        {
          icon: "house",
          label: "wonen",
        },
      ],
    },
  ],
};

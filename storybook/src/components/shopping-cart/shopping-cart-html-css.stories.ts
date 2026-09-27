import { Meta, StoryObj } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/shopping-cart/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { fn } from "storybook/test";
import { v4 as uuidv4 } from "uuid";

import { shoppingCartTemplate } from "./shopping-cart-html-css.template.js";
import { ShoppingCartArgs, shoppingCartArgTypes, shoppingCartArgsMapper } from "./shopping-cart.args.js";

type ShoppingCartStory = StoryObj<ShoppingCartArgs>;

const meta: Meta<ShoppingCartArgs> = {
  title: "HTML|CSS/Shopping Cart",
  argTypes: shoppingCartArgTypes,
  args: {
    _implementation: "html/css",
    collapsable: true,
    collapsed: false,
    hideSummary: false,
    removeAll: false,
    isOpen: false,
    shoppingcartTitle: "Gekozen activiteiten",
    shoppingcartTitleTag: "h2",
    items: [],
    dsoToggle: fn(),
    dsoClose: fn(),
    dsoEdit: fn(),
    dsoDelete: fn(),
    dsoSubmit: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args) => shoppingCartTemplate(shoppingCartArgsMapper(args)),
};

export default meta;

export const Default: ShoppingCartStory = {};

export const EditItems: ShoppingCartStory = {
  args: {
    items: [
      {
        id: uuidv4(),
        label: "Milieubelastende activiteit - Melding",
      },
      {
        id: uuidv4(),
        label: "Milieubelastende activiteit - Melding",
        additive: "2",
        edit: true,
      },
    ],
  },
};

export const ItemsCollapsed: ShoppingCartStory = {
  args: {
    collapsed: true,
    items: [
      {
        id: uuidv4(),
        label: "Milieubelastende activiteit - Melding",
      },
      {
        id: uuidv4(),
        label: "Milieubelastende activiteit - Melding",
        additive: "2",
      },
    ],
  },
};

export const ItemsNonCollapsable: ShoppingCartStory = {
  args: {
    collapsable: false,
    removeAll: true,
    items: [
      {
        id: uuidv4(),
        label: "Milieubelastende activiteit - Melding",
        subitems: [
          {
            label: "Wasstraat of wasplaats",
          },
        ],
      },
      {
        id: uuidv4(),
        label: "Milieubelastende activiteit - Melding",
        additive: "Wasstraat om de hoek van garagebedrijf Jansen",
        subitems: [
          {
            label: "Wasstraat of wasplaats",
          },
        ],
      },
    ],
  },
};

export const RemoveAllItemsOption: ShoppingCartStory = {
  args: {
    removeAll: true,
    collapsed: true,
    items: [
      {
        id: uuidv4(),
        label: "Milieubelastende activiteit - Melding",
      },
      {
        id: uuidv4(),
        label: "Milieubelastende activiteit - Melding",
        additive: "2",
      },
    ],
  },
};

export const WithSubitems: ShoppingCartStory = {
  args: {
    items: [
      {
        id: uuidv4(),
        label: "Milieubelastende activiteit - Melding",
        subitems: [
          {
            label: "Wasstraat of wasplaats",
          },
        ],
      },
      {
        id: uuidv4(),
        label: "Milieubelastende activiteit - Melding",
        additive: "Wasstraat om de hoek van garagebedrijf Jansen",
        edit: true,
        subitems: [
          {
            label: "Wasstraat of wasplaats",
          },
        ],
      },
      {
        id: uuidv4(),
        label: "Milieubelastende activiteit gereguleerd in het omgevingsplan - Informatie (Rijk)",
        readonly: true,
        subitems: [
          {
            label:
              "Koelwater, niet afkomstig van een milieubelastende activiteit die is aangewezen in hoofdstuk 3 van het Besluit activiteiten, lozen in het riool of op of in de bodem.",
          },
        ],
      },
    ],
  },
};

export const WithSubitemsAndHiddenSummary: ShoppingCartStory = {
  args: {
    hideSummary: true,
    items: [
      {
        id: uuidv4(),
        label: "Milieubelastende activiteit - Melding",
        subitems: [
          {
            label: "Wasstraat of wasplaats",
          },
        ],
      },
      {
        id: uuidv4(),
        label: "Milieubelastende activiteit - Melding",
        additive: "Wasstraat om de hoek van garagebedrijf Jansen",
        edit: true,
        subitems: [
          {
            label: "Wasstraat of wasplaats",
          },
        ],
      },
    ],
  },
};

export const WithSubitemsAndWarning: ShoppingCartStory = {
  args: {
    isOpen: true,
    items: [
      {
        id: uuidv4(),
        label: "Tankstation starten of veranderen",
        readonly: true,
        subitems: [
          {
            label: "Tanken van diesel, benzine en andere vloeibare brandstof",
          },
          {
            label: "Tanken en opslaan van LPG",
          },
        ],
      },
      {
        id: uuidv4(),
        label: "Opslaan van vloeistoffen in een opslagtank",
        readonly: true,
        subitems: [
          {
            label: "Opslaan van vloeistoffen in een ondergrondse opslagtank",
            warning: true,
          },
        ],
      },
    ],
  },
};

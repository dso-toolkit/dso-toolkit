import readme from "@dso-toolkit/core/src/components/shopping-cart/readme.md?raw";
import componentsReadme from "@dso-toolkit/core/src/components/shopping-cart/shopping-cart-item/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { ShoppingCartArgs, shoppingCartArgTypes, shoppingCartArgsMapper } from "./shopping-cart.args.js";
import { coreShoppingCartTemplate } from "./shopping-cart.core-template";
import { ShoppingCartItem } from "./shopping-cart.models.js";

type ShoppingCartStory = StoryObj<ShoppingCartArgs<never>, Renderer>;

const meta: Meta<ShoppingCartArgs<never>> = {
  title: "Core/Shopping Cart",
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
  decorators: [
    (story, { args }) => html`
      <div class="row">
        <div class=${args.mode === "side" ? "col-xs-4 col-xs-push-4" : "col-xs-12"}>${story()}</div>
      </div>
    `,
  ],
  parameters: {
    docs: {
      page: () => compiler(`${readme}\n${componentsReadme}`),
    },
  },
};

export default meta;

const render = (args: ShoppingCartArgs<never>) => coreShoppingCartTemplate(shoppingCartArgsMapper(args));

const sideItems = ({ warning }: Pick<ShoppingCartArgs<never>, "warning">): ShoppingCartItem<never>[] => [
  {
    label: "Ontgraven, verplaatsen of toepassen van grond of baggerspecie in of bij een oppervlaktewaterlichaam",
    info: "Aanvraag vergunning (Gemeente Utrecht)",
    warning,
    subitems: [
      {
        label: "Afscheiding tussen balkons of dakterrassen plaatsen of vervangen",
        warning,
      },
    ],
  },
  {
    label: "Flora- en fauna-activiteit",
    info: "Aanvraag vergunning",
    warning,
  },
  {
    label: "Verspreiding Aziatische duizendknoopsoorten voorkomen",
    info: "Melding (gemeente Woerden) - 2x",
  },
  {
    label:
      "Lozen bij ontgravingen, baggerwerkzaamheden en werkzaamheden door de waterbeheerder op een oppervlaktewaterlichaam",
    info: "Informatie",
    subitems: [
      {
        label: "Lozen van grondwater bij ontwatering",
        warning,
      },
    ],
  },
  {
    label: "Graven in bodem met een kwaliteit onder of gelijk aan de interventiewaarde bodemkwaliteit",
    info: "Informatie",
  },
];

const mainItems = ({
  warning,
  itemMode,
}: Pick<ShoppingCartArgs<never>, "warning" | "itemMode">): ShoppingCartItem<never>[] => [
  {
    label: "Ontgraven, verplaatsen of toepassen van grond of baggerspecie in of bij een oppervlaktewaterlichaam",
    info: "Aanvraag vergunning (Gemeente Utrecht)",
    warning,
    subitems: [
      {
        label: "Afscheiding tussen balkons of dakterrassen plaatsen of vervangen",
        warning,
      },
    ],
  },
  {
    label: "Flora- en fauna-activiteit",
    info: "Aanvraag vergunning",
    warning,
  },
  itemMode === "edit"
    ? {
        mode: "edit",
        label: "Toevoeging bij activiteitnaam veranderen",
        form: {
          content: [
            {
              group: "static",
              id: "activiteitnaam",
              label: "Activiteitnaam",
              value: "Verspreiding Aziatische duizendknoopsoorten voorkomen",
            },
            {
              group: "input",
              id: "toevoeging",
              type: "text",
              label: "Toevoeging",
              value: "1",
              formButtons: {
                buttons: [
                  {
                    type: "submit",
                    label: "Opslaan",
                    variant: "primary",
                    compact: true,
                  },
                ],
              },
            },
          ],
        },
      }
    : {
        label: "Verspreiding Aziatische duizendknoopsoorten voorkomen - 1",
        info: "Melding (gemeente Woerden)",
      },
  {
    label: "Verspreiding Aziatische duizendknoopsoorten voorkomen - 2",
    info: "Melding (gemeente Woerden)",
  },
  {
    label:
      "Lozen bij ontgravingen, baggerwerkzaamheden en werkzaamheden door de waterbeheerder op een oppervlaktewaterlichaam",
    info: "Informatie",
    subitems: [
      {
        label: "Lozen van grondwater bij ontwatering",
        warning,
      },
    ],
  },
  {
    label: "Graven in bodem met een kwaliteit onder of gelijk aan de interventiewaarde bodemkwaliteit",
    info: "Informatie",
  },
];

export const Side: ShoppingCartStory = {
  args: {
    _implementation: "core",
    mode: "side",
    toggleable: true,
    editable: false,
    removable: true,
    warning: true,
    items: sideItems({ warning: true }),
  },
  render: (args) => render({ ...args, items: sideItems(args) }),
};

export const Main: ShoppingCartStory = {
  argTypes: {
    itemMode: {
      options: ["view", "edit"],
      control: {
        type: "radio",
      },
      table: {
        disable: false,
      },
    },
  },
  args: {
    _implementation: "core",
    mode: "main",
    toggleable: true,
    editable: true,
    removable: true,
    warning: true,
    itemMode: "view",
    items: mainItems({ warning: true, itemMode: "view" }),
  },
  render: (args) => render({ ...args, items: mainItems(args) }),
};

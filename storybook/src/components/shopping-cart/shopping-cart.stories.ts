import { cancelSwoopie, swoopie } from "@dso-toolkit/core";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit-html";
import { fn } from "storybook/test";

import { noControl } from "../../shared/no-control.js";
import { Button } from "../button/button.models.js";
import { IconButton } from "../icon-button/icon-button.models.js";
import { listButtonTemplate } from "../list-button/list-button.template.js";

import { ShoppingCartArgs, shoppingCartArgTypes, shoppingCartArgsMapper } from "./shopping-cart.args.js";
import { incomingCheckActivities, itemWarning, warningExplanation } from "./shopping-cart.content.js";
import { ShoppingCartItem } from "./shopping-cart.models.js";
import { shoppingCartTemplate } from "./shopping-cart.template.js";
import "./shopping-cart.stories.scss";

type ShoppingCartStory = StoryObj<ShoppingCartArgs>;

const meta: Meta<ShoppingCartArgs> = {
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
    click: fn(),
    dsoClick: fn(),
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
};

export default meta;

export function createFlyingCheck(): HTMLElement {
  const target = document.createElement("dso-selectable");

  target.setAttribute("type", "checkbox");
  target.setAttribute("checked", "");
  target.style.setProperty("--_dso-selectable-color", "#fff");
  target.style.setProperty("--_dso-selectable-background-color", "#2b5780");
  target.inert = true;

  return target;
}

const render = (args: ShoppingCartArgs, button?: Button | IconButton) =>
  shoppingCartTemplate({
    ...shoppingCartArgsMapper(args),
    button,
    warning: args.warning ? warningExplanation() : undefined,
  });

const handleAnimationSelectedChange = (event: CustomEvent<{ checked: boolean }>) => {
  if (!(event.currentTarget instanceof HTMLElement)) {
    return;
  }

  const listButton = event.currentTarget;
  listButton.toggleAttribute("checked", event.detail.checked);
  const selectable = listButton.shadowRoot?.querySelector<HTMLElement>("dso-selectable");

  if (!selectable) {
    return;
  }

  if (!event.detail.checked) {
    cancelSwoopie(selectable);
    return;
  }

  const shoppingCart = listButton.closest(".shopping-cart-animation")?.querySelector("dso-shopping-cart");
  const heading = shoppingCart?.querySelector<HTMLElement>('[slot="heading"]');

  if (!heading) {
    return;
  }

  swoopie(createFlyingCheck(), selectable, heading);
};

const warningText = (warning: boolean | undefined): string | undefined => (warning ? itemWarning() : undefined);

const sideItems: ShoppingCartItem[] = [
  {
    label: "Ontgraven, verplaatsen of toepassen van grond of baggerspecie in of bij een oppervlaktewaterlichaam",
    info: "Aanvraag vergunning (Gemeente Utrecht)",
    subitems: [
      {
        label: "Afscheiding tussen balkons of dakterrassen plaatsen of vervangen",
      },
    ],
  },
  {
    label: "Garagebedrijf, autoschadeherstelbedrijf, autowasstraat of bedrijf voor carrosseriebouw",
    info: "Aanvraag vergunning (Gemeente Woerden)",
    subitems: [
      {
        label: "Verbrandingsmotor proefdraaien",
      },
      {
        label: "Metaal bewerken of behandelen",
      },
    ],
  },
  {
    label: "Flora- en fauna-activiteit",
    info: "Aanvraag vergunning",
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
      },
    ],
  },
  {
    label: "Graven in bodem met een kwaliteit onder of gelijk aan de interventiewaarde bodemkwaliteit",
    info: "Informatie",
  },
];

const mainItems = ({ warning, itemMode }: Pick<ShoppingCartArgs, "warning" | "itemMode">): ShoppingCartItem[] => [
  {
    label: "Ontgraven, verplaatsen of toepassen van grond of baggerspecie in of bij een oppervlaktewaterlichaam",
    info: "Aanvraag vergunning (Gemeente Utrecht)",
    warning: warningText(warning),
    subitems: [
      {
        label: "Afscheiding tussen balkons of dakterrassen plaatsen of vervangen",
        warning: warningText(warning),
      },
    ],
  },
  {
    label: "Garagebedrijf, autoschadeherstelbedrijf, autowasstraat of bedrijf voor carrosseriebouw",
    info: "Aanvraag vergunning (Gemeente Woerden)",
    subitems: [
      {
        label: "Verbrandingsmotor proefdraaien",
        warning: warningText(warning),
      },
      {
        label: "Metaal bewerken of behandelen",
      },
    ],
  },
  {
    label: "Flora- en fauna-activiteit",
    info: "Aanvraag vergunning",
    warning: warningText(warning),
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
        warning: warningText(warning),
      },
    ],
  },
  {
    label: "Graven in bodem met een kwaliteit onder of gelijk aan de interventiewaarde bodemkwaliteit",
    info: "Informatie",
  },
];

export const Side: ShoppingCartStory = {
  argTypes: {
    warning: noControl(),
  },
  args: {
    _implementation: "core",
    mode: "side",
    editable: false,
    removable: true,
    items: sideItems,
  },
  render: (args) =>
    render(
      { ...args, items: sideItems },
      {
        icon: "chevron-left",
        variant: "secondary",
        label: "Openen",
        dsoClick: args.dsoClick,
      },
    ),
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
    editable: true,
    removable: true,
    warning: true,
    itemMode: "view",
    items: mainItems({ warning: true, itemMode: "view" }),
  },
  render: (args) =>
    render(
      { ...args, items: mainItems(args) },
      {
        variant: "secondary",
        label: "Sluiten",
        icon: { icon: "cross" },
        iconMode: "after",
        onClick: args.click,
      },
    ),
};

export const MainAllesVerwijderen: ShoppingCartStory = {
  name: "Main met Alles verwijderen",
  args: {
    _implementation: "core",
    mode: "main",
    editable: true,
    removable: true,
    warning: true,
    itemMode: "view",
    items: mainItems({ warning: true, itemMode: "view" }),
  },
  render: (args) =>
    render(
      { ...args, items: mainItems(args) },
      {
        variant: "tertiary",
        label: "Alles verwijderen",
        icon: { icon: "trash" },
        iconMode: "after",
        onClick: args.click,
      },
    ),
};

export const IncomingCheck: ShoppingCartStory = {
  name: "Incoming check animation",
  render: () => html`
    <div class="row shopping-cart-animation">
      <div class="col-sm-8">
        ${incomingCheckActivities.map((label) =>
          listButtonTemplate({ label, dsoSelectedChange: handleAnimationSelectedChange }),
        )}
      </div>
      <div class="col-sm-4">
        ${shoppingCartTemplate({ mode: "side", title: "Gekozen activiteiten", titleTag: "h2", items: [] })}
      </div>
    </div>
  `,
};

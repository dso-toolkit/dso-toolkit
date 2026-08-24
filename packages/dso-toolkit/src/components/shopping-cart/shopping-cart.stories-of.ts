import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";
import { v4 as uuidv4 } from "uuid";

import { componentArgs } from "../../storybook";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { ShoppingCartArgs, shoppingCartArgTypes, shoppingCartArgsMapper } from "./shopping-cart.args.js";
import { ShoppingCart, ShoppingCartItem } from "./shopping-cart.models.js";

type ShoppingCartStory<TemplateFnReturnType> = StoryObj<ShoppingCartArgs<TemplateFnReturnType>, Renderer>;

interface ShoppingCartStories<TemplateFnReturnType> {
  Default: ShoppingCartStory<TemplateFnReturnType>; // HTML/CSS
  ItemsCollapsed: ShoppingCartStory<TemplateFnReturnType>; // HTML/CSS
  ItemsNonCollapsable: ShoppingCartStory<TemplateFnReturnType>; // HTML/CSS
  RemoveAllItemsOption: ShoppingCartStory<TemplateFnReturnType>; // HTML/CSS
  EditItems: ShoppingCartStory<TemplateFnReturnType>; // HTML/CSS
  WithSubitems: ShoppingCartStory<TemplateFnReturnType>; // HTML/CSS
  WithSubitemsAndHiddenSummary: ShoppingCartStory<TemplateFnReturnType>; // HTML/CSS
  WithSubitemsAndWarning: ShoppingCartStory<TemplateFnReturnType>; // HTML/CSS
  Side: ShoppingCartStory<TemplateFnReturnType>; // Core
  Main: ShoppingCartStory<TemplateFnReturnType>; // Core
}

interface ShoppingCartStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  ShoppingCartTemplates<TemplateFnReturnType>
> {}

export interface ShoppingCartTemplates<TemplateFnReturnType> {
  shoppingCartTemplate: (shoppingCartProperties: ShoppingCart<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function shoppingCartMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ShoppingCartArgs<never>
> {
  return {
    argTypes: shoppingCartArgTypes,
    args: componentArgs<ShoppingCartArgs<never>>({
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
    }),
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function shoppingCartStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ShoppingCartStoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType
>): ShoppingCartStories<TemplateFnReturnType> {
  const render = templateContainer.render(
    storyTemplates,
    (args: ShoppingCartArgs<TemplateFnReturnType>, { shoppingCartTemplate }) =>
      shoppingCartTemplate(shoppingCartArgsMapper(args)),
  );

  const sideItems = ({
    warning,
  }: Pick<ShoppingCartArgs<TemplateFnReturnType>, "warning">): ShoppingCartItem<TemplateFnReturnType>[] => [
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
  }: Pick<
    ShoppingCartArgs<TemplateFnReturnType>,
    "warning" | "itemMode"
  >): ShoppingCartItem<TemplateFnReturnType>[] => [
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
              },
            ],
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

  return {
    Default: {
      render,
    },
    Side: {
      args: componentArgs<
        Pick<
          ShoppingCartArgs<TemplateFnReturnType>,
          "mode" | "toggleable" | "editable" | "removable" | "warning" | "items" | "_implementation"
        >
      >({
        _implementation: "core",
        mode: "side",
        toggleable: true,
        editable: false,
        removable: true,
        warning: true,
        items: sideItems({ warning: true }),
      }),
      render: (args, context) => render({ ...args, items: sideItems(args) }, context),
    },
    Main: {
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
      args: componentArgs<
        Pick<
          ShoppingCartArgs<TemplateFnReturnType>,
          "mode" | "toggleable" | "editable" | "removable" | "warning" | "itemMode" | "items" | "_implementation"
        >
      >({
        _implementation: "core",
        mode: "main",
        toggleable: true,
        editable: true,
        removable: true,
        warning: true,
        itemMode: "view",
        items: mainItems({ warning: true, itemMode: "view" }),
      }),
      render: (args, context) => render({ ...args, items: mainItems(args) }, context),
    },
    EditItems: {
      args: componentArgs<Pick<ShoppingCartArgs<never>, "items">>({
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
      }),
      render,
    },
    ItemsCollapsed: {
      args: componentArgs<Pick<ShoppingCartArgs<never>, "collapsed" | "items">>({
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
      }),
      render,
    },
    ItemsNonCollapsable: {
      args: componentArgs<Pick<ShoppingCartArgs<never>, "collapsable" | "removeAll" | "items">>({
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
      }),
      render,
    },
    RemoveAllItemsOption: {
      args: componentArgs<Pick<ShoppingCartArgs<never>, "removeAll" | "collapsed" | "items">>({
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
      }),
      render,
    },
    WithSubitems: {
      args: componentArgs<Pick<ShoppingCartArgs<never>, "items">>({
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
      }),
      render,
    },
    WithSubitemsAndHiddenSummary: {
      args: componentArgs<Pick<ShoppingCartArgs<never>, "hideSummary" | "items">>({
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
      }),
      render,
    },
    WithSubitemsAndWarning: {
      args: componentArgs<Pick<ShoppingCartArgs<never>, "isOpen" | "items">>({
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
      }),
      render,
    },
  };
}

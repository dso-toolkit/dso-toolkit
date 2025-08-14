import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { v4 as uuidv4 } from "uuid";

import { componentArgs } from "../../storybook";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { ShoppingCartArgs, shoppingCartArgTypes, shoppingCartArgsMapper } from "./shopping-cart.args.js";
import { ShoppingCart } from "./shopping-cart.models.js";

type ShoppingCartStory = StoryObj<ShoppingCartArgs, Renderer>;

interface ShoppingCartStories {
  Default: ShoppingCartStory;
  ItemsCollapsed: ShoppingCartStory;
  ItemsNonCollapsable: ShoppingCartStory;
  RemoveAllItemsOption: ShoppingCartStory;
  EditItems: ShoppingCartStory;
  WithSubitems: ShoppingCartStory;
  WithSubitemsAndHiddenSummary: ShoppingCartStory;
  WithSubitemsAndWarning: ShoppingCartStory;
}

interface ShoppingCartStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ShoppingCartTemplates<TemplateFnReturnType>
  > {}

export interface ShoppingCartTemplates<TemplateFnReturnType> {
  shoppingCartTemplate: (shoppingCartProperties: ShoppingCart) => TemplateFnReturnType;
}

export function shoppingCartMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ShoppingCartArgs
> {
  return {
    argTypes: shoppingCartArgTypes,
    args: componentArgs<ShoppingCartArgs>({
      collapsable: true,
      collapsed: false,
      hideSummary: false,
      removeAll: false,
      isOpen: false,
      shoppingcartTitle: "Mijn activiteiten",
      shoppingcartTitleTag: "h2",
      items: [],
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
}: ShoppingCartStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ShoppingCartStories {
  const render = templateContainer.render(storyTemplates, (args: ShoppingCartArgs, { shoppingCartTemplate }) =>
    shoppingCartTemplate(shoppingCartArgsMapper(args)),
  );

  return {
    Default: {
      render,
    },
    EditItems: {
      args: componentArgs<Pick<ShoppingCartArgs, "items">>({
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
      args: componentArgs<Pick<ShoppingCartArgs, "collapsed" | "items">>({
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
      args: componentArgs<Pick<ShoppingCartArgs, "collapsable" | "removeAll" | "items">>({
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
      args: componentArgs<Pick<ShoppingCartArgs, "removeAll" | "collapsed" | "items">>({
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
      args: componentArgs<Pick<ShoppingCartArgs, "items">>({
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
      args: componentArgs<Pick<ShoppingCartArgs, "hideSummary" | "items">>({
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
      args: componentArgs<Pick<ShoppingCartArgs, "isOpen" | "items">>({
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

import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";
import { v4 as uuidv4 } from "uuid";

import { componentArgs } from "../../storybook";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { ShoppingCartArgs, shoppingCartArgTypes, shoppingCartArgsMapper } from "./shopping-cart.args.js";
import { ShoppingCart } from "./shopping-cart.models.js";

type ShoppingCartStory = StoryObj<ShoppingCartArgs, Renderer>;

interface ShoppingCartStories {
  Default: ShoppingCartStory; // HTML/CSS
  ItemsCollapsed: ShoppingCartStory; // HTML/CSS
  ItemsNonCollapsable: ShoppingCartStory; // HTML/CSS
  RemoveAllItemsOption: ShoppingCartStory; // HTML/CSS
  EditItems: ShoppingCartStory; // HTML/CSS
  WithSubitems: ShoppingCartStory; // HTML/CSS
  WithSubitemsAndHiddenSummary: ShoppingCartStory; // HTML/CSS
  WithSubitemsAndWarning: ShoppingCartStory; // HTML/CSS
  Side: ShoppingCartStory; // Core
  Main: ShoppingCartStory; // Core
}

interface ShoppingCartStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
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
    Side: {
      args: componentArgs<Pick<ShoppingCartArgs, "variant" | "toggleLabel" | "items" | "_implementation">>({
        _implementation: "core",
        variant: "side",
        toggleLabel: "Openen",
        items: [
          {
            label:
              "Ontgraven, verplaatsen of toepassen van grond of baggerspecie in of bij een oppervlaktewaterlichaam",
            info: "Aanvraag vergunning (Gemeente Utrecht)",
            warning: true,
          },
          {
            label: "Flora- en fauna-activiteit",
            info: "Aanvraag vergunning",
          },
          {
            label: "Verspreiding Aziatische duizendknoopsoorten voorkomen",
            info: "Melding (gemeente Woerden) - 2x",
          },
        ],
      }),
      render,
    },
    Main: {
      args: componentArgs<Pick<ShoppingCartArgs, "variant" | "toggleLabel" | "items" | "_implementation">>({
        _implementation: "core",
        variant: "main",
        toggleLabel: "Sluiten",
        items: [
          {
            variant: "form",
            label: "Toevoeging bij activiteitnaam veranderen",
          },
          {
            label:
              "Ontgraven, verplaatsen of toepassen van grond of baggerspecie in of bij een oppervlaktewaterlichaam, niet zijnde de Noordzee, of waterkering in beheer bij het Rijk",
            info: "Aanvraag vergunning (Gemeente Woerden)",
            warning: true,
            subitems: [
              {
                label: "Afscheiding tussen balkons of dakterrassen plaatsen of vervangen",
                warning: true,
              },
            ],
          },
          {
            label: "Verspreiding Aziatische duizendknoopsoorten voorkomen (1)",
            info: "Melding (gemeente Woerden)",
          },
          {
            label: "Graven in bodem met een kwaliteit onder of gelijk aan de interventiewaarde bodemkwaliteit",
            info: "Informatie",
          },
        ],
      }),
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

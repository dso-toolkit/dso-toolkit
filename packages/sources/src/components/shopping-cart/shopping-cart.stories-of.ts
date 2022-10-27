import { componentArgs } from '../../storybook';

import { v4 as uuidv4 } from 'uuid';

import { ShoppingCartArgs, shoppingCartArgsMapper, shoppingCartArgTypes } from './shopping-cart.args';
import { ShoppingCart } from './shopping-cart.models';
import { storiesOfFactory } from '../../storybook/stories-of-factory';

export interface ShoppingCartTemplates<TemplateFnReturnType> {
  shoppingCartTemplate: (shoppingCartProperties: ShoppingCart) => TemplateFnReturnType;
}

export const storiesOfShoppingCart = storiesOfFactory<ShoppingCartTemplates<any>, ShoppingCartArgs>('Shopping Cart', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: shoppingCartArgTypes,
    args: componentArgs<ShoppingCartArgs>({
      collapsable: true,
      collapsed: false,
      hideSummary: false,
      removeAll: false,
      isOpen: false,
      shoppingcartTitle: 'Mijn activiteiten',
      shoppingcartTitleTag: 'h2',
      items: []
    })
  });

  const template = templateMapper((args, { shoppingCartTemplate }) => shoppingCartTemplate(shoppingCartArgsMapper(args)));

  stories.add(
    'default',
    template
  );

  stories.add(
    'items collapsed',
    template,
    {
      args: componentArgs<Pick<ShoppingCartArgs, 'collapsed' | 'items'>>({
        collapsed: true,
        items: [
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding'
          },
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding',
            additive: '2'
          }
        ]
      })
    }
  );

  stories.add(
    'items non-collapsable',
    template,
    {
      args: componentArgs<Pick<ShoppingCartArgs, 'collapsable' | 'removeAll' | 'items'>>({
        collapsable: false,
        removeAll: true,
        items: [
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding',
            subitems: [
              {
                label: 'Wasstraat of wasplaats'
              }
            ]
          },
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding',
            additive: 'Wasstraat om de hoek van garagebedrijf Jansen',
            subitems: [
              {
                label: 'Wasstraat of wasplaats'
              }
            ]
          }
        ]
      })
    }
  );

  stories.add(
    'remove all items option',
    template,
    {
      args: componentArgs<Pick<ShoppingCartArgs, 'removeAll' | 'collapsed' | 'items'>>({
        removeAll: true,
        collapsed: true,
        items: [
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding'
          },
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding',
            additive: '2'
          }
        ]
      })
    }
  );

  stories.add(
    'edit items',
    template,
    {
      args: componentArgs<Pick<ShoppingCartArgs, 'items'>>({
        items: [
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding'
          },
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding',
            additive: '2',
            edit: true
          }
        ]
      })
    }
  );

  stories.add(
    'with subitems',
    template,
    {
      args: componentArgs<Pick<ShoppingCartArgs, 'items'>>({
        items: [
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding',
            subitems: [
              {
                label: 'Wasstraat of wasplaats'
              }
            ]
          },
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding',
            additive: 'Wasstraat om de hoek van garagebedrijf Jansen',
            edit: true,
            subitems: [
              {
                label: 'Wasstraat of wasplaats'
              }
            ]
          },
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit gereguleerd in het omgevingsplan - Informatie (Rijk)',
            readonly: true,
            subitems: [
              {
                label: 'Koelwater, niet afkomstig van een milieubelastende activiteit die is aangewezen in hoofdstuk 3 van het Besluit activiteiten, lozen in het riool of op of in de bodem.'
              }
            ]
          }
        ]
      })
    }
  );

  stories.add(
    'with subitems and hidden summary',
    template,
    {
      args: componentArgs<Pick<ShoppingCartArgs, 'hideSummary' | 'items'>>({
        hideSummary: true,
        items: [
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding',
            subitems: [
              {
                label: 'Wasstraat of wasplaats'
              }
            ]
          },
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding',
            additive: 'Wasstraat om de hoek van garagebedrijf Jansen',
            edit: true,
            subitems: [
              {
                label: 'Wasstraat of wasplaats'
              }
            ]
          }
        ]
      })
    }
  );

  stories.add(
    'with subitems and warning',
    template,
    {
      args: componentArgs<Pick<ShoppingCartArgs, 'isOpen' | 'items'>>({
        isOpen: true,
        items: [
          {
            id: uuidv4(),
            label: 'Tankstation starten of veranderen',
            readonly: true,
            subitems: [
              {
                label: 'Tanken van diesel, benzine en andere vloeibare brandstof'
              },
              {
                label: 'Tanken en opslaan van LPG'
              }
            ]
          },
          {
            id: uuidv4(),
            label: 'Opslaan van vloeistoffen in een opslagtank',
            readonly: true,
            subitems: [
              {
                label: 'Opslaan van vloeistoffen in een ondergrondse opslagtank',
                warning: true
              }
            ]
          }
        ]
      })
    }
  );
});

import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { v4 as uuidv4 } from 'uuid';

import { shoppingCartArgsMapper, shoppingCartArgTypes } from './shopping-cart.args';
import { ShoppingCart } from './shopping-cart.models';

export interface ShoppingCartParameters<TemplateFnReturnType> {
  shoppingCartTemplate: (shoppingCartProperties: ShoppingCart) => TemplateFnReturnType;
}

export function storiesOfShoppingCart<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    shoppingCartTemplate: shoppingCartTemplate
  }: ShoppingCartParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(shoppingCartArgsMapper, shoppingCartTemplate);

  const stories = storiesOf('Shopping Cart', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: shoppingCartArgTypes,
      args: {
        collapsed: false,
        hideSummary: false,
        isOpen: false,
        shoppingcartTitle: 'Mijn activiteiten',
        shoppingcartTitleTag: 'h2'
      }
    });

  stories.add(
    'items collapsed',
    template,
    {
      args: {
        collapsed: true,
        items: [
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding'
          },
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding',
            additive: 2
          }
        ]
      }
    }
  );

  stories.add(
    'edit items',
    template,
    {
      args: {
        items: [
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding'
          },
          {
            id: uuidv4(),
            label: 'Milieubelastende activiteit - Melding',
            additive: 2,
            edit: true
          }
        ]
      }
    }
  );

  stories.add(
    'with subitems',
    template,
    {
      args: {
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
      }
    }
  );

  stories.add(
    'with subitems and hidden summary',
    template,
    {
      args: {
        hideSummary: true,
        items: [
          {
            label: 'Milieubelastende activiteit - Melding',
            subitems: [
              {
                label: 'Wasstraat of wasplaats'
              }
            ]
          },
          {
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
      }
    }
  );

  stories.add(
    'with subitems and warning',
    template,
    {
      args: {
        isOpen: true,
        items: [
          {
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
      }
    }
  );
}


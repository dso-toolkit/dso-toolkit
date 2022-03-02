import { bindTemplate, componentArgs, StorybookParameters } from '../../stories-helpers';

import { ShoppingCartArgs, shoppingCartArgsMapper, shoppingCartArgTypes } from './shopping-cart.args';
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
    shoppingCartTemplate
  }: ShoppingCartParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(shoppingCartArgsMapper, shoppingCartTemplate);

  const stories = storiesOf('Shopping Cart', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        collapsed: false,
        hideSummary: false,
        shoppingcartTitle: 'Mijn activiteiten',
        shoppingcartTitleTag: 'h2',
        items: []
      },
      argTypes: shoppingCartArgTypes
    });

  stories.add(
    'Default',
    template
  );

  stories.add(
    'Collapsed',
    template,
    {
      args: {
        collapsed: true,
        items: [
          {
            label: 'Milieubelastende activiteit - Melding'
          },
          {
            label: 'Milieubelastende activiteit - Melding',
            additive: 2
          }
        ]
      }
    }
  );

  stories.add(
    'Expanded',
    template,
    {
      args: {
        items: [
          {
            label: 'Milieubelastende activiteit - Melding'
          },
          {
            label: 'Milieubelastende activiteit - Melding',
            additive: 2
          }
        ]
      }
    }
  );

  stories.add(
    'Editable items',
    template,
    {
      args: {
        items: [
          {
            label: 'Milieubelastende activiteit - Melding'
          },
          {
            label: 'Milieubelastende activiteit - Melding',
            additive: 2,
            edit: true
          }
        ]
      }
    }
  );

  stories.add(
    'Subitems',
    template,
    {
      args: {
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
          },
          {
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
}

import { storiesOfShoppingCart } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components'

import { shoppingCartTemplate } from './shopping-cart.template';
import readme from './readme.md';

storiesOfShoppingCart(
  {
    module,
    storiesOf,
    readme
  },
  {
    shoppingCartTemplate
  }
);

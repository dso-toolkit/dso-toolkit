import { storiesOfShoppingCart } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components'

import { shoppingCartTemplate } from '@dso-toolkit/css/src/components/shopping-cart/shopping-cart.template';
import readme from '@dso-toolkit/css/src/components/shopping-cart/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfShoppingCart(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    shoppingCartTemplate
  }
);

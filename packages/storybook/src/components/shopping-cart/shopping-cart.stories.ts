import { storiesOfShoppingCart } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components'

import cssReadme from '@dso-toolkit/css/src/components/shopping-cart/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfShoppingCart({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  storyTemplates: ({ shoppingCartTemplate }) => ({ shoppingCartTemplate })
});

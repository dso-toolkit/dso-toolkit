import { storiesOfCards } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { cardsTemplate } from './cards.template';
import readme from './readme.md';

storiesOfCards(
  {
    module,
    storiesOf,
    readme
  },
  {
    cardsTemplate
  }
);

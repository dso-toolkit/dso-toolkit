import { storiesOfCard } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { cardTemplate } from './card.template';
import readme from './readme.md';

storiesOfCard(
  {
    module,
    storiesOf,
    readme
  },
  {
    cardTemplate
  }
);

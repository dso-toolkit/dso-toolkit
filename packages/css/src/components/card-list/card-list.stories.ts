import { storiesOfCardList } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { cardListTemplate } from './card-list.template';
import readme from './readme.md';

storiesOfCardList(
  {
    module,
    storiesOf,
    readme
  },
  {
    cardListTemplate
  }
);

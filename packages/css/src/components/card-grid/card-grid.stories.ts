import { storiesOfCardGrid } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { cardGridTemplate } from './card-grid.template';
import readme from './readme.md';

storiesOfCardGrid(
  {
    module,
    storiesOf,
    readme
  },
  {
    cardGridTemplate
  }
);

import { storiesOfTile } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components'

import { tileTemplate } from './tile.template';
import readme from './readme.md';

storiesOfTile(
  {
    module,
    storiesOf,
    readme
  },
  {
    tileTemplate
  }
);

import { storiesOfTable } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';

import readme from './readme.md';
import { tableTemplate } from './table.template';

storiesOfTable(
  {
    module,
    storiesOf,
    readme
  },
  {
    tableTemplate
  }
);

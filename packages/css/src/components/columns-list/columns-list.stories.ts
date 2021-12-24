import { storiesOfColumnsList } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { columnsListTemplate } from './columns-list.template';
import readme from './readme.md';

storiesOfColumnsList(
  {
    storiesOf,
    module,
    readme
  },
  {
    columnsListTemplate
  }
);

import { storiesOfList } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { listTemplate } from './list.template';
import readme from './readme.md';

storiesOfList(
  {
    storiesOf,
    module,
    readme
  },
  {
    listTemplate
  }
);

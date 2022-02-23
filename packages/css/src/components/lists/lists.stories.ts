import { storiesOfLists } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { listsTemplate } from './lists.template';
import readme from './readme.md';

storiesOfLists(
  {
    storiesOf,
    module,
    readme
  },
  {
    listsTemplate
  }
);

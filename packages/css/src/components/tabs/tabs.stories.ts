import { storiesOfTabs } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { tabsTemplate } from './tabs.template';
import readme from './readme.md';

storiesOfTabs(
  {
    storiesOf,
    module,
    readme
  },
  {
    tabsTemplate
  }
);

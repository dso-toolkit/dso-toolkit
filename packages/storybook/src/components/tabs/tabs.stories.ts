import { storiesOfTabs } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { tabsTemplate } from '@dso-toolkit/css/src/components/tabs/tabs.template';
import readme from '@dso-toolkit/css/src/components/tabs/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfTabs(
  {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    tabsTemplate
  }
);

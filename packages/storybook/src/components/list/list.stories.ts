import { storiesOfList } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { listTemplate } from '@dso-toolkit/css/src/components/list/list.template';
import readme from '@dso-toolkit/css/src/components/list/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfList(
  {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    listTemplate
  }
);

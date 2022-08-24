import { storiesOfOzonContent } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { ozonContentTemplate } from '@dso-toolkit/core/src/components/ozon-content/ozon-content.template';
import readme from '@dso-toolkit/core/src/components/ozon-content/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfOzonContent(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core
  },
  {
    ozonContentTemplate
  }
);

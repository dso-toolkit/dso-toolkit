import { storiesOfHeader } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { headerTemplate } from '@dso-toolkit/core/src/components/header/header.template';
import readme from '@dso-toolkit/core/src/components/header/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfHeader(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core
  },
  {
    headerTemplate
  }
);

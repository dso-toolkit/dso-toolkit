import { storiesOfHeader } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import readme from '@dso-toolkit/core/src/components/header/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfHeader(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core
  },
  templateContainer,
  ({ headerTemplate }) => ({ headerTemplate })
);

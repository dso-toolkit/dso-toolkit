import { storiesOfIcon } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import coreReadme from '@dso-toolkit/core/src/components/icon/readme.md';
import cssReadme from '@dso-toolkit/css/src/components/icon/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfIcon(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  ({ iconTemplate }) => ({ iconTemplate })
);

storiesOfIcon(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  templateContainer,
  ({ iconTemplate }) => ({ iconTemplate })
);

import { storiesOfOzonContent } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import coreReadme from '@dso-toolkit/core/src/components/ozon-content/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfOzonContent({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  templateContainer,
  storyTemplates: ({ ozonContentTemplate }) => ({ ozonContentTemplate })
});

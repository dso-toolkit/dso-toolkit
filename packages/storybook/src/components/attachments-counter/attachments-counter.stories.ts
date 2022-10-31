import { storiesOfAttachmentsCounter } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import cssReadme from '@dso-toolkit/css/src/components/attachments-counter/readme.md';
import coreReadme from '@dso-toolkit/core/src/components/attachments-counter/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfAttachmentsCounter({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  storyTemplates: ({ attachmentsCounterTemplate }) => ({ attachmentsCounterTemplate })
});

storiesOfAttachmentsCounter({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  templateContainer,
  storyTemplates: ({ attachmentsCounterTemplate }) => ({ attachmentsCounterTemplate })
});

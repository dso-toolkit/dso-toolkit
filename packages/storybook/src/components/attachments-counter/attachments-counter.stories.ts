import { storiesOf } from '@storybook/web-components';

import { storiesOfAttachmentsCounter } from '@dso-toolkit/sources';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

import * as css from '@dso-toolkit/css/src/components/attachments-counter/attachments-counter.template';
import cssReadme from '@dso-toolkit/css/src/components/attachments-counter/readme.md';

import * as core from '@dso-toolkit/core/src/components/attachments-counter/attachments-counter.template';
import coreReadme from '@dso-toolkit/core/src/components/attachments-counter/readme.md';

storiesOfAttachmentsCounter(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    attachmentsCounterTemplate: css.attachmentsCounterTemplate
  }
);

storiesOfAttachmentsCounter(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    attachmentsCounterTemplate: core.attachmentsCounterTemplate
  }
);

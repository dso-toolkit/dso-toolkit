import { storiesOfAttachmentsCounter } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';

import { attachmentsCounterTemplate } from './attachments-counter.template';

import readme from './readme.md';

storiesOfAttachmentsCounter(
  {
    module,
    storiesOf,
    readme
  },
  {
    attachmentsCounterTemplate
  }
);

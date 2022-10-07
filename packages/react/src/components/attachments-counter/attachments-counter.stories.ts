import { storiesOfAttachmentsCounter } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';
import { templateContainer } from '../../templates';

import readme from './readme.md';

storiesOfAttachmentsCounter(
  {
    module,
    storiesOf,
    readme
  },
  templateContainer,
  ({ attachmentsCounterTemplate }) => ({ attachmentsCounterTemplate })
);

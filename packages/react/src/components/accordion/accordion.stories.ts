import { storiesOfAccordion } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';

import { accordionTemplate } from './accordion.template';
import readme from './readme.md';

storiesOfAccordion(
  {
    module,
    storiesOf,
    readme
  },
  {
    accordionTemplate
  }
);

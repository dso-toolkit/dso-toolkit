import { storiesOfAccordion } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

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

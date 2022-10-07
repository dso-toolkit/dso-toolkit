import { storiesOfAccordion } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';
import { templateContainer } from '../../templates';

import readme from './readme.md';

storiesOfAccordion(
  {
    module,
    storiesOf,
    readme
  },
  templateContainer,
  ({ accordionTemplate }) => ({ accordionTemplate })
);

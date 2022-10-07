import { storiesOfLabel } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';
import { templateContainer } from '../../templates';

import { decorator } from './label.decorator';
import readme from './readme.md';

storiesOfLabel(
  {
    module,
    storiesOf,
    readme
  },
  templateContainer,
  ({ labelTemplate }) => ({ labelTemplate }),
  {
    decorator
  }
);

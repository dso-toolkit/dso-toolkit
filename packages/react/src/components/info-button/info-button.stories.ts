import { storiesOfInfoButton } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';
import { templateContainer } from '../../templates';

import readme from './readme.md';

storiesOfInfoButton(
  {
    module,
    storiesOf,
    readme
  },
  templateContainer,
  ({ infoButtonTemplate }) => ({ infoButtonTemplate })
);

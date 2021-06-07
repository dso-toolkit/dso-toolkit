import { storiesOfInfoButton } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { infoButtonTemplate } from './info-button.template';
import readme from './readme.md';

storiesOfInfoButton(
  {
    module,
    storiesOf,
    readme
  },
  {
    infoButtonTemplate
  }
);

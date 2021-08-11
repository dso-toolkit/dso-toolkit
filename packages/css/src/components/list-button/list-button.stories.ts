import { storiesOfListButton } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { listButtonTemplate } from './list-button.template';
import readme from './readme.md';

storiesOfListButton(
  {
    storiesOf,
    module,
    readme
  },
  {
    listButtonTemplate
  }
);

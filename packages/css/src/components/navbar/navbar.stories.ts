import { storiesOfNavbar } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { navbarTemplate } from './navbar.template';
import readme from './readme.md';

storiesOfNavbar(
  {
    storiesOf,
    module,
    readme
  },
  {
    navbarTemplate
  }
);

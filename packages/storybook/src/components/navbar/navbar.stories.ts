import { storiesOfNavbar } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { navbarTemplate } from '@dso-toolkit/css/src/components/navbar/navbar.template';
import readme from '@dso-toolkit/css/src/components/navbar/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfNavbar(
  {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    navbarTemplate
  }
);

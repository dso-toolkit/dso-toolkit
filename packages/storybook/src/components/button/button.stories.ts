import { storiesOfButton } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { buttonTemplate } from '@dso-toolkit/css/src/components/button/button.template';
import readme from '@dso-toolkit/css/src/components/button/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfButton(
  {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    buttonTemplate
  }
);

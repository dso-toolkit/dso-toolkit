import { storiesOfButtonRow } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { buttonRowTemplate } from '@dso-toolkit/css/src/components/button-row/button-row.template';
import readme from '@dso-toolkit/css/src/components/button-row/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfButtonRow(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    buttonRowTemplate
  }
);

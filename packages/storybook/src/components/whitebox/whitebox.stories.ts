import { storiesOfWhitebox } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components'

import { whiteboxTemplate } from '@dso-toolkit/css/src/components/whitebox/whitebox.template';
import readme from '@dso-toolkit/css/src/components/whitebox/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfWhitebox(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    whiteboxTemplate
  }
);

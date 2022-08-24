import { storiesOfInputNumber } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { inputNumberTemplate } from '@dso-toolkit/css/src/components/input-number/input-number.template';
import readme from '@dso-toolkit/css/src/components/input-number/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfInputNumber(
  {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    inputNumberTemplate
  }
);

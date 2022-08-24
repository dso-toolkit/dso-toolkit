import { storiesOfAnchor } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { anchorTemplate } from '@dso-toolkit/css/src/components/anchor/anchor.template';
import readme from '@dso-toolkit/css/src/components/anchor/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfAnchor(
  {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    anchorTemplate
  }
);

import { storiesOfImage } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { imageTemplate } from '@dso-toolkit/css/src/components/image/image.template';
import readme from '@dso-toolkit/css/src/components/image/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfImage(
  {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    imageTemplate
  }
);

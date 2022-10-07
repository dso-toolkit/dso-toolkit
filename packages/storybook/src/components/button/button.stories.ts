import { storiesOfButton } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import readme from '@dso-toolkit/css/src/components/button/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfButton(
  {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  ({ buttonTemplate }) => ({ buttonTemplate })
);

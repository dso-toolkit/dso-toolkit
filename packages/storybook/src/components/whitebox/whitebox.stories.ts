import { storiesOfWhitebox } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components'

import readme from '@dso-toolkit/css/src/components/whitebox/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfWhitebox({
  parameters: {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  storyTemplates: ({ whiteboxTemplate }) => ({ whiteboxTemplate })
});

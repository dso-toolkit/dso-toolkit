import { storiesOfTile } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components'

import cssReadme from '@dso-toolkit/css/src/components/tile/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfTile({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  storyTemplates: ({ tileTemplate }) => ({ tileTemplate })
});

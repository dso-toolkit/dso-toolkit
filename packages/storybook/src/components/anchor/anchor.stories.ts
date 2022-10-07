import { storiesOfAnchor } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import cssReadme from '@dso-toolkit/css/src/components/anchor/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfAnchor(
  {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  ({ anchorTemplate }) => ({ anchorTemplate })
);

import { storiesOfSelectable } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import cssReadme from '@dso-toolkit/css/src/components/selectable/readme.md';
import coreReadme from '@dso-toolkit/core/src/components/selectable/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfSelectable(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  ({ selectableTemplate }) => ({ selectableTemplate })
);

storiesOfSelectable(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  templateContainer,
  ({ selectableTemplate }) => ({ selectableTemplate })
);

import { storiesOf } from '@storybook/web-components';

import cssReadme from '@dso-toolkit/css/src/components/alert/readme.md';
import coreReadme from '@dso-toolkit/core/src/components/alert/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';
import { storiesOfLabelGroup } from '@dso-toolkit/sources';

storiesOfLabelGroup(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  ({ labelGroupTemplate }) => ({ labelGroupTemplate })
);

storiesOfLabelGroup(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  templateContainer,
  ({ labelGroupTemplate }) => ({ labelGroupTemplate })
);

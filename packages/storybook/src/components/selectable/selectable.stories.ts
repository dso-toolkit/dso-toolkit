import { storiesOfSelectable } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import cssReadme from '@dso-toolkit/css/src/components/selectable/readme.md';
import * as css from '@dso-toolkit/css/src/components/selectable/selectable.template';

import coreReadme from '@dso-toolkit/core/src/components/selectable/readme.md';
import * as core from '@dso-toolkit/core/src/components/selectable/selectable.template';

import { infoRichContent } from './selectable.content';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfSelectable(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    selectableTemplate: css.selectableTemplate,
    infoRichContent
  }
);

storiesOfSelectable(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    selectableTemplate: core.selectableTemplate,
    infoRichContent
  }
);

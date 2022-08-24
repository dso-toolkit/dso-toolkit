import { storiesOfHighlightBox } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

import * as core from '@dso-toolkit/core/src/components/highlight-box/highlight-box.template';
import coreReadme from '@dso-toolkit/core/src/components/highlight-box/readme.md';

import * as css from '@dso-toolkit/css/src/components/highlight-box/highlight-box.template';
import cssReadme from '@dso-toolkit/css/src/components/highlight-box/readme.md';

import { richContent } from './highlight-box.content';

storiesOfHighlightBox(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    highlightBoxTemplate: css.highlightBoxTemplate,
    richContent
  }
);

storiesOfHighlightBox(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    highlightBoxTemplate: core.highlightBoxTemplate,
    richContent
  }
);

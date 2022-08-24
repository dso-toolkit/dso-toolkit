import { storiesOfAlert } from '@dso-toolkit/sources/src/components/alert/alert.stories-of';
import { storiesOf } from '@storybook/web-components';

import * as css from '@dso-toolkit/css/src/components/alert/alert.template';
import cssReadme from '@dso-toolkit/css/src/components/alert/readme.md';

import * as core from '@dso-toolkit/core/src/components/alert/alert.template';
import coreReadme from '@dso-toolkit/core/src/components/alert/readme.md';

import { alertWithHeadingsTemplate } from './alert.content';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfAlert(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    alertTemplate: css.alertTemplate,
    alertWithHeadingsTemplate
  }
);

storiesOfAlert(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    alertTemplate: core.alertTemplate,
    alertWithHeadingsTemplate
  }
);

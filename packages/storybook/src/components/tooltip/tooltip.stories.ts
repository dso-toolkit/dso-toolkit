import { storiesOfTooltip } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import * as css from '@dso-toolkit/css/src/components/tooltip/tooltip.template';
import cssReadme from '@dso-toolkit/css/src/components/tooltip/readme.md';

import * as core from '@dso-toolkit/core/src/components/tooltip/tooltip.template';
import coreReadme from '@dso-toolkit/core/src/components/tooltip/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

import { asChildTemplate, asSiblingTemplate } from './tooltip.content';

storiesOfTooltip(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    tooltipTemplate: css.tooltipTemplate
  }
);

storiesOfTooltip(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    tooltipTemplate: core.tooltipTemplate,
    asChildTemplate,
    asSiblingTemplate
  }
);

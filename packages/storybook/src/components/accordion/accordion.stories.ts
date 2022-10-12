import { storiesOfAccordion } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import * as css from '@dso-toolkit/css/src/components/accordion/accordion.template';
import cssReadme from '@dso-toolkit/css/src/components/accordion/readme.md';

import * as core from '@dso-toolkit/core/src/components/accordion/accordion.template';
import coreReadme from '@dso-toolkit/core/src/components/accordion/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfAccordion(
  {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    accordionTemplate: css.accordionTemplate
  }
);

storiesOfAccordion(
  {
    storiesOf,
    module,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    accordionTemplate: core.accordionTemplate
  }
);

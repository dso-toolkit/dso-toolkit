import { storiesOfAccordion } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { accordionTemplate } from '@dso-toolkit/css/src/components/accordion/accordion.template';
import readme from '@dso-toolkit/css/src/components/accordion/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfAccordion(
  {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    accordionTemplate
  }
);

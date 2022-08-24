import { storiesOfApplicationHeading } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { applicationHeadingTemplate } from '@dso-toolkit/css/src/components/application-heading/application-heading.template';
import readme from '@dso-toolkit/css/src/components/application-heading/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfApplicationHeading(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    applicationHeadingTemplate
  }
);

import { storiesOfApplicationHeading } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { applicationHeadingTemplate } from './application-heading.template';
import readme from './readme.md';

storiesOfApplicationHeading(
  {
    module,
    storiesOf,
    readme
  },
  {
    applicationHeadingTemplate
  }
);

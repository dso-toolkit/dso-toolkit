import { storiesOfJustifyFormGroups } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { justifyFormGroupsTemplate } from '@dso-toolkit/css/src/components/justify-form-groups/justify-form-groups.template';
import readme from '@dso-toolkit/css/src/components/justify-form-groups/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfJustifyFormGroups(
  {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    justifyFormGroupsTemplate
  }
);

import { storiesOfJustifyFormGroups } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { justifyFormGroupsTemplate } from './justify-form-groups.template';
import readme from './readme.md';

storiesOfJustifyFormGroups(
  {
    storiesOf,
    module,
    readme
  },
  {
    justifyFormGroupsTemplate
  }
);

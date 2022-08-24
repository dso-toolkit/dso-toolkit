import { storiesOfFormButtons } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { formButtonsTemplate } from '@dso-toolkit/css/src/components/form/form-buttons/form-buttons.template';
import readme from '@dso-toolkit/css/src/components/form/form-buttons/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfFormButtons(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    formButtonsTemplate
  }
);

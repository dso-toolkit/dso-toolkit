import { storiesOfModal } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { progressIndicatorTemplate } from '@dso-toolkit/css/src/components/progress-indicator/progress-indicator.template';

import { modalTemplate } from '@dso-toolkit/css/src/components/modal/modal.template';
import readme from '@dso-toolkit/css/src/components/modal/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfModal(
  {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    modalTemplate,
    progressIndicatorTemplate
  }
);

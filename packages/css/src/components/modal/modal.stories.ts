import { storiesOfModal } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { progressIndicatorTemplate } from '../progress-indicator/progress-indicator.template';

import { modalTemplate } from './modal.template';
import readme from './readme.md';

storiesOfModal(
  {
    storiesOf,
    module,
    readme
  },
  {
    modalTemplate,
    progressIndicatorTemplate
  }
);

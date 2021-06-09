import { storiesOfTooltip } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components'

import { tooltipTemplate } from './tooltip.template';
import readme from './readme.md';

storiesOfTooltip(
  {
    module,
    storiesOf,
    readme
  },
  {
    tooltipTemplate
  }
);

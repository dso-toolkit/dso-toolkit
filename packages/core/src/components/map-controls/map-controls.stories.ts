import { storiesOfMapControls } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { mapControlsTemplate } from './map-controls.template';
import readme from './readme.md';

storiesOfMapControls(
  {
    module,
    storiesOf,
    readme
  },
  {
    mapControlsTemplate
  }
);

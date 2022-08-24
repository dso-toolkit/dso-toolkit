import { storiesOfMapControls } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { mapControlsTemplate } from '@dso-toolkit/core/src/components/map-controls/map-controls.template';
import readme from '@dso-toolkit/core/src/components/map-controls/readme.md';
import { decorator } from './map-controls.decorator';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfMapControls(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core
  },
  {
    mapControlsTemplate,
    decorator
  }
);

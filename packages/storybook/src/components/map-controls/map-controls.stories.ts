import { storiesOfMapControls } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import readme from '@dso-toolkit/core/src/components/map-controls/readme.md';
import { decorator } from './map-controls.decorator';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfMapControls(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core
  },
  templateContainer,
  ({ mapControlsTemplate }) => ({
    mapControlsTemplate,
    decorator
  })
);

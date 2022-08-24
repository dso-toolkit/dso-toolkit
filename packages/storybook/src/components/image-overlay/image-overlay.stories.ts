import { storiesOfImageOverlay } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import { imageOverlayTemplate } from "@dso-toolkit/core/src/components/image-overlay/image-overlay.template";
import readme from "@dso-toolkit/core/src/components/image-overlay/readme.md";
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfImageOverlay(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core
  },
  {
    imageOverlayTemplate
  }
);

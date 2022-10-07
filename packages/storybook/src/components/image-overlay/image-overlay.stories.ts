import { storiesOfImageOverlay } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import coreReadme from "@dso-toolkit/core/src/components/image-overlay/readme.md";
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from "../../templates";

storiesOfImageOverlay(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  templateContainer,
  ({ imageOverlayTemplate }) => ({ imageOverlayTemplate })
);

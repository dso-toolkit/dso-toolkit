import { storiesOfImageOverlay, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import coreReadme from "@dso-toolkit/core/src/components/image-overlay/readme.md";

import { templateContainer } from "../../templates";

storiesOfImageOverlay({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ imageOverlayTemplate }) => ({ imageOverlayTemplate }),
});

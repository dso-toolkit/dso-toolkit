import { storiesOfMapControlsV2, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import baseReadme from "dso-toolkit/src/components/map-controls/readme.md?raw";
import buttonReadme from "@dso-toolkit/core/src/components/map-controls-buttons/readme.md?raw";
import panelReadme from "@dso-toolkit/core/src/components/map-controls-panel/readme.md?raw";

import { decorator } from "./map-controls.decorator";

import { templateContainer } from "../../templates";

storiesOfMapControlsV2(
  {
    parameters: {
      module,
      storiesOf,
      readme: [baseReadme, buttonReadme, panelReadme].join("\n"),
      root: StoryRoot.Core,
    },
    templateContainer,
    storyTemplates: ({ mapControlsV2Template }) => ({ mapControlsV2Template }),
  },
  {
    decorator,
  }
);

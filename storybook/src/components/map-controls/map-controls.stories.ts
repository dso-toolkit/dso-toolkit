import { storiesOfMapControls, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import readme from "@dso-toolkit/core/src/components/map-controls/readme.md";
import { decorator } from "./map-controls.decorator";

import { templateContainer } from "../../templates";

storiesOfMapControls(
  {
    parameters: {
      module,
      storiesOf,
      readme,
      root: StoryRoot.Core,
    },
    templateContainer,
    storyTemplates: ({ mapControlsTemplate }) => ({ mapControlsTemplate }),
  },
  {
    decorator,
  }
);

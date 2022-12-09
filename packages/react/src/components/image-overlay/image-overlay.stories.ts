import { storiesOfImageOverlay } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfImageOverlay({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ imageOverlayTemplate }) => ({ imageOverlayTemplate }),
});

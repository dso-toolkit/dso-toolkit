import { storiesOfImageOverlay } from "@dso-toolkit/sources";
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

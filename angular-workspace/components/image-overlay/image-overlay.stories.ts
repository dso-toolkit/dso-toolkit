import { storiesOf } from "@storybook/angular";

import { storiesOfImageOverlay } from "dso-toolkit";
import { DsoImageOverlay } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfImageOverlay({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [{ component: DsoImageOverlay }],
    },
  },
  templateContainer,
  storyTemplates: ({ imageOverlayTemplate }) => ({ imageOverlayTemplate }),
});

import { storiesOfImageOverlay } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import { imageOverlayTemplate } from "./image-overlay.template";
import readme from "./readme.md";

storiesOfImageOverlay(
  {
    module,
    storiesOf,
    readme,
  },
  {
    imageOverlayTemplate,
  }
);

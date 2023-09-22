import { storiesOfModal } from "dso-toolkit";
import { storiesOf } from "@storybook/react";

import { templateContainer } from "../../templates";
import {
  activeBody,
  activeFooter,
  confirmBody,
  confirmFooter,
  fullscreenBody,
  loadingBody,
  passiveBody,
  passiveFooter,
} from "./modal.content";
import readme from "./readme.md?raw";

storiesOfModal(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ modalTemplate }, templates) => ({
      modalTemplate,
      activeBody,
      activeFooter,
      passiveBody,
      passiveFooter,
      confirmBody,
      confirmFooter,
      loadingBody: loadingBody(templates),
      fullscreenBody,
    }),
  },
  {}
);

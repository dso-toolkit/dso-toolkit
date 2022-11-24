import { storiesOfModal } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";

import { templateContainer } from "../../templates";
import {
  activeBody,
  activeFooter,
  confirmBody,
  confirmFooter,
  loadingBody,
  passiveBody,
  passiveFooter,
} from "./modal.content";
import readme from "./readme.md";

storiesOfModal({
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
  }),
});

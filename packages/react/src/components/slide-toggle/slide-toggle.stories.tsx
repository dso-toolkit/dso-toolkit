import { storiesOfSlideToggle } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfSlideToggle({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ slideToggleTemplate }) => ({ slideToggleTemplate }),
});

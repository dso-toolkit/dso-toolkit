import { storiesOfIcon } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

storiesOfIcon({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ iconTemplate }) => ({
    iconTemplate,
  }),
});

import { storiesOfTabs } from "dso-toolkit";
import { storiesOf } from "@storybook/react";

import readme from "./readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfTabs({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ tabsTemplate }) => ({
    tabsTemplate,
  }),
});

import { storiesOfListButton } from "dso-toolkit";
import { storiesOf } from "@storybook/react";

import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfListButton({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ listButtonTemplate }) => ({ listButtonTemplate }),
});

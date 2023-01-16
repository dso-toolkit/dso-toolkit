import { storiesOf } from "@storybook/angular";

import { storiesOfListButton } from "dso-toolkit";
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

import { storiesOf } from "@storybook/angular";

import { storiesOfSlideToggle } from "dso-toolkit";
import { DsoSlideToggle } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

storiesOfSlideToggle({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [{ component: DsoSlideToggle }],
    },
  },
  templateContainer,
  storyTemplates: ({ slideToggleTemplate }) => ({ slideToggleTemplate }),
});

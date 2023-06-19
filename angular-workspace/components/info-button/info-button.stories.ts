import { storiesOf } from "@storybook/angular";

import { storiesOfInfoButton } from "dso-toolkit";
import { DsoInfoButton } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

storiesOfInfoButton({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [
        {
          component: DsoInfoButton,
        },
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ infoButtonTemplate }) => ({ infoButtonTemplate }),
});

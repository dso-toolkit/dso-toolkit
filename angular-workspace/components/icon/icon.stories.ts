import { storiesOf } from "@storybook/angular";

import { storiesOfIcon } from "dso-toolkit";
import { DsoIcon } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfIcon({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [
        {
          component: DsoIcon,
        },
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ iconTemplate }) => ({ iconTemplate }),
});

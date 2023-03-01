import { storiesOf } from "@storybook/angular";
import { storiesOfOzonContent } from "dso-toolkit";

import { DsoOzonContent } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfOzonContent({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [
        {
          component: DsoOzonContent,
        },
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ ozonContentTemplate }) => ({ ozonContentTemplate }),
});

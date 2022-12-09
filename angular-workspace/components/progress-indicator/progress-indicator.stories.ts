import { storiesOf } from "@storybook/angular";

import { storiesOfProgressIndicator } from "dso-toolkit";
import { DsoProgressIndicator } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfProgressIndicator({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [
        {
          component: DsoProgressIndicator,
        },
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ progressIndicatorTemplate }) => ({ progressIndicatorTemplate }),
});

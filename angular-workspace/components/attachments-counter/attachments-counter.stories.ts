import { storiesOf } from "@storybook/angular";

import { storiesOfAttachmentsCounter } from "dso-toolkit";
import { DsoAttachmentsCounter } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfAttachmentsCounter({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [
        {
          component: DsoAttachmentsCounter,
        },
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ attachmentsCounterTemplate }) => ({ attachmentsCounterTemplate }),
});

import { storiesOfAttachmentsCounter } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfAttachmentsCounter({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ attachmentsCounterTemplate }) => ({ attachmentsCounterTemplate }),
});

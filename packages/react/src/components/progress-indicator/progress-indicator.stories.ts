import { storiesOfProgressIndicator } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfProgressIndicator({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ progressIndicatorTemplate }) => ({ progressIndicatorTemplate }),
});

import { storiesOfHeader } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

storiesOfHeader({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ headerTemplate }) => ({ headerTemplate }),
});

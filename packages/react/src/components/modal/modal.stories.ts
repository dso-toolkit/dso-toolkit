import { storiesOfModal } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";

import { templateContainer } from "../../templates";
import readme from "./readme.md";

storiesOfModal({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ modalTemplate }) => ({ modalTemplate }),
});

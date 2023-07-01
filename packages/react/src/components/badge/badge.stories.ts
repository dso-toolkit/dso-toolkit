import { storiesOfBadge } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

storiesOfBadge({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ badgeTemplate }) => ({ badgeTemplate }),
});

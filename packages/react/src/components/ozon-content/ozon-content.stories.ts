import { storiesOfOzonContent } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfOzonContent(
  {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  ({ ozonContentTemplate }) => ({ ozonContentTemplate })
);

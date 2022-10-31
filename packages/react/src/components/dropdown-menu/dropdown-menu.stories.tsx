import { storiesOfDropdownMenu } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfDropdownMenu({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ dropdownMenuTemplate }) => ({ dropdownMenuTemplate }),
});

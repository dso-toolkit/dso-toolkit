import { storiesOfDropdownMenu } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";

import { dropdownMenuTemplate } from "./dropdown-menu.template";
import readme from "./readme.md";

storiesOfDropdownMenu(
  {
    module,
    storiesOf,
    readme,
  },
  {
    dropdownMenuTemplate
  }
);

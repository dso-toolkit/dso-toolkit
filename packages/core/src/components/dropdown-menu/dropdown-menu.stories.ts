import { storiesOfDropdownMenu } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import { dropdownMenuTemplate } from "./dropdown-menu.template";
import readme from "./readme.md";

storiesOfDropdownMenu(
  {
    module,
    storiesOf,
    readme,
  },
  {
    dropdownMenuTemplate: dropdownMenuTemplate,
  }
);

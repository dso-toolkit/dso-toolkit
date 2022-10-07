import { storiesOfDropdownMenu } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";
import { templateContainer } from '../../templates';

import readme from "./readme.md";

storiesOfDropdownMenu(
  {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  ({ dropdownMenuTemplate }) => ({ dropdownMenuTemplate })
);

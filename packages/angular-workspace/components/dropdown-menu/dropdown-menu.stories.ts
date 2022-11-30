import { storiesOf } from "@storybook/angular";

import { storiesOfDropdownMenu } from "../../../sources";
import { DsoDropdownMenu } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfDropdownMenu(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ dropdownMenuTemplate }) => ({ dropdownMenuTemplate }),
  },
  { component: DsoDropdownMenu }
);

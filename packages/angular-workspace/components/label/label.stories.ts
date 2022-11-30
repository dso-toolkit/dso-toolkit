import { storiesOf } from "@storybook/angular";

import { storiesOfLabel } from "../../../sources";
import { DsoLabel } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { decorator } from "./label.decorator";

import readme from "./readme.md";

storiesOfLabel(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ labelTemplate }) => ({ labelTemplate }),
  },
  {
    decorator,
  },
  { component: DsoLabel }
);

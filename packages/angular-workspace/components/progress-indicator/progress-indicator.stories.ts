import { storiesOf } from "@storybook/angular";

import { storiesOfProgressIndicator } from "../../../sources";
import { DsoProgressIndicator } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfProgressIndicator(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ progressIndicatorTemplate }) => ({ progressIndicatorTemplate }),
  },
  { component: DsoProgressIndicator }
);

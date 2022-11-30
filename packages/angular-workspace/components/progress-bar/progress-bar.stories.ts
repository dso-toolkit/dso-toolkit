import { storiesOf } from "@storybook/angular";

import { storiesOfProgressBar } from "../../../sources";
import { DsoProgressBar } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfProgressBar(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ progressBarTemplate }) => ({ progressBarTemplate }),
  },
  { component: DsoProgressBar }
);

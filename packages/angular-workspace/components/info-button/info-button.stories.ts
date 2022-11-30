import { storiesOf } from "@storybook/angular";

import { storiesOfInfoButton } from "../../../sources";
import { DsoInfoButton } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfInfoButton(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ infoButtonTemplate }) => ({ infoButtonTemplate }),
  },
  { component: DsoInfoButton }
);

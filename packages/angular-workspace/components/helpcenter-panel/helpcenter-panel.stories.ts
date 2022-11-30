import { storiesOf } from "@storybook/angular";

import { storiesOfHelpcenterPanel } from "../../../sources";
import { DsoHelpcenterPanel } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfHelpcenterPanel(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ helpcenterPanelTemplate }) => ({ helpcenterPanelTemplate }),
  },
  { component: DsoHelpcenterPanel }
);

import { storiesOf } from "@storybook/angular";

import { storiesOfHelpcenterPanel } from "dso-toolkit";
import { DsoHelpcenterPanel } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

storiesOfHelpcenterPanel({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [
        {
          component: DsoHelpcenterPanel,
        },
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ helpcenterPanelTemplate }) => ({ helpcenterPanelTemplate }),
});

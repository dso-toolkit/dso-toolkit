import { storiesOf } from "@storybook/angular";

import { storiesOfInfo } from "dso-toolkit";
import { DsoInfo } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { richContent } from "./info.content";

import readme from "./readme.md?raw";

storiesOfInfo({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [
        {
          component: DsoInfo,
        },
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ infoTemplate }, templates) => ({ infoTemplate, richContent: richContent(templates) }),
});

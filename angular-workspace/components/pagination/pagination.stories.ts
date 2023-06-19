import { storiesOf } from "@storybook/angular";

import { storiesOfPagination } from "dso-toolkit";
import { DsoPagination } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

storiesOfPagination({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [
        {
          component: DsoPagination,
        },
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ paginationTemplate }) => ({ paginationTemplate }),
});

import { storiesOf } from "@storybook/angular";

import { storiesOfPagination } from "../../../sources";
import { DsoPagination } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfPagination(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ paginationTemplate }) => ({ paginationTemplate }),
  },
  { component: DsoPagination }
);

import { storiesOf } from "@storybook/angular";

import { storiesOfAttachmentsCounter } from "../../../sources";
import { DsoAttachmentsCounter } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

storiesOfAttachmentsCounter(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ attachmentsCounterTemplate }) => ({ attachmentsCounterTemplate }),
  },
  { component: DsoAttachmentsCounter }
);

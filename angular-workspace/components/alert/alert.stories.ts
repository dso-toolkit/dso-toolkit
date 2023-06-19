import { storiesOf } from "@storybook/angular";

import { storiesOfAlert } from "dso-toolkit";
import { DsoAlert } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { alertWithHeadingsContent, errorMessage, infoMessage, successMessage, warningMessage } from "./alert.content";

import readme from "./readme.md?raw";

storiesOfAlert({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [
        {
          component: DsoAlert,
        },
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ alertTemplate }) => ({
    alertTemplate,
    errorMessage,
    infoMessage,
    successMessage,
    warningMessage,
    alertWithHeadingsContent,
  }),
});

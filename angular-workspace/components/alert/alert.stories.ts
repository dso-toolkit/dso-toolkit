import { type Meta, moduleMetadata } from "@storybook/angular";
import { AlertArgs, alertMeta, alertStories } from "dso-toolkit";

import { DsoAlert } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import { alertWithHeadingsContent, errorMessage, infoMessage, successMessage, warningMessage } from "./alert.content";
import readme from "./readme.md?raw";

const meta: Meta<AlertArgs> = {
  ...alertMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoAlert],
    }),
  ],
  title: "Alert",
};

export default meta;

const { Success, Error, Info, Warning, WithHeadings } = alertStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { alertTemplate } = templates;

    return {
      alertTemplate,
      errorMessage,
      infoMessage,
      successMessage,
      warningMessage,
      alertWithHeadingsContent,
    };
  },
});

export { Error, Info, Success, Warning, WithHeadings };

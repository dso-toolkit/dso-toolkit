import type { Meta } from "@storybook/angular";
import { AlertArgs, alertMeta, alertStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { alertWithHeadingsContent, errorMessage, infoMessage, successMessage, warningMessage } from "./alert.content";

import readme from "./readme.md?raw";

const meta: Meta<AlertArgs> = {
  ...alertMeta({ readme }),
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

export { Success, Error, Info, Warning, WithHeadings };
